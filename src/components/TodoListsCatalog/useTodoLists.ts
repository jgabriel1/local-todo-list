import { useCallback, useState } from 'react';

import { useDatabaseConnection } from '../../data/connection';

interface List {
  id: number;
  name: string;
  total_todos: number;
  total_completed_todos: number;
}

interface CreateListParams {
  name: string;
}

export default function useTodoLists() {
  const { todoListsRepository } = useDatabaseConnection();

  const [lists, setLists] = useState<List[]>([]);

  const loadTodoLists = useCallback(async () => {
    const todoLists = await todoListsRepository.getAllInfos();

    setLists(todoLists);
  }, [todoListsRepository]);

  const addTodoList = useCallback(
    async ({ name }: CreateListParams) => {
      const newList = await todoListsRepository.create({ name });

      setLists(current => [
        ...current,

        // TypeORM returns the created object props as undefined, they have to
        // be directly assigned here. The interface will break otherwise:
        Object.assign(newList, {
          total_todos: 0,
          total_completed_todos: 0,
        }),
      ]);
    },
    [todoListsRepository],
  );

  const deleteTodoList = useCallback(
    async (deletedListId: number) => {
      await todoListsRepository.delete(deletedListId);

      setLists(current => current.filter(list => list.id !== deletedListId));
    },
    [todoListsRepository],
  );

  return {
    lists,
    loadTodoLists,
    addTodoList,
    deleteTodoList,
  };
}
