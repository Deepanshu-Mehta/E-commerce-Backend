import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    if(!decoded){
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
