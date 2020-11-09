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
      const newTodo = await todosRepository.create({
        text,
        status: false,
      });

      setTodos(current => [...current, newTodo]);
    },
    [todosRepository],
  );

  const deleteTodo = useCallback(
    async (todoId: number) => {
      await todosRepository.delete(todoId);

      setTodos(current => current.filter(todo => todo.id !== todoId));
    },
    [todosRepository],
  );

  const toggleTodo = useCallback(
    async (todoId: number) => {
      await todosRepository.toggleCompleted(todoId);

      setTodos(current =>
        current.map(todo =>
          todo.id === todoId ? { ...todo, status: !todo.status } : todo,
        ),
      );
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
