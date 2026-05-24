
import serviceProduct from "../api/serviceProduct"
import {useParams} from "react-router-dom"
import{useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct]=useState(null);
  const [loading , setLoading]=useState(false);
  const [error ,setError]=useState("");
  const navigate = useNavigate();
const {id}= useParams();
  async function  getProductInformation(productId){
    try{
        setLoading(true)
        setError("");
        const data = await serviceProduct(productId);
        console.log(data);
        setProduct(data.data)

    }catch(error){
     setError(error || error.response?.data?.message)
    }finally{
        setLoading(false)
    }
  }
  useEffect(() => {
  getProductInformation(id)
  }, [id])

  return (
    <div className="product-details-container" >
        
            
                {error && <p> {error}  </p>}
                {loading&& <p>loading please wait </p>}
             {product&&
<div className="details-card"  >
<div className="details-content">
     <img src={`http://localhost:5000/${product.image}`}  alt={product.image}  />
     <div className="info-details">
        <h3>name: {product.name}</h3>
        <p> description:{product.description}</p>
        <p>price :{product.price} DT</p>
        <p>stock:{product.stock} </p>
        </div>
      </div> 
       <button>Add To Cart</button>
            </div>
              
           
            }
       
      
    </div>
  )
}

