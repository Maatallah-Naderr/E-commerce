import { useEffect, useState } from "react";
import {
  getAllCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../api/categoryService";
export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(null);
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

  async function handleSumbit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!name.trim() || !description.trim() ) {
      setMessage("all fields are required");
      setLoading(false);
      return;
    }
if(!categoryEdit && !image){
  setMessage("image is required ");
  setLoading(false);
  return ;
}
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    
    formData.append("isActive", isActive);
    if(image){
      formData.append("image", image);
    }
    try {
     
      if (categoryEdit) {
        const res = await updateCategory(categoryEdit._id, formData);
        setTimeout(()=>{
          setMessage("category updated with success")
        },2000)
        setCategories((prev) =>
          prev.map((category) =>
            category._id === res.data._id ? res.data : category,
          ),
        );
        setCategoryEdit(null);
        setName("");
        setDescription("");
        setImage(null)
        setIsActive(true)
      } else {
        const res = await addCategory(formData);
        setCategories((prev) => [...prev, res.data]);
        console.log(res.data);
        setMessage("category added with success");
        setName("");
        setDescription("");
        setImage(null);
        setIsActive(true)
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "somthing went wrong");
      console.log(error.response.data)
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("are you sure to delete category!!");
    if (!confirmDelete) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((p) => p._id !== id));
      setMessage("category delete with success");
    } catch (error) {
      setMessage(error.response?.data?.message || "error to delete message");
    }
  };
  const handleEdit = (category) => {
    setCategoryEdit(category);
    setName(category.name ?? "");
    setDescription(category.description ?? "");
    setIsActive(category.isActive ?? true);
    setImage(null);
  };
  const handleReset = ()=>{
    setName("");
    setDescription("");
    setImage(null);
    setIsActive(true)
  }

  return (
    <>
      <h3>Categories </h3>
      {message && <p>{message} </p>}
      <form className="form-category" onSubmit={handleSumbit}>
        <input
          type="text"
          required
          placeholder="name of category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>
        <div className="btn-action-category">
        <button type="submit" disabled={loading}>
          {loading ? "Sending in progress" : categoryEdit? "Update Category" : "Add Category"}
        </button>
        <button className="btn-cancel"  onClick={handleReset}   >Cancel</button>
        </div>
      </form>

      <div className="admin-container-category">
        {categories.map((category) => (
          <Card
            categories={categories}
            category={category}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={category._id}
          />
        ))}
      </div>
    </>
  );
}

function Card({ category, handleDelete, handleEdit }) {
  return (
    <>
      <div className="card-container">
        <img
          src={`http://localhost:5000/${category.image}`}
          alt={category.name}
        />

        <div className="info-cat-admin">
          <h3> {category.name}</h3>

          <p>{category.description?.slice(0, 20)}</p>
        </div>
        <div className="btn">
          <button onClick={() => handleDelete(category._id)}>Delete</button>
          <button onClick={() => handleEdit(category)}>Update</button>
        </div>
      </div>
    </>
  );
}
