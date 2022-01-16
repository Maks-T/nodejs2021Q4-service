import { getRepository } from 'typeorm';
import { BoardEntity } from './board.entity';

export const boardRepo = () => getRepository(BoardEntity);
