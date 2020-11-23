import { Connection, Repository } from 'typeorm';
import { TodoListModel } from '../entities/TodoListModel';

interface ICreateTodoListDTO {
  name: string;
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

  public async getAll(): Promise<TodoListModel[]> {
    const lists = await this.ormRepository.find();

    return lists;
  }

  public async getOneById(listId: number): Promise<TodoListModel | null> {
    const list = await this.ormRepository.findOne(listId);

    return list || null;
  }
}
