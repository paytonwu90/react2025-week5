import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@components/ProductCard";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('fetchProducts error:', error);
      }
    }
    fetchProducts();
  }, []);
  
  return (
    <div className="container py-10">
      <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-8 ps-0 mb-6 mb-lg-12">
        {products.map((product) => (
          <li className="col list-unstyled" key={product.id ?? product.name}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;