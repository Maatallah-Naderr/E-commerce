import API from "./api";

 export const  getAllOrders = async()=>{
    const {data}= await API.get("/order/getAllOrder")
    return data;
}
export const updateOrder =async(id ,status)=>{
    const {data}= await API.patch(`/order/updateStatusOrder/${id}/{status}`,{status})
    return data
}