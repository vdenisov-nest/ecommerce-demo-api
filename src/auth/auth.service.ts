import { Injectable } from '@nestjs/common';
import { UserService } from '../shared/services';
import { sign } from 'jsonwebtoken';
import { IPayload } from '../types';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: IPayload) {
    return sign(payload, 'secret-key', {expiresIn: '7d'});
  }

  async validateUser(payload: IPayload) {
    return await this.userService.findByPayload(payload);
  }
}
