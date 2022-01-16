import {
  PrimaryGeneratedColumn,
  AfterLoad,
  Entity,
  Column,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ColumnEntity } from './column.entity';
import { TaskEntity } from '../tasks/task.entity';

@Entity('boards')
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany((_type) => ColumnEntity, (column) => column.board, {
    eager: true,
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
  })
  @JoinTable()
  columns!: ColumnEntity[];

  @OneToMany((_type) => TaskEntity, (task) => task.board, {
    eager: false,
  })
  tasks!: TaskEntity[];

  @AfterLoad()
  sortItems(): void {
    if (this.columns.length > 0) {
      this.columns.sort((a, b) => a.order - b.order);
    }
  }
}
