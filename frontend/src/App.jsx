
import './App.css'
import CartProvider from './Context/CartContext'
import AppRoutes from './routes/AppRoutes'


function App() {
 

  return (
    <>
     <CartProvider>
      <AppRoutes/>
     </CartProvider>
   
    
    </>
 
  )
  }
export default App
