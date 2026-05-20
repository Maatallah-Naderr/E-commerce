import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  getCart,
  addToCartAPI,
  decriseAPI,
  incriseAPI,
  removeAPI
} from "../api/cartService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  async function fetchCart() {
    try {
      const data = await getCart();
      console.log(data);
      setCart(data.cart);
    } catch (error) {
      console.log("error to fetching cart", error.message);
    }
  }
  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  async function addToCart(productId) {
    if (!token) {
      toast.error("please login first ");
      setTimeout(() => {
        navigate("/login");
      },1500);

      return;
    }
    try {
      await addToCartAPI(productId);
      fetchCart();
      toast.success("product added with success to cart")
    } catch (error) {
      console.log(error.message);
      toast.error("something went wrong ")
    }
  }

  const totalCount =
    cart?.items?.reduce((total, item) => {
      return total + item.quantity;
    }, 0) || 0;

  const totalPrice = cart?.totalPrice;
  async function decrise(id) {
    await decriseAPI(id);
    fetchCart();
  }
  async function incrise(id) {
    await incriseAPI(id);
    fetchCart();
  }
async function handleRemove(id) {
  await removeAPI(id)
  fetchCart();
}
  const value = {
    addToCart,
    fetchCart,
    incrise,
    decrise,
    cartItems: cart?.items || [],
    totalCount,
    totalPrice,
    handleRemove
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
