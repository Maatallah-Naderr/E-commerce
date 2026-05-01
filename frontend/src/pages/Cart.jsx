
import useCart from "../hooks/useCart"
export default function Cart() {
  const {cartItems , cartCount , totalPrice}=useCart()

console.log(totalPrice)
  return (
   <>
    <div className="cart-container">
      
      <div className="cart-info">
        <h2> cart :{cartCount}</h2>
        {
          cartItems.length === 0?(<p>Your cart is empty</p>):(
            cartItems.map(item=>(
             <div className="cart-item" key={item._id}>
              <h3>{item.name}</h3>
              <p>quantity:{item.quantity}</p>
              <p>price: {item.price}</p>
              <div className="cart-action">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
                <span className="btn-remove">🗑️</span>

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

