import { productByCategory } from "../api/categoryProduct";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCart from "../components/CartProduct"
export default function CategoriesProduct() {
  const [products, setProducts] = useState([]);
  const [loading , setLoading]= useState(false);
  const [error, setError]= useState("")
  const { id } = useParams();
  async function getProductByCategory(categoryId){
    try{
        setLoading(true);
        setError("")
        const data = await productByCategory(categoryId);
        console.log(data)
        setProducts(data.data)
     setError(error.message)
    }catch(error){
   console.log(error.response?.data?.message)
    }finally{
        setLoading(false)
    }
  }
useEffect(()=>{
    getProductByCategory(id)
},[id])
  return (
    <div className="product-container">
        {loading && <p> Loading please wait ... </p>}
        {error && <p>{error}</p>}
      {products.map(product=>(
        <div className ="grid-product">
       <ProductCart key={product._id} product={product}/>
      </div>
      ))
     }
    </div>
  );
}
