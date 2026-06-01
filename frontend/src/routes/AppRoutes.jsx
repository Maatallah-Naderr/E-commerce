import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../components/Layouts/MainLayout";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Registre";
import Categories from "../pages/Categories";
import CategoriesProduct from "../pages/CategoriesProduct";
import ProductDetails from "../pages/ProductDetails";
import AdminRoute from "../components/admin/AdminRoute";
import Dashboard from "../pages/Dashboard";
import CategoriesAdmin from "../pages/CategoriesAdmin";
import ProductAdmin from "../pages/ProductAdmin";
import AdminLayout from "../components/admin/AdminLayout";
export default function appRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Categories/:id" element={<CategoriesProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="dashboard" element={
          <AdminRoute>
            {<AdminLayout/>}
          </AdminRoute>

        }>
       <Route index element={<Dashboard/>}/>
       <Route path="categories" element={<CategoriesAdmin/>}/>
       <Route path="product" element={<ProductAdmin/>}/>



        </Route>

      </Route>
     
    
    </Routes>
  );
}
