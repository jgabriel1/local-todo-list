import React from 'react';
import { StatusBar } from 'expo-status-bar';

import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="auto" />
      <TodoList />
    </>
  );
};

export default App;
