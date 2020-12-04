import React, { createContext, useCallback, useContext, useState } from 'react';

interface SelectedListData {
  id: number;
  name: string;
}

interface SelectedListContextData {
  selectedList: SelectedListData | null;
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
        selectedList,
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
