import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import {
  BorderlessButton,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Todo from '../Todo';

import styles from './styles';
import useTodos from './use-todos';

const TodoList: React.FC = () => {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

  const newTodoInputRef = useRef<TextInput>(null);

  const [newTodo, setNewTodo] = useState('');

  const handleCreateTodo = useCallback(async () => {
    await addTodo({ text: newTodo });

    newTodoInputRef.current?.blur();

    setNewTodo('');
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
        <Text style={styles.title}>My tasks</Text>

        <BorderlessButton>
          <Icon size={36} name="plus" />
        </BorderlessButton>
      </View>

      <View style={styles.newTodoContainer}>
        <TextInput
          ref={newTodoInputRef}
          style={styles.newTodoInput}
          placeholder="New To-Do..."
          value={newTodo}
          onChangeText={setNewTodo}
          multiline
          blurOnSubmit
        />

        <View style={styles.newTodoButtonsContainer}>
          <TouchableOpacity onPress={handleCreateTodo}>
            <Icon name="check" size={28} color="#5afa5a" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => newTodoInputRef.current?.blur()}>
            <Icon name="x" size={28} color="#f15f5f" />
          </TouchableOpacity>
        </View>
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
