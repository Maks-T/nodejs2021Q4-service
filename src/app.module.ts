import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import configWinston from './common/logger-cfg';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './resources/auth/auth.module';
import { FileModule } from './resources/file/file.module';
import configORM from './ormconfig';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: 'local-db.env' }),
    WinstonModule.forRoot(configWinston),
    TypeOrmModule.forRoot(configORM),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly appService: AppService) {
    this.appService.runHandleSpecialError();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
