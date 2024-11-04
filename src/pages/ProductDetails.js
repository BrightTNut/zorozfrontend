// ProductDetails.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import productDetails from "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://zoroz-pied.vercel.app/?vercelToolbarCode=EmveqQc0HCpwXlH/v1/product/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-card">
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">Price: ${product.price}</p>
      <p className="product-about">{product.about}</p>

      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />

      <Link to="/payment">
        <button className="buy-button">Buy</button>
      </Link>
    </div>
  );
};

export default ProductDetails;
