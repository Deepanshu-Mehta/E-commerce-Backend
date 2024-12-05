import { prisma } from "../database/db";
import { cartSchema } from "../schema/user"
import { Request, Response } from "express";

export const addItem = async (req : Request, res: Response)=>{
    const verify = cartSchema.safeParse(req.body);
    if(!verify.success){
        res.status(400).json({message: "Invalid data"});
        return
    }
    const addItm = await prisma.cartItems.create({...req.body, userId : req.user?.id})
}

export const deleteItem = async (req : Request, res : Response) =>{}
export const updateItem = async (req : Request, res : Response) =>{}
export const getAll = async (req : Request, res : Response) =>{}

