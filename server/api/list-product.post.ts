import { listproductValidator } from "#server/validator/validator"
import ProductService from "#server/service/productService"
const product=new ProductService()
export default defineEventHandler(async(event)=>{
    const { id}=await readValidatedBody(event,listproductValidator.parse)
    return await product.listProduct(id)
})