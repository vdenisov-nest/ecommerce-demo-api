import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const { MONGO_URI } = process.env;
console.log('MONGO_URI =>', MONGO_URI);

@Module({
  imports: [
    MongooseModule.forRoot(
      MONGO_URI,
      { useNewUrlParser: true },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
