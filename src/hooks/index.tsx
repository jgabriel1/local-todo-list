import React from 'react';
import { SelectedListProvider } from './selectedList';

const AppProvider: React.FC = ({ children }) => {
  return <SelectedListProvider>{children}</SelectedListProvider>;
};

export default AppProvider;
