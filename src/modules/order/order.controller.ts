import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/shared/utilities';
import { IUser as UserDocument } from 'src/shared/types';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './order.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  listOrders(@User() { id }: UserDocument) {
    return this.orderService.listOrdersByUser(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createOrder(@Body() order: CreateOrderDTO, @User() { id }: UserDocument) {
    return this.orderService.createOrder(order, id);
  }
}