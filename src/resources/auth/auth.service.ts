import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(authData: AuthDto) {
    const { login, password } = authData;
    const user = await this.userService.findByLogin(login);

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { userId: user.id, login };
      const token = this.jwtService.sign(payload);
      return { token };
    }

    throw new ForbiddenException(`Invalid login or password`);
  }
}
