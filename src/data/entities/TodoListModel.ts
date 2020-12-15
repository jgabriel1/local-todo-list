import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo_lists')
export class TodoListModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
