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
import { ValidationDtoPipe } from 'src/pipes/validation.dto.pipe';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSheme } from './shemes/user.sheme';


@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user (remove password from response)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserSheme,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ValidationDtoPipe())
    userDto: UserDto
  ) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({ summary: 'Get all users (remove password from response)' })
  @ApiResponse({ status: HttpStatus.OK, type: [UserSheme] })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id (remove password from response)' })
  @ApiResponse({ status: HttpStatus.OK, type: UserSheme })
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @ApiOperation({
    summary: 'Update user by id (remove password from response)',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserSheme })
  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('userId') userId: string,
    @Body(new ValidationDtoPipe()) userDto: UserDto
  ) {
    return this.usersService.update(userId, userDto);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.delete(userId);
  }
}
