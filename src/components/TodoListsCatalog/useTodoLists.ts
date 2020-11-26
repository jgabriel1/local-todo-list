import { useCallback, useEffect, useState } from 'react';

import { useDatabaseConnection } from '../../data/connection';

interface List {
  id: number;
  name: string;
  todos: Array<{
    text: string;
    status: boolean;
  }>;
}

interface CreateListParams {
  name: string;
}

export default function useTodoLists() {
  const { todoListsRepository } = useDatabaseConnection();

  const [lists, setLists] = useState<List[]>([]);

  const addTodoList = useCallback(
    async ({ name }: CreateListParams) => {
      const newList = await todoListsRepository.create({ name });

      setLists(current => [
        ...current,

        // TypeORM returns the created object todos prop as undefined, it has to
        // be directly assigned here. The interface will break otherwise:
        Object.assign(newList, { todos: [] }),
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

  useEffect(() => {
    todoListsRepository.getAll().then(setLists);
  }, [todoListsRepository]);

  return {
    lists,
    addTodoList,
    deleteTodoList,
  };
}
