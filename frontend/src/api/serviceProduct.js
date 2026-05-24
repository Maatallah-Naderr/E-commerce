
import API from "../api/api"
export default async function getOneProduct(id){
    const {data}= await API.get(`/product/oneProduct/${id}`)
    return data;
}