import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import {
  TextInput,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';

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

/*
  * has a list of all todo lists, somehow showing some (top 3) of the todos in
  them;

  * list is clickable and the list component, which is already up and running,
  will be rendered (initially i wanna try to do this without routing)

  * the list component will recieve just the id and load all todos to be rendered
  by itself

  * to achieve item 2, there will be a context wrapping both catalog and list
  components that will hold the id of the currently selected list. Said id may be
  null, in which case the catalog component will be shown;
*/

interface TodoListsCatalogProps {
  navigateToList: (listId: number) => void;
}

const TodoListsCatalog: React.FC<TodoListsCatalogProps> = ({
  navigateToList,
}) => {
  const { todoListsRepository } = useDatabaseConnection();

  const [lists, setLists] = useState<List[]>([]);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = useCallback(async () => {
    if (!newListName) return;

    const newList = await todoListsRepository.create({
      name: newListName,
    });

    setLists(current => [
      ...current,

      // TypeORM returns the created object todos prop as undefined, it has to
      // be directly assigned here. The interface will break otherwise:
      Object.assign(newList, { todos: [] }),
    ]);
  }, [newListName, todoListsRepository]);

  const handleDeleteList = useCallback(
    async (deletedId: number) => {
      await todoListsRepository.delete(deletedId);

      setLists(current => current.filter(list => list.id !== deletedId));
    },
    [todoListsRepository],
  );

  useEffect(() => {
    todoListsRepository.getAll().then(setLists);
  }, [todoListsRepository]);

  return (
    <View style={styles.container}>
      <View style={styles.createListContainer}>
        <Text style={styles.createListLabel}>New To-Do List</Text>
        <TextInput
          style={styles.createListInput}
          onChangeText={setNewListName}
        />
        <Button onPress={handleCreateList} title="Submit" />
      </View>

      <View style={styles.catalogContainer}>
        {lists.map(list => (
          <TouchableNativeFeedback
            key={list.id}
            style={styles.todoListItem}
            onPress={
              // () => navigateToList(list.id)

              // temporarily deleting here:
              () => handleDeleteList(list.id)
            }
          >
            <Text style={styles.todoListItemName}>{list.name}</Text>
            {list.todos.map((todo, index) => (
              <Text
                key={String(index)}
                style={[
                  styles.todoListTodoText,
                  todo.status && styles.todoListTodoIsCompleted,
                ]}
              >
                {todo}
              </Text>
            ))}
          </TouchableNativeFeedback>
        ))}
      </View>
    </View>
  );
};

export default TodoListsCatalog;
