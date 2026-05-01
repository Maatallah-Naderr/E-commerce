
import './App.css'
import AuthProvider from './Context/AuthContext'
import CartProvider from './Context/CartContext'
import AppRoutes from './routes/AppRoutes'


function App() {
 

  return (
    <>
    <AuthProvider>
      <CartProvider>
      <AppRoutes/>
     </CartProvider>
    </AuthProvider>
     
   
    
    </>
 
  )
  }
export default App
