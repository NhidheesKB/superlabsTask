import z from "zod";

export const addProductValidator = z.object({
  name: z.string().trim(),
  stock: z.number().min(1),
  image: z.object({
    name: z.string(),
    size: z.number(),
    type: z.enum(["image/png", "image/jpeg"]),
    content: z.string(),
    lastModified:z.number()
  }),
  description:z.string(),
  price:z.number()
});

export const listproductValidator=z.object({
  id:z.number().min(1),
})