import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class TodoModel {
  @PrimaryColumn()
  id: string;

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
