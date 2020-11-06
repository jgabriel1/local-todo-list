import { Connection, Repository } from 'typeorm';
import { TodoModel } from '../entities/TodoModel';

interface ICreateTodoDTO {
  text: string;
}

export class TodosRepository {
  private ormRepository: Repository<TodoModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(TodoModel);
  }

  public async create({ text }: ICreateTodoDTO): Promise<TodoModel> {
    const todo = this.ormRepository.create({
      text,
    });

    await this.ormRepository.save(todo);

    return todo;
  }

  public async getAll(): Promise<TodoModel[]> {
    const todos = await this.ormRepository.find();

    return todos;
  }

  public async toggleCompleted(todoId: number): Promise<void> {
    const todo = await this.ormRepository.findOne(todoId);

    if (!todo) {
      return;
    }

    todo.status = !todo.status;

    await this.ormRepository.save(todo);
  }

  public async delete(todoId: number): Promise<void> {
    await this.ormRepository.delete({ id: todoId });
  }
}
