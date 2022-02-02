import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardDto } from './dto/board.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>
  ) {}

  async create(boardDto: BoardDto) {
    if (boardDto.id) delete boardDto.id;

    boardDto.columns.map((column, index) => {
      const newColumn = column;
      if (!newColumn.title) newColumn.title = `coumn title ${index + 1}`;
      if (!newColumn.order) newColumn.order = index + 1;

      return newColumn;
    });

    const createdBoard = this.boardsRepository.create(boardDto);

    return await this.boardsRepository.save(createdBoard);
  }

  async findAll() {
    const boards = await this.boardsRepository.find();

    return boards;
  }

  async findOne(boardId: string) {
    const board = await this.boardsRepository.findOne(boardId);

    if (board) return board;

    throw new NotFoundException(`Board with id = ${boardId} was not found`);
  }

  async update(boardId: string, boardDto: BoardDto) {
    if (boardDto.id) delete boardDto.id;
    const updatedBoard = await this.boardsRepository.findOne(boardId);

    if (updatedBoard) {
      Object.assign(updatedBoard, boardDto);
      return await this.boardsRepository.save(updatedBoard);
    }

    throw new NotFoundException(`Board with id = ${boardId} was not found`);
  }

  async delete(boardId: string) {
    const result = await this.boardsRepository.delete(boardId);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with id = ${boardId} was not found`);
    }
  }
}
