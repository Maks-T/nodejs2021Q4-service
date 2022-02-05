import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { TaskEntity } from 'src/resources/tasks/entities/task.entity';

const encryptPassword: ValueTransformer = {
  to: (value: string) => bcrypt.hashSync(value, bcrypt.genSaltSync()),
  from: (value: string) => value,
};

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column({
    transformer: encryptPassword,
  })
  password!: string;

  @OneToMany(() => TaskEntity, (task) => task.user, {
    eager: false,
  })
  tasks!: TaskEntity[];

  toResponse() {
    const { id, name, login } = this;
    return { id, name, login };
  }
}
