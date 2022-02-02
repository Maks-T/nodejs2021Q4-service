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

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ValidationDtoPipe())
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }
}
