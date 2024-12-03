import { Request, Response } from "express";
import { prisma } from "../database/db";
import {compare, hash} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../secret";
import { loginSchema, signupSchema } from "../routes/user";

export const signup = async (req : Request, res : Response)=>{
    try{
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            // If validation fails, return an error with the validation issues
            return res.status(400).json({
              message: "Invalid request data",
              errors: result.error.format()
            });
          }
        const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message: "Please fill all fields"})
    };
    const Existinguser = await prisma.user.findUnique({where:{email}});
    if(Existinguser){
        return res.status(400).json({message: "Email already exists"})
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({data : {name, email, password : hashedPassword}});
    return res.status(201).json({message: "User created successfully", newUser});
    }
    catch(err){
        return res.status(500).json({error : "Internal Server Error Occured"});
    }
}

export const login = async(req:Request, res : Response)=>{
    try{
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            // If validation fails, return an error with the validation issues
            return res.status(400).json({
                message: "Invalid request data",errors: result.error.format()});
            }
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please fill all fields"})
        }
        const Existinguser = await prisma.user.findUnique({where:{email}});
        if(!Existinguser){
            return res.status(400).json({message: "Email does not exist"})
        }
        const isValidPassword = await compare(password, Existinguser.password);
        if(!isValidPassword){
            return res.status(400).json({message: "Invalid Password"})
        }
        const token = jwt.sign({id: Existinguser.id},SECRET_KEY)
        return res.status(200).json({message: "User logged in successfully", token});

    }catch(err){
        return res.status(500).json({error : "Internal Server Error Occured"});
    }

}


