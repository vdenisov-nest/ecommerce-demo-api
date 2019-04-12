import { Document } from 'mongoose';

interface IAddress {
  row1: string;
  row2: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}

export interface IUser extends Document {
  username: string;
  readonly password: string;
  isSeller: boolean;
  address: IAddress;
  createdAt: Date;
}
