import { Request, Response } from "express";
import { Router } from "express";
import {login, signup} from "../controller/auth";
const authRoute:Router = Router();

authRoute.post('/signup', (req : Request, res: Response)=>{
    signup(req , res);
});
authRoute.post('/login',  (req : Request, res: Response)=>{
    login(req , res);
});


export default authRoute;