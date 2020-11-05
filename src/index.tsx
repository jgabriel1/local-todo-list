import React from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import TodoList from './components/TodoList';

import useDatabaseConnection from './data/connection';

const App: React.FC = () => {
  const { isConnected } = useDatabaseConnection();

  if (!isConnected) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <TodoList />
    </>
  );
};

export default App;
