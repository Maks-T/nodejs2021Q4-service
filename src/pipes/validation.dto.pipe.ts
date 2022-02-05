import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthDto } from 'src/resources/auth/dto/auth.dto';

import { BoardDto } from 'src/resources/boards/dto/board.dto';
import { ColumnDto } from 'src/resources/boards/dto/column.dto';
import { TaskDto } from 'src/resources/tasks/dto/task.dto';
import { UserDto } from 'src/resources/users/dto/user.dto';

type Dto = UserDto | BoardDto | TaskDto | ColumnDto | AuthDto;

@Injectable()
export class ValidationDtoPipe implements PipeTransform<Dto> {
  async transform(value: Dto, metadata: ArgumentMetadata): Promise<Dto> {
    const obj = plainToClass(metadata.metatype, value);

    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map(
        (err) =>
          `${err.property} - ${Object.values(err.constraints).join(', ')}`
      );
      throw new BadRequestException(
        `Validation Exeption: ${messages.join('/ ')}`
      );
    }

    return value;
  }
}
