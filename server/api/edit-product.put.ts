import CloudinaryService from "#server/service/cloudinaryService";
import ProductService from "#server/service/productService";
import { editProductValidator } from "#server/validator/validator";
import { z } from "zod";
const cloudinary = new CloudinaryService();
const product = new ProductService();
type EditProduct = z.infer<typeof editProductValidator> & {
  images?: string;
};
defineRouteMeta({
  openAPI: {
    tags: ["Products"],
    summary: "Edit Product",
    description:
      "Update selected product fields. Image is optional. Only changed fields need to be sent.",
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["id"],
            properties: {
              id: {
                type: "number",
                example: 1
              },
              name: {
                type: "string",
                example: "Updated Product Name"
              },
              description: {
                type: "string",
                example: "Updated description"
              },
              price: {
                type: "number",
                example: 999
              },
              stock: {
                type: "number",
                example: 25
              },
              image: {
                type: "string",
                format: "binary"
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: "Product updated successfully"
      },
      400: {
        description: "Validation error"
      },
      404: {
        description: "Product not found"
      }
    }
  }
});

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  if (!files) {
    throw createError({
      statusCode: 400,
      statusMessage: "No data received",
    });
  }
  let image: any = null;
  const body: any = {};
  for (const file of files) {
    if (file.name === "image") image = file;
    else body[file.name!] = file.data.toString();
  }
  const data:EditProduct = editProductValidator.parse(body)
  if (image) {
    if (!["image/png", "image/jpeg"].includes(image.type!)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Only JPG/PNG allowed",
      });
    }
    const uploaded = await cloudinary.upload(image);
    data.images = uploaded.secure_url;
  }
  await product.editProduct(data);
  return { success: true };
});
