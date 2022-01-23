import { getRepository } from 'typeorm';
import { TaskEntity } from './task.entity';

export const taskRepo = () => getRepository(TaskEntity);
