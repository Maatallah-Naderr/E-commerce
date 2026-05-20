import { useState } from "react"
import registerForm from "../api/registreUser"
import {useNavigate} from "react-router-dom"
export default function Registre() {
    const [formData , setFormData]=useState({name:"" , email :"", password : ""});
    const [loading , setLoading]=useState(false);
    const [message , setMessage]= useState("");
    const [error, setError]= useState("");
    const navigate = useNavigate();
    function handleChange(e){
        setFormData({...formData , [e.target.name]:e.target.value})

    }
    async function handleSubmit(e){
        e.preventDefault();
       
        try{
            setLoading(true);
            setMessage("");
            setError("")
        const data= await registerForm(formData)
        console.log(data)
        setMessage("register with success redirectring to login page")
      setFormData({
        name :"",
        email:"",
        password:""
      })
      setTimeout(() => {
        navigate('/login')
        
      },2000);
      
        }catch(error){
           setError(error.response?.data?.message)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className ="form-register-container">
        <form onSubmit={handleSubmit} >
        <input
         type ="text" 
         placeholder="Entre your name"
         name= 'name'
         value={formData.name}
         onChange={handleChange}
        required     />
       <input
         type ="email"
         placeholder="Enter your Email"
         name ='email'
value={formData.email}
onChange={handleChange}

 required 
       />
       <input
       type ='password'
       placeholder="Enter your password "
       name="password"
       value={formData.password}
onChange={handleChange}
       
        required 
       />
       <button type="Submit" disabled={loading}>{loading? "loading please wait...": "Submit"}</button>

        </form>
      {message && <p className="message-succes">{message}</p>}
      {error &&<p className="error-message"> {error}</p>}

    </div>
  )
}
