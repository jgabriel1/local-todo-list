import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import {
  BorderlessButton,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import useTodoLists from './useTodoLists';

import styles from './styles';
import { useSelectedList } from '../../hooks/selectedList';

interface HandleSelectListParams {
  name: string;
  id: number;
}

interface HandleDeleteListParams {
  name: string;
  deletedId: number;
}

const TodoListsCatalog: React.FC = () => {
  const navigation = useNavigation();

  const { selectedListId, selectList, clearSelectedList } = useSelectedList();
  const { lists, loadTodoLists, addTodoList, deleteTodoList } = useTodoLists();

  const [newListName, setNewListName] = useState('');

  const newListInputRef = useRef<TextInput>(null);
  const catalogScrollViewRef = useRef<ScrollView>(null);

  const handleCreateList = useCallback(async () => {
    if (!newListName) return;

    await addTodoList({ name: newListName });

    setNewListName('');

    newListInputRef.current?.blur();
  }, [addTodoList, newListName]);

  const handleDeleteList = useCallback(
    async ({ deletedId, name }: HandleDeleteListParams) => {
      const onPressConfirm = async () => {
        await deleteTodoList(deletedId);
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
    [deleteTodoList],
  );

  const handleSelectList = useCallback(
    ({ id, name }: HandleSelectListParams) => {
      selectList({ id, name });
    },
    [selectList],
  );

  useFocusEffect(
    useCallback(() => {
      clearSelectedList();

      loadTodoLists();
    }, [clearSelectedList, loadTodoLists]),
  );

  useEffect(() => {
    if (lists.length !== 0) {
      catalogScrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }
  }, [lists]);

  useEffect(() => {
    if (selectedListId) {
      navigation.navigate('TodoList');
    }
  }, [navigation, selectedListId]);

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
        showsHorizontalScrollIndicator={false}
      >
        {lists.map(list => (
          <TouchableNativeFeedback
            key={list.id}
            style={styles.todoListItemContainer}
            onPress={() => handleSelectList({ id: list.id, name: list.name })}
            onLongPress={() =>
              handleDeleteList({ deletedId: list.id, name: list.name })
            }
          >
            <View style={styles.todoListItem}>
              <Text style={styles.todoListItemName}>{list.name}</Text>

              <View style={styles.completedContainer}>
                <Text style={styles.completedValueText}>
                  {`${list.total_completed_todos} / ${list.total_todos}`}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodoListsCatalog;
