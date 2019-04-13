import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

import { User } from 'src/shared/utilities';
import { IUser as UserDocument, IProduct } from '../../shared/types';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() product: CreateProductDTO,
    @User() user: UserDocument,
  ): Promise<IProduct> {
    return this.productService.create(product, user);
  }

  @Get()
  async listAll(): Promise<IProduct[]> {
    return this.productService.findAll();
  }

  @Get('mine')
  @UseGuards(AuthGuard('jwt'))
  async listMine(
    @User() user: UserDocument,
  ): Promise<IProduct[]> {
    const { id: userId } = user;
    return this.productService.findByOwner(userId);
  }

  @Get('seller/:id')
  async listBySeller(
    @Param('id') id: string,
  ): Promise<IProduct[]> {
    return this.productService.findByOwner(id);
  }

  @Get(':id')
  async read(
    @Param('id') id: string,
  ): Promise<IProduct> {
    return this.productService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDTO,
    @User() user: UserDocument,
  ): Promise<IProduct> {
    const { id: userId } = user;
    return this.productService.updateById(id, product, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @User() user: UserDocument,
  ): Promise<IProduct> {
    const { id: userId } = user;
    return this.productService.deleteById(id, userId);
  }
}
