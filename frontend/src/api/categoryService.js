
import API from "./api"

export const getAllCategory = async()=>{
    const {data}= await API.get("/category/all")
    console.log(data )
    return data 

}
export const addCategory=async(formData)=>{
    console.log(localStorage.getItem("token"))
    const {data}= await API.post("/category/add",formData)
    return data 
}
export const deleteCategory= async(id)=>{
    const {data}= await API.delete(`/category/delete/${id}`)
    return data 
}
export const updateCategory = async(id, formData)=>{
    const {data}= await API.put(`/category/updateCategory/${id}`,formData)
    return data ;
}