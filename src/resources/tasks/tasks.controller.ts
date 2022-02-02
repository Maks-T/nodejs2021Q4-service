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
import { ValidationDtoPipe } from 'src/pipes/validation.dto.pipe';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { BoardsService } from '../boards/boards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OmitType } from '@nestjs/mapped-types';
import { TaskSheme } from './shemes/task.sheme';

@ApiTags('Tasks')
@Controller('boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly boardsService: BoardsService
  ) {}

  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TaskSheme,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('boardId') boardId: string,
    @Body(new ValidationDtoPipe())
    taskDto: TaskDto
  ) {
    await this.isBoardFound(boardId);
    return this.tasksService.create(boardId, taskDto);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [TaskSheme],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('boardId') boardId: string) {
    await this.isBoardFound(boardId);
    return this.tasksService.findAll(boardId);
  }

  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskSheme,
  })
  @Get(':taskId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ) {
    await this.isBoardFound(boardId);
    return this.tasksService.findOne(boardId, taskId);
  }

  @ApiOperation({ summary: 'Update task by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskSheme,
  })
  @Put(':taskId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body(new ValidationDtoPipe()) taskDto: TaskDto
  ) {
    await this.isBoardFound(boardId);
    return this.tasksService.update(boardId, taskId, taskDto);
  }

  @ApiOperation({ summary: 'Delete task by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskSheme,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':taskId')
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
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
