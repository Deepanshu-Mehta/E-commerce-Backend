import { Request, Response } from "express";
import { prisma } from "../database/db";
import { compare, hash } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../secret";
import { loginSchema, signupSchema } from "../schema/user";

// Signup Controller
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid request data",
        errors: result.error.format(),
      });
      return; 
    }

    const { name, email, password } = result.data;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return; 
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return; 
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
    return; 
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal Server Error Occurred" });
    return; 
  }
};

// Login Controller
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid request data",
        errors: result.error.format(),
      });
      return; 
    }

    const { email, password } = result.data;
    if (!email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return; 
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      res.status(400).json({ message: "Email does not exist" });
      return; 
    }

    const isValidPassword = await compare(password, existingUser.password);
    if (!isValidPassword) {
      res.status(400).json({ message: "Invalid Password" });
      return; 
    }

    const token = jwt.sign({ id: existingUser.id }, SECRET_KEY);

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: { id: existingUser.id, email: existingUser.email },
    });
    return; 
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal Server Error Occurred" });
    return; 
  }
};
export const me = (req: Request, res: Response): void => {
  try {
    const user = (req as any).user;
    if (user?.role) {
      res.json(user.role);
      return;
    } else {
      res.status(400).json({ message: "User not found" });
      return;
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};