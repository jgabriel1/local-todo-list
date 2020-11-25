import { useCallback, useEffect, useReducer, Reducer } from 'react';
import { useDatabaseConnection } from '../../data/connection';

interface ITodo {
  id: number;
  text: string;
  status: boolean;
}

type ITodosReducer = Reducer<
  {
    todos: ITodo[];
    createdTodo: ITodo | null;
  },
  | { type: 'SET_TODOS'; payload: ITodo[] }
  | { type: 'SET_CREATED_TODO'; payload: ITodo }
  | { type: 'ADD_CREATED_TODO_TO_LIST' }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'TOGGLE_TODO'; payload: number }
>;

export default function useTodos(listId: number) {
  const { todosRepository } = useDatabaseConnection();

  const [{ todos, createdTodo }, todosDispatch] = useReducer<ITodosReducer>(
    (state, action) => {
      switch (action.type) {
        case 'SET_TODOS':
          return {
            ...state,
            todos: action.payload,
          };
        case 'SET_CREATED_TODO':
          return {
            ...state,
            createdTodo: action.payload,
          };
        case 'ADD_CREATED_TODO_TO_LIST':
          if (state.createdTodo) {
            return {
              ...state,
              todos: [...state.todos, state.createdTodo],
              createdTodo: null,
            };
          }
          return state;
        case 'DELETE_TODO':
          return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload),
          };
        case 'TOGGLE_TODO':
          return {
            ...state,
            todos: state.todos.map(todo =>
              todo.id === action.payload
                ? { ...todo, status: !todo.status }
                : todo,
            ),
          };
        default:
          return state;
      }
    },
    { todos: [], createdTodo: null },
  );

  const addTodo = useCallback(
    async ({ text }: Pick<ITodo, 'text'>) => {
      const newTodo = await todosRepository.create({
        text,
        status: false,
        list_id: listId,
      });

      todosDispatch({ type: 'SET_CREATED_TODO', payload: newTodo });
    },
    [listId, todosRepository],
  );

  const addCreatedTodoToList = useCallback(() => {
    todosDispatch({ type: 'ADD_CREATED_TODO_TO_LIST' });
  }, []);

  const deleteTodo = useCallback(
    async (todoId: number) => {
      await todosRepository.delete(todoId);

      todosDispatch({ type: 'DELETE_TODO', payload: todoId });
    },
    [todosRepository],
  );

  const toggleTodo = useCallback(
    async (todoId: number) => {
      await todosRepository.toggleCompleted(todoId);

      todosDispatch({ type: 'TOGGLE_TODO', payload: todoId });
    },
    [todosRepository],
  );

  useEffect(() => {
    todosRepository.getAllByListId(listId).then(loadedTodos => {
      todosDispatch({ type: 'SET_TODOS', payload: loadedTodos });
    });
  }, [listId, todosRepository]);

  return {
    todos,
    createdTodo,
    addTodo,
    addCreatedTodoToList,
    deleteTodo,
    toggleTodo,
  };
}
