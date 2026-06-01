import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";


export default function AdminLayout() {
  return (
    <div className="dashboard-container">
        <AdminSideBar/>
        <main className="dashboard-content">
  <Outlet/>
        </main>
      
    </div>
  )
}
