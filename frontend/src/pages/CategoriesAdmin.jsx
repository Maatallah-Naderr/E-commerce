import { useEffect, useState } from "react";
import { getAllCategory } from "../api/categoryService";
export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const[name , setName]=useState("");
  const[description , setDescription]= useState("")
  const [image , setImage ]= useState("")
  const [isActive, setIsActive]= useState(true)

  useEffect(() => {
    async function fetechCategories() {
      try {
        const data = await getAllCategory();
        console.log(data);
        setCategories(data.data);
      } catch (error) {
        console.log(error.response?.data.message);
      }
    }

    fetechCategories();
  }, []);

useEffect(()=>{



},[])














  return (
<>
<div className="form-category" >
<input type="text" required="true" placeholder="name of category" value={name} oncahnge={(e)=>setName(e.target.value)} />
<textarea placeholder="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
<input type="file"  value={image}   onChange={(e)=>setImage(e.target.files[0])} />
<label>
  <input
  type="checkbox"
  value={isActive}
  onChange={(e)=>setIsActive(e.target.checked)}
  />
  Active
</label>
<button>Add category</button>

</div>


    <h3>Categories </h3>
    <div className="admin-container-category">
      
      
        {categories.map((category) => (
          <Card
            categories={categories}
            category={category}
            key={category._id}
          />
        ))}
     
    </div>
    </>
  );
}

function Card({ category }) {
  return (
    <>
    <div className="card-container">
      
       
          <img src={`http://localhost:5000/${category.image}`} alt={category.name}   />
       
        <div className="info-cat-admin">
          <h3> {category.name}</h3>
         
          <p>
            {category.description?.slice(0 , 20)}
          </p>
         
        </div>
        <div className="btn">
            <button >Delete</button>
      <button >Update</button>
        </div>
    
    </div>
    
    </>
  );
}
