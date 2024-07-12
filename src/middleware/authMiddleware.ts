import { Request, Response, NextFunction } from "express";
import CustomRequest from "../types/customRequest"; 
import jwt from 'jsonwebtoken'

async function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
    // console.log(req.headers);
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        // console.log("Inide middlwarw");

        const decoded = jwt.verify(token, 'my_jwt_secret') as { userId: string, role:string };
        // console.log("d",decoded);
        req.userId = decoded.userId;
        req.role = decoded.role;
        // console.log(req.userId);
        next();
    } catch (error:any) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export default verifyToken;
