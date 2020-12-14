import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTodosTable1607975110631 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'text',
            type: 'text',
          },
          {
            name: 'status',
            type: 'boolean',
          },
          {
            name: 'list_id',
            type: 'int',
          },
        ],
      }),
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('todos');
  }
}
