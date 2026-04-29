import axios from "axios";
const API=`http://localhost:5000/api/auth`;
   export default async function Login(email , password){  
    try{
        const res = await axios.post(

         `${API}/login`,
         {email , password}


        )
        return res.data

    }catch(error){
        console.log(error.message)
    }
}