import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { BoardsService } from '../boards/boards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationDtoPipe } from 'src/pipes/validation.dto.pipe';

@Controller('boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly boardsService: BoardsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('boardId') boardId: string,
    @Body(new ValidationDtoPipe())
    taskDto: TaskDto,
  ) {
    await this.isBoardFound(boardId);
    return this.tasksService.create(boardId, taskDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('boardId') boardId: string) {
    await this.isBoardFound(boardId);
    return this.tasksService.findAll(boardId);
  }

  @Get(':taskId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    await this.isBoardFound(boardId);
    return this.tasksService.findOne(boardId, taskId);
  }

  @Put(':taskId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body(new ValidationDtoPipe()) taskDto: TaskDto,
  ) {
    await this.isBoardFound(boardId);
    return this.tasksService.update(boardId, taskId, taskDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':taskId')
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    await this.isBoardFound(boardId);
    return this.tasksService.delete(taskId);
  }

  async isBoardFound(boardId: string) {
    const foundBoard = await this.boardsService.findOne(boardId);

    if (!foundBoard) {
      throw new NotFoundException(`Board with id = ${boardId} was not found`);
    }
  }
}
