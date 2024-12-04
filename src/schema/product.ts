import { z } from 'zod';

// Product validation schema
export const productSchema = z.object({
  name: z.string().min(2).max(100),
  price: z.number().positive(),
  description: z.string().optional(),
  tags: z.string().optional()
});