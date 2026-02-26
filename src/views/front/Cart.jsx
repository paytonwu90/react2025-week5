import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Cart() {
  const [cart, setCart] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);
  
  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      const cartData = response.data.data;
      setCart(cartData.carts);
      setFinalTotal(cartData.final_total);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function handleUpdateQty(cartId, productId, qty = 1) {
    const data = {
      product_id: productId,
      qty,
    };
    
    try {
      await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cartId}`, { data });
      await fetchCart();
    } catch (error) {
      console.log(error.response.data);
    }
  }
  
  return (
    <div className="container py-10">
      <h2>購物車列表</h2>
      <div className="text-end mt-4">
        <button type="button" className="btn btn-outline-danger">
          清空購物車
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">品名</th>
            <th scope="col">數量/單位</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            // 一個 item 為一個購物車項目
            const { product, qty, final_total } = item;
            const { title: productTitle, unit } = product;

            return (
              <tr key={item.id}>
                <td>
                  <button type="button" className="btn btn-outline-danger btn-sm">
                    刪除
                  </button>
                </td>
                <th scope="row">{productTitle}</th>
                <td>
                  <div className="input-group input-group-sm mb-3">
                    <input
                      type="number"
                      className="form-control"
                      aria-label="商品數量"
                      aria-describedby={`product-unit-${product.id}`}
                      value={qty}
                      onChange={(e) => {
                        handleUpdateQty(item.id, product.id, Number(e.target.value));
                      }}
                    />
                    <span className="input-group-text" id={`product-unit-${product.id}`}>{unit}</span>
                  </div>
                </td>
                <td className="text-end">{final_total}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-end" colSpan="3">
              總計
            </td>
            <td className="text-end">{finalTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;