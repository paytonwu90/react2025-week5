import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('fetchProduct error:', error);
      }
    }
    fetchProduct();
  }, [id]);

  async function handleAddToCart(id, num = 1) {
    const data = {
      product_id: id,
      qty: num,
    };
    try {
      const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, { data });
    } catch (error) {
      console.log(error.response.data);
    }
  }
  
  return (
    <div className="container py-10">
      <div className="d-flex justify-content-center">
        {product && (
          <div className="card" style={{ width: "24rem" }}>
            <img
              src={product.imageUrl}
              className="card-img-top"
              alt={product.title}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">
                {product.description}
              </p>
              <p className="card-text">
                <strong>分類:</strong> {product.category}
              </p>
              <p className="card-text">
                <strong>單位:</strong> {product.unit}
              </p>
              <p className="card-text">
                <strong>原價:</strong> {product.origin_price} 元
              </p>
              <p className="card-text">
                <strong>現價:</strong> {product.price} 元
              </p>
              <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>加入購物車</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleProduct;