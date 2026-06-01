
import { useEffect, useState } from "react"
import {getAllCategory} from "../api/categoryService" 
export default function CategoriesAdmin() {
const [categories ,setcategories]=useState([]);

useEffect(()=>{
async function fetechCategories(){
  try{
      const data = await getAllCategory();
  console.log(data)
  setcategories(data.data)
  }catch(error){
    console.log(error.response?.data.message)
  }

}

fetechCategories()


},[])
  return (
    <div className="admin-container-category">
        <h3>Categories </h3>
    <div >
    {
      categories.map((category)=>(
        <div key = {category._id} className="category-admin">
           <img src={`http://localhost:5000/${category.image}`}                      />             
          
          {category.name}

        </div>
      ))
    }
    </div>

        
      
    </div>
  )
}

