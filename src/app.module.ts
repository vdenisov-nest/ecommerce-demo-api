import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

const { MONGO_URI } = process.env;
// tslint:disable-next-line:no-console
console.log('MONGO_URI =>', MONGO_URI);

@Module({
  imports: [
    MongooseModule.forRoot(
      MONGO_URI,
      { useNewUrlParser: true },
    ),
    SharedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
