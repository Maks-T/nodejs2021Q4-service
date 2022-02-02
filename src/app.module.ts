import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { WinstonModule } from 'nest-winston';
import configWinston from './common/logger-cfg';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './resources/auth/auth.module';
import { FileModule } from './resources/file/file.module';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: 'local-db.env' }),
    WinstonModule.forRoot(configWinston),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/**/*.entity{.ts,.js}'], //ToDO check path dist
      synchronize: true,
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
