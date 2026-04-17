import z from "zod";

export const addProductValidator=z.object({
    name:z.string().trim(),
    stock:z.number().min(1),
    image:z.file().mime(["image/jpeg","image/png"])

})