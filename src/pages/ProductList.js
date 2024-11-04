import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use this for redirection
import "../styles/productlist.css"; // Assuming styles are in productlist.css

const ProductList = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    about: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Initialize navigation hook

  // Handle text inputs
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.log("Please insert a photo of the product!");
      return;
    }

    setLoading(true); // Set loading to true on submit
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("about", product.about);
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://zorozbackend.onrender.com/v1/imageUpload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Response from server:", data);

      if (data) {
        setLoading(false); // Stop loading on success
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={product.name}
          onChange={handleInputs}
          placeholder="Name of Product"
          name="name"
          id="name"
          type="text"
        />
        <input
          type="file"
          name="file"
          id="file"
          placeholder="Upload Photo"
          onChange={handleFileChange}
        />
        <input
          value={product.price}
          onChange={handleInputs}
          type="number"
          name="price"
          id="price"
          placeholder="Price"
        />
        <input
          value={product.about}
          onChange={handleInputs}
          type="text"
          name="about"
          id="about"
          placeholder="About Product"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductList;
