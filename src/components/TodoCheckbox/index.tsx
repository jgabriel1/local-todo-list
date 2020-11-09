import React from 'react';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

interface TodoCheckboxProps {
  value: boolean;
  onToggle: () => void | Promise<void>;
}

const TodoCheckbox: React.FC<TodoCheckboxProps> = ({ value, onToggle }) => {
  return (
    <BorderlessButton onPress={onToggle}>
      {value ? (
        <Feather name="check" size={28} color="#61d461" />
      ) : (
        <Feather name="circle" size={28} color="#6161d4" />
      )}
    </BorderlessButton>
  );
};

export default TodoCheckbox;
