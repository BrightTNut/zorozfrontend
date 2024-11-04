import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import home from "../styles/home.css";
const Home = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/v1/allProducts");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Link to={"/newProduct"}>
        <button>Upload Product</button>
      </Link>
      <h1>Product List</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <Link to={`/product/${product._id}`}>
                <h2>{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>About: {product.about}</p>

                <img
                  src={`${product.imageUrl}`}
                  alt={product.name}
                  style={{ width: "100px" }}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Home;
