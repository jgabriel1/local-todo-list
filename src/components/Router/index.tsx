import React, { useCallback, useState } from 'react';
import TodoList from '../TodoList';
import TodoListsCatalog from '../TodoListsCatalog';

interface SelectedList {
  id: number;
  name: string;
}

const Routes: React.FC = () => {
  const [selectedList, setSelectedList] = useState<SelectedList | null>(null);

  const navigateToList = useCallback((id: number, name: string) => {
    setSelectedList({ id, name });
  }, []);

  const returnToCatalog = useCallback(() => {
    setSelectedList(null);
  }, []);

  return (
    <>
      {selectedList ? (
        <TodoList
          listId={selectedList.id}
          listName={selectedList.name}
          returnToCatalog={returnToCatalog}
        />
      ) : (
        <TodoListsCatalog navigateToList={navigateToList} />
      )}
    </>
  );
};

export default Routes;
