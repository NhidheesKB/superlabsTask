import { deleteProductValidator } from "#server/validator/validator"
import ProductService from "#server/service/productService"
import CloudinaryService from "#server/service/cloudinaryService"
const product=new ProductService()
const cloudinary=new CloudinaryService()
defineRouteMeta({
  openAPI: {
    tags: ["Products"],
    summary: "Delete Product",
    description: "Delete a product by ID and remove its image from Cloudinary",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["id"],
            properties: {
              id: {
                type: "number",
                example: 1
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: "Product deleted successfully"
      },
      400: {
        description: "Invalid request"
      },
      404: {
        description: "Product not found"
      }
    }
  }
});
export default defineEventHandler(async(event)=>{
    const {id}=await readValidatedBody(event,deleteProductValidator.parse)
    const {images}=await product.deleteProduct(id)
    await cloudinary.delete(images)
})