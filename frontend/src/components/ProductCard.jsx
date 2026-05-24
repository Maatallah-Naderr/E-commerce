import useCart from "../hooks/useCart";
import {useNavigate} from "react-router-dom";
export default function ProductCard({product ,onClick}) {
    const {addToCart}=useCart();
    const navigate = useNavigate()
  return (
    <div classeName="product-Cart" >
        <img src={`http://localhost:5000/${product.image}`} alt={product.name}  />
        <div className="product-info"  >
            <h3>name : {product.name}</h3>
            <p>
              price : {product.price} DT

            </p>
            <p>Stock : {product.Stock}</p>
            
             </div>
      <button  className="btn-add" onClick={()=>addToCart(product._id)}   >add To Cart</button>
      
    </div>
  )
}

