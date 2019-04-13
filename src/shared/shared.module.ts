import { Module } from '@nestjs/common';
import { UserService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpExceptionFilter } from './filters';
import { LoggingInterceptor } from './interceptors';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { UserSchema } from './models/user.schema';
import { ProductSchema } from './models/product.schema';
import { OrderSchema } from './models/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [
    UserService,
  ],
})
export class SharedModule {}
