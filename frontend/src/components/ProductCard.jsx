import useCart from "../hooks/useCart"

export default function ProductCard({product}) {
    const {addToCart}=useCart();
  return (
    <div classeName="product-Cart">
        <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
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

