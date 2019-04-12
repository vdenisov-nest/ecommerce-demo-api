import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/shared/services';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() userDto: LoginDTO) {
    return await this.userService.findByLogin(userDto);
  }

  @Post('register')
  async register(@Body() userDto: RegisterDTO) {
    return await this.userService.create(userDto);
  }
}
