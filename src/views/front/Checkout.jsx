import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { formatCurrency } from "@utils/format";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Checkout() {
  const [cart, setCart] = useState({});
  const [isCartFirstLoading, setIsCartFirstLoading] = useState(true);

  const { carts = [] } = cart;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // 用 useCallback 包裹，避免 ESLint 檢查警告
  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      const cartData = response.data.data;
      setCart(cartData);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsCartFirstLoading(false);
    }
  }, []);
  
  useEffect(() => {
    // 建立一個內部的執行函式，明確告訴 React 這是副作用的啟動點
    // 這樣可以避免 React 在開發模式下警告「不要在渲染期間呼叫副作用」
    const init = async () => {
      await fetchCart();
    };
    init();
  }, [fetchCart]);

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
  
  async function handleDelete(cartId) {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${cartId}`);
      await fetchCart();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function handleDeleteAll() {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      await fetchCart();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function onSubmit(data) {
    const orderData = {
      user: data, 
      message: data.message
    };
    try {
      const response = await axios.post(`${API_BASE}/api/${API_PATH}/order`, { data: orderData });
      if (response.data.success) {
        alert(response.data.message);
        reset();
        await fetchCart();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
  
  return (
    <div className="container py-10">
      <h2>購物車列表</h2>
      {isCartFirstLoading ? (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : carts.length === 0 ? (
        <div className="text-center fs-4 mt-4">
          <p className="mb-6">購物車是空的</p>
          <Link to="/product" className="btn btn-primary btn-lg">去購物 GO</Link>
        </div>
      ) : (
        <>
          <div className="text-end mt-4">
            <button type="button" className="btn btn-outline-danger" onClick={handleDeleteAll}>
              清空購物車
            </button>
          </div>
          <table className="table mb-15">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">品名</th>
                <th scope="col">數量/單位</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item) => {
                // 一個 item 為一個購物車項目
                const { product, qty, final_total } = item;
                const { title: productTitle, unit } = product;

                return (
                  <tr key={item.id}>
                    <td>
                      <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item.id)}>
                        刪除
                      </button>
                    </td>
                    <th scope="row">{productTitle}</th>
                    <td>
                      <div className="input-group input-group-sm mb-3">
                        <input
                          type="number"
                          className="form-control"
                          min="1"
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
                    <td className="text-end">{formatCurrency(final_total)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-end" colSpan="3">
                  總計
                </td>
                <td className="text-end">{formatCurrency(cart.final_total)}</td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
      
      {/* 結帳頁面 */}
      {carts.length > 0 && (
        <div className="py-10 row justify-content-center">
          <h2 className="text-center mb-10">填寫收件人資訊</h2>
          <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="請輸入 Email"
                defaultValue="test@gamil.com"
                {...register("email", {
                  required: "請輸入 Email。",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "請輸入有效的 Email 格式。",
                  },
                })}
              />
              {errors.email && <div className="text-danger">{errors.email.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                收件人姓名
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                placeholder="請輸入姓名"
                defaultValue="小明"
                {...register("name", {
                  required: "請輸入收件人姓名。",
                  minLength: {
                    value: 2,
                    message: "收件人姓名至少需要 2 個字。",
                  },
                })}
              />
              {errors.name && <div className="text-danger">{errors.name.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">
                收件人電話
              </label>
              <input
                id="tel"
                name="tel"
                type="tel"
                className="form-control"
                placeholder="請輸入電話"
                defaultValue="0912345678"
                {...register("tel", { 
                  required: "請輸入電話。",
                  minLength: { value: 8, message: "電話至少 8 碼" },
                  pattern: {
                    value: /^\d+$/,
                    message: "電話僅能輸入數字",
                  },
                })}
              />
              {errors.tel && <div className="text-danger">{errors.tel.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                收件人地址
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="form-control"
                placeholder="請輸入地址"
                defaultValue="臺北市信義區信義路5段7號"
                {...register("address", { required: "請輸入地址。" })}
              />
              {errors.address && <div className="text-danger">{errors.address.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                留言
              </label>
              <textarea
                id="message"
                className="form-control"
                cols="30"
                rows="10"
                {...register("message")}
              ></textarea>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-danger">
                送出訂單
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Checkout;