import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'src/shared/types';

import { IUser as UserDocument } from '../../shared/types';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<IProduct>,
  ) {}

  async create(productDTO: any, user: UserDocument): Promise<IProduct> {
    const product = await this.productModel.create({
      ...productDTO,
      owner: user,
    });
    await product.save();
    return product;
  }

  async findAll(): Promise<IProduct[]> {
    return await this.productModel.find()
      .populate('owner');
  }

  async findByOwner(userId: string): Promise<IProduct[]> {
    return await this.productModel.find({
      owner: userId
    });
  }

  async findById(id: string): Promise<IProduct> {
    return await this.productModel.findById(id)
      .populate('owner');
  }

  async updateById(id: string, productDTO: any, userId: string): Promise<IProduct> {
    const product = await this.productModel.findById(id);
    if (userId !== product.owner.toString()) {
      throw new UnauthorizedException('You dont own this product !');
    }
    await product.update(productDTO);
    return product;
  }

  async deleteById(id: string, userId: string): Promise<IProduct> {
    const product = await this.productModel.findById(id);
    if (userId !== product.owner.toString()) {
      throw new UnauthorizedException('You dont own this product !');
    }
    await product.remove();
    return product
  }
}
