import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';

export const userRepo = () => getRepository(UserEntity);
