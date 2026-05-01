import { useContext } from "react";
import { CartContext } from "../Context/CartContext";


export default function UseCar(){
    const context = useContext(CartContext)
    if(!context){
        throw new Error("useAuth must be used inside Provider")
    }
    return context
}