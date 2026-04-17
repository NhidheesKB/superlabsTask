import { addProductValidator } from "#server/validator/validator"

export default defineEventHandler(async(event)=>{
    const {name,stock,image}=await readValidatedBody(event,addProductValidator.parse)
    console.log("name",name,stock,image)
})