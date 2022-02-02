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
  UseGuards,
 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationDtoPipe } from 'src/pipes/validation.dto.pipe';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ValidationDtoPipe())
    userDto: UserDto,
  ) {
    return this.usersService.create(userDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('userId') userId: string,
    @Body(new ValidationDtoPipe()) userDto: UserDto,
  ) {
    return this.usersService.update(userId, userDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.delete(userId);
  }
}
