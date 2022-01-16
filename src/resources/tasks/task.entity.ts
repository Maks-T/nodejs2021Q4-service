import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from '../boards/board.entity';
import { ColumnEntity } from '../boards/column.entity';
import { UserEntity } from '../users/user.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  order!: number;

  @ManyToOne((_type) => UserEntity, (user) => user.tasks, {
    eager: false,
    onDelete: 'SET NULL',
  })
  user!: UserEntity;

  @Column({ nullable: true })
  userId!: string | null;

  @ManyToOne((_type) => BoardEntity, (board) => board.tasks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  board!: BoardEntity;

  @Column({ nullable: true })
  boardId!: string;

  @ManyToOne((_type) => ColumnEntity, (column) => column.tasks, {
    eager: false,
  })
  column!: ColumnEntity;

  @Column({ nullable: true })
  columnId!: string;
}
