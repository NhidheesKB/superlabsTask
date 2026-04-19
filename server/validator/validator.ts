import z from "zod";

export const addProductValidator = z.object({
  name: z.string().trim(),
  stock: z.coerce.number().min(0).positive(),
  description:z.string(),
  price:z.coerce.number().min(1).positive()
});

export const listproductValidator=z.object({
  id:z.number().min(1),
})  

export const editProductValidator = z.object({
  id: z.coerce.number().positive(),
  name: z.string().trim().min(1).optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive().optional(),
  stock: z.coerce.number().min(0).optional(),
});

export const deleteProductValidator=z.object({
  id:z.number().positive()
})

export const searchProductValidator=z.object({
  search:z.string().min(2)
})

export const individualProductValidator=z.object({
  id:z.coerce.number().positive()
})