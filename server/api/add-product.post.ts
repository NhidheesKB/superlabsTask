import { addProductValidator } from "#server/validator/validator"
import {ServerFile} from "nuxt-file-storage"
import ProductService from "#server/service/productService"
const Product=new ProductService()
export default defineEventHandler(async(event)=>{
    const {name,stock,image,description,price}=await readValidatedBody(event,addProductValidator.parse)
    const file=await storeFileLocally(image as unknown as ServerFile,20)
    await Product.addproduct(file,name,stock,description,price)
    return  {success:true}
})