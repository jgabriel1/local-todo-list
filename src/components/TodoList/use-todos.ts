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

  const deleteTodo = useCallback(
    async (todoId: number) => {
      await todosRepository.delete(todoId);

      setTodos(state => state.filter(todo => todo.id === todoId));
    },
    [todosRepository],
  );

  const toggleTodo = useCallback(
    async (todoId: number) => {
      await todosRepository.toggleCompleted(todoId);
    },
    [todosRepository],
  );

  useEffect(() => {
    todosRepository.getAll().then(setTodos);
  }, [todosRepository]);

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
}
