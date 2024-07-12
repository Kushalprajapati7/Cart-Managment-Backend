import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/authServices';
import { IUser } from '../interfaces/userInterface';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = req.body;
    const result = await AuthService.register(user);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    })
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });

  }
}
export const allUser = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.allUser();
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });

  }
}

