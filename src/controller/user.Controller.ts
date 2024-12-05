import { Request, Response } from "express";
import { AddressSchema } from "../schema/user";
import { prisma } from "../database/db";

export const addAddress = async(req : Request, res: Response) =>{
    try{
        const verify = AddressSchema.safeParse(req.body);
    if(!verify.success){
        res.status(400).json(verify.error.issues);
        return;
        }
    const newAddress = await prisma.address.create({data : {...req.body, userId : req.user?.id}});
     res.status(201).json({message: "Address created successfully", newAddress});
     return
    }
    catch(err){
        res.status(500).json(err);
        return
    }
    
}


export const getAddress = async(req : Request, res:Response)=>{
    try{
        const addresses = await prisma.address.findMany({where : {userId : req.user?.id}})
        res.status(200).json({message: "Addresses retrieved successfully", addresses});
        return
    }
    catch(err){
        res.status(500).json({message : "Internal Server Error"});
        return
    }
}

