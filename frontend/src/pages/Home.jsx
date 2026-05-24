import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../index.css";
import CartProduct from "../components/CartProduct";
export default function Home() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectOption , setSelectOption]= useState("")
  const filtredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedProducts = [...filtredProducts]
  if(selectOption === "heigh to low"){
    sortedProducts.sort((a,b)=>b.price - a.price)
  }
  if(selectOption === "low to heigh"){
    sortedProducts.sort((a,b)=>a.price - b.price)
  }
  if(selectOption ==="a to z"){
    sortedProducts.sort((a,b)=>a.name.localeCompare(b.name))
  }
  useEffect(function () {
    async function fetechCategory() {
      try {
        const res = await API.get("category/all");
        setCategory(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetechCategory();
  }, []);
  async function handleClick(id) {
    const res = await API.get(
      `http://localhost:5000/api/product/byCategory/${id}`,
    );
    setProducts(res.data.data);
    setSelectCategoryId(id);
  }

  return (
    <>
      <h2>categories</h2>
 <div className="top-bar">

       <div className="search-container">
        <input
          type="text"
          placeholder="Search product ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select className="select-option" value={selectOption} onChange={(e)=>setSelectOption((e.target.value))}>
  <option value =" sort by"> Sort by</option>
      <option value="heigh to low"> high to low</option>
      <option value="low to heigh">low  to high</option>
  <option value="a to z"> name A - Z</option>
      </select>
 </div>

      <div className="category-container" >
        {category.map((cat) => (
          <div
            className="category-card"
            key={cat._id}
            onClick={() => handleClick(cat._id)}
          >
            <img src={`http://localhost:5000/${cat.image}`} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
      <hr />
      <div className="product-container">
        {!selectCategoryId && <p>Select a category to show all product</p>}
        {selectCategoryId && products.length === 0 && (
          <p>No products in this category </p>
        )}

        {sortedProducts.map((product) => (
          <CartProduct
            product={product}
            key={product._id}
           
          />
        ))}
      </div>
    </>
  );
}
