import { TaskEntity } from 'src/resources/tasks/entities/task.entity';
import { BoardEntity } from './board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('columns')
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @OneToMany(() => TaskEntity, (task) => task.column, {
    eager: true,
    cascade: true,
  })
  tasks!: TaskEntity[];

  @ManyToOne(() => BoardEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board!: BoardEntity;
}
