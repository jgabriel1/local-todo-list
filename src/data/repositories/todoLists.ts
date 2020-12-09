import { Connection, Repository } from 'typeorm';
import { TodoListModel } from '../entities/TodoListModel';

interface ICreateTodoListDTO {
  name: string;
}

interface ITodoListInfo {
  id: number;
  name: string;
  total_todos: number;
  total_completed_todos: number;
}

export class TodoListsRepository {
  private ormRepository: Repository<TodoListModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(TodoListModel);
  }

  public async create({ name }: ICreateTodoListDTO): Promise<TodoListModel> {
    const list = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(list);

    return list;
  }

  public async getAllInfos(): Promise<ITodoListInfo[]> {
    const listInfos = await this.ormRepository.query(`
      SELECT
        todo_lists.id,
        todo_lists.name,
        COUNT(todos.id) AS total_todos,
        SUM(todos.status) AS total_completed_todos
      FROM
        todo_lists LEFT JOIN todos ON todo_lists.id = todos.list_id
      GROUP BY todo_lists.id;
    `);

    return listInfos;
  }

  public async getOneById(listId: number): Promise<TodoListModel | null> {
    const list = await this.ormRepository.findOne(listId);

    return list || null;
  }

  public async delete(listId: number): Promise<void> {
    await this.ormRepository.delete(listId);
  }
}
