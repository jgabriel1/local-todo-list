import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import styles from './styles';

interface TodoProps {
  id: number;
  text: string;
  status: boolean;
  handleDeleteTodo: (todoId: number) => Promise<void>;
  handleToggleTodo: (todoId: number) => Promise<void>;
}

const Todo: React.FC<TodoProps> = ({
  id,
  text,
  status,
  handleDeleteTodo,
  handleToggleTodo,
}) => {
  return (
    <View style={styles.container}>
      <CheckBox value={status} onChange={() => handleToggleTodo(id)} />
      <Text style={styles.title}>{text}</Text>

      <TouchableOpacity onPress={() => handleDeleteTodo(id)}>
        <Feather size={24} name="trash" />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;
