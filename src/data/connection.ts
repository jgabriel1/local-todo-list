import { useEffect, useState } from 'react';
import { createConnection } from 'typeorm';
import { TodoModel } from './entities/TodoModel';

export default function useDatabaseConnection() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    createConnection({
      type: 'expo',
      database: 'test',
      synchronize: true,
      entities: [TodoModel],

      driver: require('expo-sqlite'),
    }).then(() => {
      setIsConnected(true);
    });
  }, []);

  return {
    isConnected,
  };
}
