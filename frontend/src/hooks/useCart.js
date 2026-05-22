import { useContext } from "react";
import { CartContext } from "../Context/CartContext";


export default function useCart(){
    const context = useContext(CartContext)
    if(!context){
        throw new Error("useCart must be used inside Provider")
    }
    return context
}











