import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { prisma } from "../database/db";

const authMiddleware = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  
    if (!user) {
      res.status(403).json({ message: "Unauthorized: User not found" });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Unauthorized: Token has expired" });
    } else {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  }
  
};

export default authMiddleware;
