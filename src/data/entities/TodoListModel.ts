import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoModel } from './TodoModel';

@Entity('todo_lists')
export class TodoListModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TodoModel, todo => todo.list, {
    eager: true,
    onDelete: 'CASCADE',
  })
  todos: TodoModel[];
}
