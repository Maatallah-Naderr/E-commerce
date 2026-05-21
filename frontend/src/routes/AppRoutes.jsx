

import {BrowserRouter , Routes,Route} from "react-router-dom"
import Home from "../pages/Home"
import MainLayout from "../components/Layouts/MainLayout"
import Cart from "../pages/Cart";
import Login from "../pages/Login"
import Register from "../pages/Registre"
import Categories from "../pages/Categories";

export default function appRoutes() {

  return (
  
<Routes>
   <Route element={<MainLayout/>} >
    <Route path="/" element={<Home/>} />
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path = "/register"element ={<Register/>}/>
    <Route path="/Categories" element ={<Categories/>}      />
</Route>
    
</Routes>

  
  )
}
