import axios from "axios"
const API =`http://localhost:5000/api/auth`
export default async function registerForm (userdata){
    try{
        const{data}= await axios.post(`${API}/register`,userdata )
    return data
    }catch(error){
        console.log(error.message||error.response?.data?.message )
    }
    
}