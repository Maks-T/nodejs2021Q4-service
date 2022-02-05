import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import isIdValid from 'src/common/validaty-id';

@Injectable()
export class ValidIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const { userId, boardId, taskId } = request.params;

    if (userId && !isIdValid(userId))
      throw new BadRequestException(`UserId= ${userId} is not valid`);

    if (boardId && !isIdValid(boardId))
      throw new BadRequestException(`BoardId= ${userId} is not valid`);

    if (taskId && !isIdValid(taskId))
      throw new BadRequestException(`TaskId= ${userId} is not valid`);

    return next.handle();
  }
}
