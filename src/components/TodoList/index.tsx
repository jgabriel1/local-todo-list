import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
  BorderlessButton,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import useTodos from './useTodos';
import useModalButtonAnimation from './animations/useModalButtonAnimation';
import useInputDropAnimation from './animations/useInputDropAnimation';

import Todo from '../Todo';

import styles from './styles';

const TodoList: React.FC = () => {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

  const newTodoInputRef = useRef<TextInput>(null);

  const [newTodo, setNewTodo] = useState('');
  const [showNewTodoInput, setShowNewTodoInput] = useState(false);

  const {
    style: buttonAnimatedStyle,
    startAnimation: triggerRotateAnimation,
  } = useModalButtonAnimation(showNewTodoInput);

  const {
    style: inputDropAnimationStyle,
    startAnimation: triggerInputDropAnimation,
  } = useInputDropAnimation(showNewTodoInput);

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

  useEffect(() => {
    triggerRotateAnimation();
    triggerInputDropAnimation();

    if (showNewTodoInput) {
      newTodoInputRef.current?.focus();
    } else {
      newTodoInputRef.current?.blur();
    }
  }, [showNewTodoInput, triggerInputDropAnimation, triggerRotateAnimation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My tasks</Text>

        <BorderlessButton onPress={handleToggleNewTodoInputModal}>
          <Animated.View style={buttonAnimatedStyle}>
            <Icon
              size={36}
              name="plus"
              color={showNewTodoInput ? '#f15f5f' : '#000'}
            />
          </Animated.View>
        </BorderlessButton>
      </View>

      <Animated.View style={[styles.newTodoContainer, inputDropAnimationStyle]}>
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
      </Animated.View>

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
