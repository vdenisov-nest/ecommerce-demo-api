import { Injectable } from '@nestjs/common';
import { UserService } from 'src/shared/services';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: any) {
    return sign(payload, 'secret-key', {expiresIn: '7d'});
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}
