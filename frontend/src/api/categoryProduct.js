import API from "./api"
export  const productByCategory = async(id)=>{
    const {data}= await API.get(`/product/byCategory/${id}`)
    return data
}