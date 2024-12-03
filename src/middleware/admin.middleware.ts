import { Request, Response, NextFunction } from "express";

const adminMiddleware = async(req: Request, res: Response, next: NextFunction) => {

  try {
    }


 catch (err) {
    return res.status(500).json({ message: "Unauthorized: Invalid token" });
  }
};

export default adminMiddleware;

