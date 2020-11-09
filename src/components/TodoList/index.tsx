import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
  BorderlessButton,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import useTodos from './use-todos';

import Todo from '../Todo';

import styles from './styles';

const TodoList: React.FC = () => {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

  const newTodoInputRef = useRef<TextInput>(null);

  const [newTodo, setNewTodo] = useState('');
  const [showNewTodoInput, setShowNewTodoInput] = useState(false);

  const handleToggleNewTodoInputModal = useCallback(() => {
    setShowNewTodoInput(current => !current);
  }, []);

  const handleCreateTodo = useCallback(async () => {
    await addTodo({ text: newTodo });

    newTodoInputRef.current?.blur();

    setNewTodo('');
    setShowNewTodoInput(false);
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

        <BorderlessButton
          onPress={handleToggleNewTodoInputModal}
          style={
            showNewTodoInput && {
              transform: [{ rotate: '45deg' }],
            }
          }
        >
          <Icon
            size={36}
            name="plus"
            color={showNewTodoInput ? '#f15f5f' : '#000'}
          />
        </BorderlessButton>
      </View>

      {showNewTodoInput && (
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

          <View style={styles.newTodoButtonContainer}>
            <TouchableOpacity onPress={handleCreateTodo}>
              <Icon name="feather" size={28} color="#61d461" />
            </TouchableOpacity>
          </View>
        </View>
      )}

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
