import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { addToCartAPI } from "../api/cartService";
export default function CartProduct({ product }) {
  const { cartCount, addToCart} = useContext(CartContext);
   function handleAdd() {
   addToCart(product)
  }
  return (
    <div className="product-card" key={product._id}>
      <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price} DT</p>
      </div>
      <button className="btn-add" onClick={handleAdd}>
        Add To Cart
      </button>
    </div>
  );
}
