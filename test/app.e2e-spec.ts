import 'dotenv/config';

import { RegisterDTO, LoginDTO } from 'src/auth/auth.dto';
import { HttpStatus } from '@nestjs/common';

import * as request from 'supertest';
import * as mongoose from 'mongoose';

const { MONGO_URI } = process.env;
const apiUrl = 'http://localhost:3000/api';

beforeAll(async () => {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
  // await mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await mongoose.disconnect(done);
});

describe('(e2e) ROOT', () => {
  it('should ping', () => {
    return request(apiUrl)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('(e2e) AUTH', () => {
  it('should register', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
    };

    return request(apiUrl)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should reject duplicate registration', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
    };

    return request(apiUrl)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.message).toEqual('User already exists !');
        expect(body.code).toEqual(HttpStatus.BAD_REQUEST);
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login', () => {
    const user: LoginDTO = {
      username: 'username',
      password: 'password',
    };

    return request(apiUrl)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });
});
