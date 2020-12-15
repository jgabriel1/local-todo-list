import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateTodoListsTodosForeignKey1607977439306
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'todos',
      new TableForeignKey({
        name: 'TodoListTodos',
        columnNames: ['list_id'],
        referencedTableName: 'todo_lists',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('todos', 'TodoListTodos');
  }
}
