import { useCallback, useEffect, useState } from 'react';
import { useDatabaseConnection } from '../../data/connection';

interface ITodo {
  id: number;
  text: string;
  status: boolean;
}

export default function useTodos() {
  const { todosRepository } = useDatabaseConnection();

  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = useCallback(
    async ({ text }: Pick<ITodo, 'text'>) => {
      const newTodo = await todosRepository.create({ text });

      setTodos(state => [...state, newTodo]);
    },
    [todosRepository],
  );

  useEffect(() => {
    todosRepository.getAll().then(setTodos);
  }, [todosRepository]);

  return {
    todos,
    addTodo,
  };
}
