import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { createConnection, Connection } from 'typeorm';

import { TodoModel } from './entities/TodoModel';
import { TodosRepository } from './repositories/todos';

interface DatabaseConnectionContextData {
  todosRepository: TodosRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData,
);

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connectToDatabase = useCallback(async () => {
    const createdConnection = await createConnection({
      type: 'expo',
      database: 'TodoList.db',
      synchronize: true,
      entities: [TodoModel],

      driver: require('expo-sqlite'),
    });

    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    if (!connection) connectToDatabase();
  }, [connectToDatabase, connection]);

  if (!connection) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        todosRepository: new TodosRepository(connection),
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}
