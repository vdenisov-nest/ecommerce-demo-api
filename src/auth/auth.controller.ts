import { Controller, Post, Get, Body, UseGuards, UseFilters } from '@nestjs/common';
import { UserService } from 'src/shared/services';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/shared/filters';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return { auth: 'works' };
  }

  @Post('login')
  async login(@Body() userDto: LoginDTO) {
    const user = await this.userService.findByLogin(userDto);
    const payload = {
      username: user.username,
      isSeller: user.isSeller,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDto: RegisterDTO) {
    const user = await this.userService.create(userDto);
    const payload = {
      username: user.username,
      isSeller: user.isSeller,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
