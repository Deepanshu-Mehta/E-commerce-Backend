import {z} from 'zod';

export const signupSchema = z.object({
    name : z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(255),
})

export const loginSchema = z.object({
    email : z.string().email(),
    password: z.string().min(8).max(255)
})

export const AddressSchema = z.object({
    AddressLine1: z.string().min(3).max(255),
    AddressLine2: z.string().nullable(),
    City: z.string().min(3).max(255),
    State: z.string().min(3).max(255),
    Country: z.string().min(3).max(255),
    PostalCode: z.string().max(6),

})