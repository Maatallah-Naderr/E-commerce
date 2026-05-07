import API from"../api/api"

export async function addToCartAPI(productId ){
    const {data}= await API.post("/cart/addToCart",
     
        {
            productId,
            quantity:1

        }
        
    )
return data;
}
export async function getCart(){
    const {data}= await API.get("/cart/getCart");
    return data ;
}
export async function removeCart(productId) {
    const {data} = await API.delete(`/cart/removeItem/${id}`)
    return data;
    
}
export const incriseAPI = async(id)=>{
   return  API.patch(`/cart/incrise/${id}`)

}
export const decriseAPI = async(id )=>{
    return API.patch(`/cart/decrise/${id}`)
   
}