import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import TodoCheckbox from '../TodoCheckbox';

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
    <Swipeable
      containerStyle={styles.swipeableContainer}
      friction={1}
      useNativeAnimations
      renderRightActions={() => (
        <View style={styles.deleteSwipeContainer}>
          <Feather
            name="trash-2"
            color="#fff"
            size={24}
            style={{ marginRight: 28 }}
          />
        </View>
      )}
      rightThreshold={Dimensions.get('window').width / 3}
      onSwipeableRightWillOpen={() => handleDeleteTodo(id)}
    >
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <TodoCheckbox value={status} onToggle={() => handleToggleTodo(id)} />
        </View>
        <Text style={[styles.todoText, status && { opacity: 0.3 }]}>
          {text}
        </Text>
      </View>
    </Swipeable>
  );
};

export default Todo;
