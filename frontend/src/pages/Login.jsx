import { useContext, useState } from "react";


import loginAPI from "../api/loginAPI";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const {loginUser} = useContext(AuthContext)
const handleLogin= async(e)=>{
  e.preventDefault();
  try{
    const data = await loginAPI(email,password)
    console.log(data);
    localStorage.setItem("token", data.data.token)
    loginUser(data.data.token , data.user)
    
   setEmail("");
    setPassword("");
   navigate("/");
  }catch(error){
    console.log(error.response.data || error.message)
  }
}





  return (
    <div className="login-form">
    
      <form onSubmit={handleLogin}>
          <h2>login</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" >Login</button>
      </form>
    </div>
  );
}
