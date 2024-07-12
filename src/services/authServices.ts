import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { IUser } from '../interfaces/userInterface';

const register = async (userData: IUser) => {
  const { username, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;
  const newUser = new User(userData);

  const user = await newUser.save();

  return user;
};

const login = async (userData: { email: string; password: string }) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const role = user.role;

  const token = jwt.sign({ userId: user._id, role: user.role }, 'my_jwt_secret');


  return { token, role };
};

const allUser = async (): Promise<IUser[]> => {
  const user = User.aggregate(
    [
      {
        $project: {
          username: 1,
          email: 1,
          role: 1
        }
      }
    ]
  )
  return user;
}

export default { register, login,allUser };
