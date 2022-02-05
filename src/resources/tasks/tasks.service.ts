import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>
  ) {}

  async create(boardId: string, taskDto: TaskDto) {
    if (taskDto.id) delete taskDto.id;
    const createdTask = this.tasksRepository.create({ ...taskDto, boardId });

    return await this.tasksRepository.save(createdTask);
  }

  async findAll(boardId: string) {
    const tasks = await this.tasksRepository.find({ where: { boardId } });

    return tasks;
  }

  async findOne(boardId: string, taskId: string) {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, boardId },
    });

    if (task) return task;

    throw new NotFoundException(`Task with id = ${taskId} was not found`);
  }

  async update(boardId: string, taskId: string, taskDto: TaskDto) {
    if (taskDto.id) delete taskDto.id;
    const updatedTask = await this.tasksRepository.findOne({
      where: { id: taskId, boardId },
    });

    if (updatedTask) {
      Object.assign(updatedTask, taskDto);
      return await this.tasksRepository.save(updatedTask);
    }

    throw new NotFoundException(`Task with id = ${taskId} was not found`);
  }

  async delete(taskId: string) {
    const result = await this.tasksRepository.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id = ${taskId} was not found`);
    }
  }
}
