import React, { createContext, useCallback, useContext, useState } from 'react';

interface SelectedListData {
  id: number;
  name: string;
}

interface SelectedListContextData {
  selectedListId: number;
  selectedListName: string;
  selectList(data: SelectedListData): void;
  clearSelectedList(): void;
}

const SelectedListContext = createContext({} as SelectedListContextData);

export const SelectedListProvider: React.FC = ({ children }) => {
  const [selectedList, setSelectedList] = useState<SelectedListData | null>(
    null,
  );

  const selectList = useCallback(({ id, name }: SelectedListData) => {
    setSelectedList({ id, name });
  }, []);

  const clearSelectedList = useCallback(() => {
    setSelectedList(null);
  }, []);

  return (
    <SelectedListContext.Provider
      value={{
        selectedListId: selectedList?.id || 0,
        selectedListName: selectedList?.name || '',
        selectList,
        clearSelectedList,
      }}
    >
      {children}
    </SelectedListContext.Provider>
  );
};

export function useSelectedList() {
  const context = useContext(SelectedListContext);

  return context;
}
