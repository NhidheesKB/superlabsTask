import { searchProductValidator } from "#server/validator/validator"
import ProductService from "#server/service/productService"
const product=new ProductService()
defineRouteMeta({
  openAPI: {
    tags: ["Products"],
    summary: "Search Products",
    description:
      "Search products by product name or description using keyword text.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["search"],
            properties: {
              search: {
                type: "string",
                example: "vitamin c",
                description:
                  "Search keyword for matching product name or description"
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: "Matching products fetched successfully",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number", example: 1 },
                  name: {
                    type: "string",
                    example: "Vitamin C Face Serum"
                  },
                  description: {
                    type: "string",
                    example: "Brightens skin and improves tone"
                  },
                  price: {
                    type: "string",
                    example: "899.00"
                  },
                  images: {
                    type: "string",
                    example:
                      "https://res.cloudinary.com/demo/image.jpg"
                  },
                  stock: {
                    type: "number",
                    example: 25
                  },
                  created_at: {
                    type: "string",
                    format: "date-time"
                  },
                  updated_at: {
                    type: "string",
                    format: "date-time"
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: "Invalid request"
      }
    }
  }
});

export default defineEventHandler(async(event)=>{
    const {search}=await readValidatedBody(event,searchProductValidator.parse)
    return await product.searchProduct(search)
})