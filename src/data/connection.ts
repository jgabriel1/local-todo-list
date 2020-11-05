import { useCallback, useEffect, useState } from 'react';
import { createConnection } from 'typeorm';
import { TodoModel } from './entities/TodoModel';

export default function useDatabaseConnection() {
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    await createConnection({
      type: 'expo',
      database: '@TodoList:default',
      synchronize: true,
      entities: [TodoModel],

      driver: require('expo-sqlite'),
    });

    setIsConnected(true);
  }, []);

  useEffect(() => {
    if (!isConnected) connect();
  }, [isConnected, connect]);

  return {
    isConnected,
  };
}
