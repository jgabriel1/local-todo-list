import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import Todo from '../Todo';

import styles from './styles';
import useTodos from './use-todos';

const TodoList: React.FC = () => {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

  const [newTodo, setNewTodo] = useState('');

  const handleCreateTodo = useCallback(async () => {
    await addTodo({ text: newTodo });
  }, [addTodo, newTodo]);

  const handleDeleteTodo = useCallback(
    async (id: number) => {
      await deleteTodo(id);
    },
    [deleteTodo],
  );

  const handleToggleTodo = useCallback(
    async (todoId: number) => {
      await toggleTodo(todoId);
    },
    [toggleTodo],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My todo list</Text>
      </View>

      <View style={styles.newTodoContainer}>
        <TextInput
          style={styles.newTodoInput}
          placeholder="New To-Do..."
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="Add Todo" onPress={handleCreateTodo} />
      </View>

      <View style={styles.todosContainer}>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleTodo={handleToggleTodo}
          />
        ))}
      </View>
    </View>
  );
};

export default TodoList;
