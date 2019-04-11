import { Document } from 'mongoose';

import { IUser } from './user.type';
import { IProduct } from './product.type';

interface IProductOrder {
  product: IProduct;
  quantity: number;
}

export interface IOrder extends Document {
  owner: IUser;
  totalPrice: number;
  products: IProductOrder[];
  createdAt: Date;
}
