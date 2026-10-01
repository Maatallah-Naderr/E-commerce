import { useState, useEffect } from "react";
import AdminSideBar from "../components/admin/AdminSideBar";
import { getAllProducts, createProduct } from "../api/serviceProduct";
import { getAllCategory } from "../api/categoryService";
export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [productEdit, setProductEdit] = useState(null);

  const handleReset = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setImage(null);
    setMessage("");
  };
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log("res is ", res);
      setProducts(res.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "error when loading products",
      );
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      console.log("response is :", response);
      setCategories(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("")
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("image", image);
      formData.append("category", category);
      // for (const [key , value] of formData.entries()  ){
      //   console.log(key ,value)
      // }
      const response = await createProduct(formData);
      console.log("response product", response.data);
      setMessage("product created with success");
      handleReset();
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "error creating product");
      await fetchProducts();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="dashboard-content">
        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Enter Name of product"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="description product "
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="price of product"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              console.log("image selectionné ", e.target.files[0]);
              setImage(e.target.files[0]);
            }}
          />
          <select
            value={category}
            onChange={(e) => {
              //  console.log("ID sélectionné :", e.target.value);
              setCategory(e.target.value);
            }}
          >
            <option value=""> select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button type="submit">Add Product</button>
        </form>
           <h2>Products</h2>
        <div className="list-product">
          {loading&& <p>please wait a moment ...</p>}
          {message&& <p>{message}</p>}
       
          {products.map((product) => (
            <div key={product._id} className="product-item">
                     <img
                src={product.image
      ? `http://localhost:5000/${product.image.replaceAll("\\", "/")}`
      : "/default-product.png"}
                alt={product.name}
                width="100"
              />
              <h3>Name :{product.name} </h3>
       
              <p>Description:{product.description}</p>
              <p>Price :{product.price}</p>
              <p> Stock:{product.stock}</p>
              <p>Category:{product.category?.name}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
