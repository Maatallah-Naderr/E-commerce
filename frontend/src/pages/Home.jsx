import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../index.css";

export default function Home() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  useEffect(function () {
    async function fetechCategory() {
      try {
        const res = await API.get("category/all");
        setCategory(res.data.data);

        console.log(res.data);
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
      <div className="category-container">
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

        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={`http://localhost:5000/${product.image}`}
              alt={product.name}
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.price} DT</p>
            </div>
            <div className="btn-add">Add To Cart</div>
          </div>
        ))}
      </div>
    </>
  );
}
