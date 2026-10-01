
import API from "../api/api"
export default async function getOneProduct(id){
    const {data}= await API.get(`/product/oneProduct/${id}`)
    return data;
}
export  async function getAllProducts(){
    const {data}=await API.get("/product/all") ; 
    return data;

}
export async function createProduct(formData){
    const {data} = await API.post("/product/add",formData)
   return data ;
}