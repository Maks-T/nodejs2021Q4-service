import { TaskEntity } from 'src/resources/tasks/entities/task.entity';
import {
  PrimaryGeneratedColumn,
  AfterLoad,
  Entity,
  Column,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ColumnEntity } from './column.entity';

@Entity('boards')
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 'new colum' })
  title!: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, {
    eager: true,
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
  })
  @JoinTable()
  columns!: ColumnEntity[];

  @OneToMany(() => TaskEntity, (task) => task.board, {
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
