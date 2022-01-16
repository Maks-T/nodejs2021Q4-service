import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';
import { BoardEntity } from './board.entity';

@Entity('columns')
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @OneToMany((_type) => TaskEntity, (task) => task.column, {
    eager: true,
    cascade: true,
  })
  tasks!: TaskEntity[];

  @ManyToOne((_type) => BoardEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board!: BoardEntity;
}
