import { Link } from "react-router";

function ProductCard({ product }) {
  return (
    <div className="product-card card">
      <div className="card-img-wrapper">
        <img src={product.imageUrl} className="card-img-top" alt={product.title} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">查看更多</Link>
      </div>
    </div>
  )
}

export default ProductCard;
