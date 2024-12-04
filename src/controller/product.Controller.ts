import { prisma } from "../database/db";
import { productSchema } from "../schema/product";
import { Request, Response } from "express";


export const createProduct = async (req: Request, res: Response) => {
  try {
    const result = productSchema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json({message: "Invalid product data",errors: result.error.format()});
      return;
    }

    const { name, price, description, tags } = result.data;

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        description: description || '',
        tags: tags || ''
      }
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });
    return
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
    return
  }
};
  
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

     res.status(200).json(products);
     return
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
export const getProductById = async (req: Request, res: Response) =>{
  try {
  const id = req.params.id;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) }
    });
    if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
    }
    res.status(200).json(product);
    return
    } 
    catch (err) {res.status(500).json({ error: "Internal Server Error" });
      return;
      }
}
  
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = productSchema.partial().safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Invalid product data",
        errors: result.error.format()
      });
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: result.data
    });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
  
  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      await prisma.product.delete({
        where: { id: parseInt(id) }
      });
  
      res.status(200).json({ message: "Product deleted successfully" });
      return;
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  };