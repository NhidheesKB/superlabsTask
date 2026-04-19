import { individualProductValidator } from "#server/validator/validator"
import ProductService from "#server/service/productService"
const product =new ProductService()
defineRouteMeta({
  openAPI: {
    tags: ["Products"],
    summary: "Get Single Product",
    description:
      "Fetch complete product details by product ID including reviews.",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "number",
          example: 1
        },
        description: "Product ID"
      }
    ],
    responses: {
      200: {
        description: "Product details fetched successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "number", example: 1 },
                name: {
                  type: "string",
                  example: "Vitamin C Face Serum"
                },
                description: {
                  type: "string",
                  example:
                    "Brightens skin and improves skin tone."
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
                  example: 20
                },
                created_at: {
                  type: "string",
                  format: "date-time"
                },
                updated_at: {
                  type: "string",
                  format: "date-time"
                },
                reviews: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                        example: 1
                      },
                      product_id: {
                        type: "number",
                        example: 1
                      },
                      rating: {
                        type: "number",
                        example: 5
                      },
                      comment: {
                        type: "string",
                        example:
                          "Very good product. Recommended."
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
          }
        }
      },
      404: {
        description: "Product not found"
      }
    }
  }
});
export default defineEventHandler(async(event)=>{
    const {id}=await getValidatedRouterParams(event,individualProductValidator.parse)
    return await product.showDetails(id)
})