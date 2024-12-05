import { Request, Response } from "express";
import { AddressSchema } from "../schema/user";
const addAddress = async(req : Request, res: Response) =>{
    const {AddressLine1, AddressLine2, City, State, district, Country, PostalCode} = req.body;
    AddressSchema.safeParse(req.body);
    
}