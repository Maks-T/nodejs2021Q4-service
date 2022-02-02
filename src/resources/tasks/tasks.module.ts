import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from '../boards/boards.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [BoardsModule, TypeOrmModule.forFeature([TaskEntity]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
