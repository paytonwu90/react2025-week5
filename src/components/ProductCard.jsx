import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";

function ProductCard({ product }) {
  return (
    <div className="product-card card">
      <div className="card-img-wrapper">
        <img src={product.imageUrl} className="card-img-top" alt={product.title} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/product/${product.id}`} className="btn btn-primary">查看更多</Link>
          <button className="btn">
            <ShoppingCart />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
