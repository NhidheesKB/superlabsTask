import { individualProductValidator } from "#server/validator/validator"
import ProductService from "#server/service/productService"
const product =new ProductService()
export default defineEventHandler(async(event)=>{
    const {id}=await getValidatedRouterParams(event,individualProductValidator.parse)
    return await product.showDetails(id)
})