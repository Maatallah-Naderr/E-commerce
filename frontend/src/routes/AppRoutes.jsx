

import {BrowserRouter , Routes,Route} from "react-router-dom"
import Home from "../pages/Home"
import MainLayout from "../components/Layouts/MainLayout"
export default function appRoutes() {

  return (
   <BrowserRouter>
<Routes>
   <Route element={<MainLayout/>} >
    <Route path="/" element={<Home/>} />
</Route>
    
</Routes>

   </BrowserRouter>
  )
}
