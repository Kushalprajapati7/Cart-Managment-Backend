import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces/userInterface';

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, required: true, enum: ['admin', 'user']}
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
