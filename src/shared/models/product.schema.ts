import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  image: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export const ProductModel = mongoose.model('Product', ProductSchema);
