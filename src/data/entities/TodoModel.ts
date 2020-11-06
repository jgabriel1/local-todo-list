import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class TodoModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  text: string;

  @Column({
    nullable: true,
    default: false,
  })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
