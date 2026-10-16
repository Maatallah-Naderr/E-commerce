import { useEffect, useState } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
 deleteProduct
} from "../api/serviceProduct";
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
    setCategory("");
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.log("error", error);
      setMessage(
        error.response?.data?.message || "error when loading product ",
      );
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      console.log("setCategories", res.data);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data?.message || "error when loading category ",
      );
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      if (image) formData.append("image", image);
      formData.append("category", category);
      console.log("form data pret");
      const response = productEdit
        ? await updateProduct(productEdit._id, formData)
        : await createProduct(formData);

      console.log("response is ", response);
      await fetchProducts();
      handleReset();
      setProductEdit(null);
      setMessage(
        productEdit
          ? "product updated with succes "
          : "product added with success",
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log("error  ", error);
      setMessage(error.response?.data?.message || "error when added product ");
    }finally{
      setLoading(false)
    }
  }
  const handleEdit = (product) => {
    setProductEdit(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setCategory(product.category?._id);
    setImage(null);
  };
 const handleDelete = async(id)=>{
  try{
    await deleteProduct(id);
    fetchProducts();
    setMessage("product deleted with success");
setTimeout(() => {
  setMessage("");
},3000);

  }catch(error){
    console.log("error", error);
    setMessage(error.response?.data?.message || "error when deleted product")
  }
 }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="name of product"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          required
          placeholder="description of product "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Price of product"
          required
          type="number"
          min={1}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="stock of product"
          min={0}
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="file"
          placeholder="choose a image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">choose Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          { loading? "please wait...": productEdit ? "Update product" : "AddProduct "}
        </button>
      </form>
      <section>
        <h2>Products</h2>
        <div className="product-container">
          {loading && <p className="message">please wait operation progress....</p>}
          {message && <p className="message">{message}</p>}
          {products.map((product) => (
            <ProductList
              product={product}
              key={product._id}
              handleEdit={handleEdit}
              productEdit={productEdit}
              handleReset={handleReset}
              setProductEdit={setProductEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductList({
  product,
  handleEdit,
  productEdit,
  handleReset,
  setProductEdit,onDelete
}) {
  return (
    <div className="product-item">
      <img
        src={
          product.image
            ? `http://localhost:5000/${String(product.image.replaceAll("\\", "/"))}`
            : "/default-image.png"
        }
        alt={product.name}
        width="100"
      />
      <p>Name : {product.name}</p>
      <p>description : {product.description}</p>
      <p>Price : {product.price}</p>
      <p>Stock : {product.stock}</p>
      <p>Category : {product.category?.name} </p>
      <div className="product-action">
        {" "}
        <button onClick={() => handleEdit(product)}>Update</button>
      </div>
      {productEdit && (
        <button
          className="btn-cancel"
          onClick={() => {
            handleReset();
            setProductEdit(null);
          }}
        >
          Cancel{" "}
        </button>
      )}
      <button className="btn-cancel" 
      onClick={()=>{
        console.log("delete Ok")
        if(confirm("are you sure to delete this product ?")){
          onDelete(product._id);
        }
      }}
      
      >Delete</button>
    </div>
  );
}
