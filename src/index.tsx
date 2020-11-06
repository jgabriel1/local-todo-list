import React from 'react';
import { StatusBar } from 'expo-status-bar';

import TodoList from './components/TodoList';

import { DatabaseConnectionProvider } from './data/connection';

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="auto" />
      <DatabaseConnectionProvider>
        <TodoList />
      </DatabaseConnectionProvider>
    </>
  );
};

export default App;
