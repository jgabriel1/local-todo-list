import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoListModel } from './TodoListModel';

@Entity('todos')
export class TodoModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  text: string;

  @Column()
  status: boolean;

  @Column()
  list_id: number;

  @ManyToOne(() => TodoListModel, todoList => todoList.todos)
  @JoinColumn({ name: 'list_id' })
  list: TodoListModel;
}
