import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import {
  BorderlessButton,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

import { useDatabaseConnection } from '../../data/connection';

import styles from './styles';

interface List {
  id: number;
  name: string;
  todos: Array<{
    text: string;
    status: boolean;
  }>;
}

interface TodoListsCatalogProps {
  navigateToList: (listId: number, listName: string) => void;
}

interface HandleDeleteListParams {
  name: string;
  deletedId: number;
}

const TodoListsCatalog: React.FC<TodoListsCatalogProps> = ({
  navigateToList,
}) => {
  const { todoListsRepository } = useDatabaseConnection();

  const [lists, setLists] = useState<List[]>([]);
  const [newListName, setNewListName] = useState('');

  const newListInputRef = useRef<TextInput>(null);
  const catalogScrollViewRef = useRef<ScrollView>(null);

  const handleCreateList = useCallback(async () => {
    if (!newListName) return;

    const newList = await todoListsRepository.create({
      name: newListName,
    });

    setNewListName('');
    setLists(current => [
      ...current,

      // TypeORM returns the created object todos prop as undefined, it has to
      // be directly assigned here. The interface will break otherwise:
      Object.assign(newList, { todos: [] }),
    ]);

    newListInputRef.current?.blur();
  }, [newListName, todoListsRepository]);

  const handleDeleteList = useCallback(
    async ({ deletedId, name }: HandleDeleteListParams) => {
      const onPressConfirm = async () => {
        await todoListsRepository.delete(deletedId);

        setLists(current => current.filter(list => list.id !== deletedId));
      };

      Alert.alert(
        `Delete "${name}" list.`,
        'Are you sure you want to delete this list?',
        [
          {
            text: 'Yes',
            onPress: onPressConfirm,
            style: 'default',
          },
          {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
          },
        ],
      );
    },
    [todoListsRepository],
  );

  useEffect(() => {
    todoListsRepository.getAll().then(setLists);
  }, [todoListsRepository]);

  useEffect(() => {
    if (lists.length !== 0) {
      catalogScrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }
  }, [lists]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My To-Do Lists</Text>
      </View>

      <View style={styles.createListContainer}>
        <TextInput
          ref={newListInputRef}
          placeholder="Create a new list..."
          style={styles.createListInput}
          value={newListName}
          onChangeText={setNewListName}
          multiline
        />

        <BorderlessButton
          onPress={handleCreateList}
          style={styles.createListButtonContainer}
        >
          <Icon name="plus" size={32} color="#61d461" />
        </BorderlessButton>
      </View>

      <ScrollView
        ref={catalogScrollViewRef}
        contentContainerStyle={styles.catalogContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {lists.map(list => (
          <TouchableNativeFeedback
            key={list.id}
            style={styles.todoListItem}
            containerStyle={styles.todoListItemContainer}
            onPress={() => navigateToList(list.id, list.name)}
            onLongPress={() =>
              handleDeleteList({ deletedId: list.id, name: list.name })
            }
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.todoListItemName}>{list.name}</Text>

              <View style={styles.todoListItemTodosContainer}>
                {list.todos.length > 0 ? (
                  list.todos.map((todo, index) => (
                    <Text
                      key={String(index)}
                      style={[
                        styles.todoListTodoText,
                        todo.status && styles.todoListTodoIsCompleted,
                      ]}
                    >
                      {todo.text}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.todoListItemTodosPlaceholder}>
                    Press to start adding items...
                  </Text>
                )}
              </View>
            </View>
          </TouchableNativeFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodoListsCatalog;
