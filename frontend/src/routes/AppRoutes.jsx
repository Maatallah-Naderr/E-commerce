

import {BrowserRouter , Routes,Route} from "react-router-dom"
import Home from "../pages/Home"
import MainLayout from "../components/Layouts/MainLayout"
import Cart from "../pages/Cart";
import Login from "../pages/Login"
export default function appRoutes() {

  return (
   <BrowserRouter>
<Routes>
   <Route element={<MainLayout/>} >
    <Route path="/" element={<Home/>} />
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/login" element={<Login/>}/>
</Route>
    
</Routes>

   </BrowserRouter>
  )
}
