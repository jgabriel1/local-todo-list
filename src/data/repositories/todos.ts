import { Connection, QueryRunner, Repository } from 'typeorm';
import { TodoModel } from '../entities/TodoModel';

interface ICreateTodoDTO {
  text: string;
}

export class TodosRepository {
  private ormRepository: Repository<TodoModel>;

  private queryRunner: QueryRunner;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(TodoModel);
    this.queryRunner = connection.createQueryRunner();
  }

  public async create({ text }: ICreateTodoDTO): Promise<TodoModel> {
    const todo = this.ormRepository.create({
      text,
      status: false,
    });

    await this.ormRepository.save(todo);

    return todo;
  }

  public async getAll(): Promise<TodoModel[]> {
    const todos = await this.ormRepository.find();

    return todos;
  }

  public async toggleCompleted(todoId: number): Promise<void> {
    await this.queryRunner.query(
      'UPDATE todos SET status = ((status | 1) - (status & 1)) WHERE id = ?;',
      [todoId],
    );
  }

  public async delete(todoId: number): Promise<void> {
    await this.queryRunner.query('DELETE FROM todos WHERE id = ?;', [todoId]);
  }
}
