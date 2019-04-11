import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  isSeller: {
    type: Boolean,
    default: false,
  },
  address: {
    row1: String,
    row2: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model('User', UserSchema);
