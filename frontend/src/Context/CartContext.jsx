import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
export const CartContext = createContext();

export default function CartProvider({ children }) {
  
  const [cartItems, setCartItems] = useState([]);
  const {token}= useAuth();
  function addToCart(product) {
  if(!token){
    alert("please login first ");
    return;
  }
    setCartItems((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    }

  );
   
  }
   const cartCount = cartItems.reduce((total , item)=> total +item.quantity,0)
   const totalPrice= cartItems.reduce((total, item)=>total+item.price *item.quantity , 0)
  return (
    <CartContext.Provider value={{ cartItems, addToCart ,cartCount , totalPrice}}>
      {children}
    </CartContext.Provider>
  );
}
