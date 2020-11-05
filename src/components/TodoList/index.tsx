import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import Todo from '../Todo';

import styles from './styles';

const TodoList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My todo list</Text>
      </View>

      <View style={styles.newTodoContainer}>
        <TextInput style={styles.newTodoInput} placeholder="New To-Do..." />
        <Button
          title="Add Todo"
          onPress={() => {
            console.log('press');
          }}
        />
      </View>

      <View style={styles.todosContainer}>
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </View>
    </View>
  );
};

export default TodoList;
