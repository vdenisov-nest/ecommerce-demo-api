import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/types/user.type';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO, LoginDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
  ) {}

  private sanitizeUser(user: IUser) {
    return user.depopulate('password');
  }

  async create(userDto: RegisterDTO) {
    // tslint:disable-next-line:no-console
    console.log('(register) userDto =>', userDto);

    const { username } = userDto;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new BadRequestException('User already exists !');
    }

    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(userDto: LoginDTO) {
    // tslint:disable-next-line:no-console
    console.log('(login) userDto =>', userDto);

    const { username, password } = userDto;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials !');
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (isPassMatch) {
      return this.sanitizeUser(user);
    } else {
      throw new UnauthorizedException('Invalid credentials !');
    }
  }

  async findByPayload(payload: any) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }
}
