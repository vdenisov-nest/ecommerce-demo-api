import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  username: String,
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

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    // if (!this.isModified('password')) {
    //   return next();
    // }

    // tslint:disable-next-line:no-string-literal
    const hashed = await bcrypt.hash(this['password'], 10);
    // tslint:disable-next-line:no-string-literal
    this['password'] = hashed;
    return next();
  }
  catch (err) {
    return next(err);
  }
});

// export const UserModel = mongoose.model('User', UserSchema);
