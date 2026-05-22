import useCart from "../hooks/useCart"

export default function CartProduct({ product }) {
  const { addToCart} = useCart()
   function handleAdd() {
   addToCart(product._id)
  }
  return (
    <div  key={product._id}>
    
      <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
      <div className="info-product" >
        <h4> name :{product.name}</h4>
        <p>price :{product.price} DT</p>
        <p> Stock : {product.stock} </p>
        
      </div>
      <button className="btn-add" onClick={handleAdd}>
        Add To Cart
      </button>
    </div>
    
     
  );
 
}
