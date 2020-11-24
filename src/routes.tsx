import React, { useCallback, useState } from 'react';
import TodoList from './components/TodoList';
import TodoListsCatalog from './components/TodoListsCatalog';

const Routes: React.FC = () => {
  const [selectedListId, setSelectedListId] = useState(0);

  const navigateToList = useCallback((id: number) => {
    setSelectedListId(id);
  }, []);

  const returnToCatalog = useCallback(() => {
    setSelectedListId(0);
  }, []);

  return (
    <>
      {selectedListId ? (
        <TodoList />
      ) : (
        <TodoListsCatalog navigateToList={navigateToList} />
      )}
    </>
  );
};

export default Routes;
