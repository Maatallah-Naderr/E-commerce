
import './App.css'
import AuthProvider from './Context/AuthContext'
import CartProvider from './Context/CartContext'
import AppRoutes from './routes/AppRoutes'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
function App() {
 

  return (
    <>
    <AuthProvider>

      <CartProvider>
        <ToastContainer
        position="top-right"
        hideProgressBar={false}
        theme='colored'
    
        
        />
      <AppRoutes/>
     </CartProvider>
    </AuthProvider>
     
   
    
    </>
 
  )
  }
export default App
