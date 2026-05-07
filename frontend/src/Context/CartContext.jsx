import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {getCart, addToCartAPI,decriseAPI, incriseAPI} from"../api/cartService"
export const CartContext = createContext();

export default function CartProvider({ children }) {
  
  const [cart, setCart] = useState(null);
  const[cartItems ,setCartItems]=useState([])
  const {token}= useAuth();
  async function fetchCart(){
    try{
      const data = await getCart();
      console.log(data)
    setCart(data.cart);
    }catch(error){
      console.log("error to fetching cart", error.message)

    }
    
  }
  useEffect(()=>{
    if(token)
    fetchCart();
  },[token])






  async function addToCart(productId ) {
  if(!token){
    alert("please login first ");
    return;
  }
  try{
    await addToCartAPI(productId);
    fetchCart();


  }catch(error){
    console.log(error.message)

  }
  
   }

   const totalCount = cart?.items?.reduce((total,item)=>{
    return total+item.quantity},0)||0 ;
   
   const totalPrice = cart?.totalPrice;
   async function decrise(id){
    await decriseAPI(id);
    fetchCart()
   }
    async function incrise(id){
    await incriseAPI(id)
    fetchCart()
   }
  

   const value={addToCart , fetchCart, incrise, decrise,cartItems:cart?.items||[], totalCount,totalPrice}
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
