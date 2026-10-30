
import { useState ,useEffect} from "react"
import {getAllOrders} from "../api/orderService"


export default  function OrderAdmin(){
  const [orders ,setOrders]=useState([]); 
  const [loading , setLoading]=useState(false);
  const [message , setMessage]=useState("");
  const fetchOrders = async()=>{
    try{
        setLoading(true);
        setMessage("")
        const response = await getAllOrders();
        console.log("response is ", response ) ;
        setOrders(response);
        
    }catch(error){
        console.log("error",error)
        
  setMessage(error.response?.data?.message || "error when loading orders")
    }finally{
        setLoading(false)
    }
    
  }
  useEffect(()=>{
    
     fetchOrders();
   
  },[])
  
    return(
       <main>
        <h1> All Orders</h1>
        {loading && <p> please wait is loading ...</p> }
        {message && <p> {message} </p>}
        <h3>Total  orders is :{orders.length}</h3>
        {
            orders.map((order)=>(
                <div key={order._id} >
             <p>order :{order._id}</p>
             <p>Client : {order.user?.name }</p>
             <p>Email : {order.user?.email}</p>
             {
                order.items?.map((item)=>(
                    <div key={item._id}> 
                    <p>Product : {item.product?.name ||"product unavaible"}</p>
                    <p>Price :{item.price} </p>
                    <p>Quantity :{item.quantity} </p>
                    </div>
                ))
             }
             <p>Total: {order.totalPrice} DT</p>
             <p>Status : {order.status}</p>
             <hr/>
                </div>
                
            ))
        }

       </main>
    )
}




