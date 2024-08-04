import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid', {
    name: 'todo_id',
  })
  todoId: string;

  @Column({
    type: 'varchar',
    name: 'user_id',
    length: 128,
  })
  userId: string;

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
