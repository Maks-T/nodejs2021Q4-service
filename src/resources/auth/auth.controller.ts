import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { ValidationDtoPipe } from 'src/pipes/validation.dto.pipe';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthSheme } from './shemes/auth.sheme';
import { AuthInvalidSheme } from './shemes/auth.invalid.sheme';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'send login and password' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthSheme,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    type: AuthInvalidSheme,
  })
  @Post()
  @UsePipes(new ValidationDtoPipe())
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }
}
