import { Controller, Post, Get, Body, UseGuards, UseFilters } from '@nestjs/common';
import { UserService } from '../shared/services';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../shared/filters';
import { IPayload } from '../types';

@Controller('auth')
// @UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('login')
  async login(@Body() userDto: LoginDTO) {
    const user = await this.userService.findByLogin(userDto);
    const payload: IPayload = {
      username: user.username,
      isSeller: user.isSeller,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDto: RegisterDTO) {
    const user = await this.userService.create(userDto);
    const payload: IPayload = {
      username: user.username,
      isSeller: user.isSeller,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
