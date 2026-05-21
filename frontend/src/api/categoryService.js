
import API from "./api"

export const getAllCategory = async()=>{
    const {data}= await API.get("/category/all")
    console.log(data )
    return data 

}