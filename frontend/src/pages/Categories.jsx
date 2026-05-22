import { useEffect, useState } from "react"
import { getAllCategory } from "../api/categoryService";
import { useNavigate } from "react-router-dom";
export default function Categories() {
const [categories , setCategories]= useState([]);
const navigate = useNavigate()
async function fetchCategories(){
    try{
  const response = await getAllCategory()
  console.log(response.data)
 
  setCategories(response.data)
    }catch(error){
        console.log(error.message)

    };
    
}
useEffect(()=>{
    fetchCategories()
},[])

  return (
    <div className="categories-container">
        <h2>Categories</h2>
        <div className="categories-card">
     {
        categories.map((categorie)=>
           <div className="categorie-info" onClick={()=>navigate(`/Categories/${categorie._id}`)}>
            <img src={`http://localhost:5000/${categorie.image}`} alt={categorie.name} />
        <h2 key={categorie._id}>{categorie.name}</h2>
        <h3>{categorie.description}</h3>

        </div>
        )

     }
     </div>
      
    </div>
  )
}
