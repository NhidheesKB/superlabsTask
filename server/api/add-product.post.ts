import { addProductValidator } from "#server/validator/validator";
import ProductService from "#server/service/productService";
import CloudinaryService from "#server/service/cloudinaryService";
const Product = new ProductService();
const cloudinary= new CloudinaryService()
defineRouteMeta({
  openAPI: {
    tags: ["Products"],
    summary: "Create Product",
    description: "Create a new product with image upload",
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: [
              "name",
              "stock",
              "description",
              "price",
              "image"
            ],
            properties: {
              name: {
                type: "string",
                example: "Vitamin C Serum"
              },
              stock: {
                type: "number",
                example: 25
              },
              description: {
                type: "string",
                example: "Brightening face serum"
              },
              price: {
                type: "number",
                example: 799
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
        description: "Product created successfully"
      },
      400: {
        description: "Validation error"
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
  for (const item of files) {
    if (item.name === "image") image = item;
    else body[item.name!] = item.data.toString();
  }
  
  const { name, stock, description, price } =
    addProductValidator.parse(body);

  if (!image) {
    throw createError({
      statusCode: 400,
      statusMessage: "Image required",
    });
  }

  if (!["image/png", "image/jpeg"].includes(image.type!)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Only JPG/PNG allowed",
    });
  }
  const uploaded = await cloudinary.upload(image)

  await Product.addproduct(
    uploaded.secure_url,
    name,
    stock,
    description,
    price
  );

  return { success: true };
});
