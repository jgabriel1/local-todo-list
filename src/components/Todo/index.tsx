import React from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import styles from './styles';

const Todo: React.FC = () => {
  return (
    <View style={styles.container}>
      <CheckBox />
      <Text style={styles.title}>Example todo</Text>
    </View>
  );
};

export default Todo;
