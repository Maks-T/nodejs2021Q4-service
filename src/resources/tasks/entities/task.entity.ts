import { BoardEntity } from 'src/resources/boards/entities/board.entity';
import { ColumnEntity } from 'src/resources/boards/entities/column.entity';
import { UserEntity } from 'src/resources/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 'new task' })
  title!: string;

  @Column()
  description!: string;

  @Column()
  order!: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks, {
    eager: false,
    onDelete: 'SET NULL',
  })
  user!: UserEntity;

  @Column({ nullable: true })
  userId!: string | null;

  @ManyToOne(() => BoardEntity, (board) => board.tasks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  board!: BoardEntity;

  @Column({ nullable: true })
  boardId!: string;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, {
    eager: false,
  })
  column!: ColumnEntity;

  @Column({ nullable: true })
  columnId!: string;
}
