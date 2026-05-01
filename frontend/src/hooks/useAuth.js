import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


export default function UseAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used inside Provider")
    }
    return context
}