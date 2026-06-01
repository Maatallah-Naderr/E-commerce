import { NavLink } from "react-router-dom";



export default function AdminSideBar() {

  return (
    
  <aside className="aside-container">
      <h2> Panel admin </h2>
      
        <NavLink to="/dashboard" end > Dashboard</NavLink>
      <NavLink to="/dashboard/categories"  > Categories</NavLink>
      <NavLink to="/dashboard/product"  > Products</NavLink>
     
      
</aside>
   
  )
}

