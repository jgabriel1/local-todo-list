import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TodoList from './components/TodoList';
import TodoListsCatalog from './components/TodoListsCatalog';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="TodoListsCatalog" headerMode="none">
        <Screen name="TodoListsCatalog" component={TodoListsCatalog} />
        <Screen name="TodoList" component={TodoList} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
