import { Request, Response, NextFunction } from "express";


const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  user = req?.user?.role;
    if(user == 'ADMIN'){
        next();
    }
    else{
        res.status(401).json({ message: "Unauthorized" });
        return;
        }
  } catch (err) {
   res.status(500).json({ message: "Internal Server Error" });
   return
  }
};

export default adminMiddleware;