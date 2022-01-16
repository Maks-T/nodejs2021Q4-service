import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany((_type) => TaskEntity, (task) => task.user, {
    eager: false,
  })
  tasks!: TaskEntity[];

  toResponse() {
    const { id, name, login } = this;
    return { id, name, login };
  }
}
