
import useCart from "../hooks/useCart"
export default function Cart() {
  const {cartItems , totalCount , totalPrice ,incrise , decrise, handleRemove}=useCart()

console.log(totalPrice)

  return (
   <>
    <div className="cart-container">
      
      <div className="cart-info">
        <h2> cart :{totalCount}</h2>
        {
          cartItems.length === 0?(<p>Your cart is empty</p>):(
            cartItems.map(item=>(
             <div className="cart-item" key={item._id}>
              <h3>{item.product.name}</h3>
              <p>quantity:{item.quantity}</p>
              <p>price: {item.product.price}</p>
              <div className="cart-action">
                <button onClick={()=>decrise(item.product._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={()=>incrise(item.product._id)}>+</button>
                <span className="btn-remove" onClick={()=>handleRemove(item._id)}>🗑️</span>

              </div>
              
             </div>
            
             

            ))
          )

        }

      </div>
<h2 className="price">Total : {totalPrice}</h2>
    </div>
    
    </>
  )
}

