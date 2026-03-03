import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onChange",
  });

  async function onSubmit(data) {
    setIsLoading(true);
    await login(data);
    setIsLoading(false);
  }

  async function login(data) {
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, data);
      const { token, expired } = response.data;
      alert('登入成功！');
      reset();
      navigate('/product');
    } catch (error) {
      console.error(error);
      alert('登入失敗！');
    }
  }

  return (
    <div className="container py-10">
      <div className="">
        <div className="row justify-content-center">
          <div className="col-5">
            <h1 className="h3 text-center mb-6">請先登入</h1>
            <form id="form" className="form-signin mb-10" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-6">
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="name@example.com"
                  {...register("username", {
                    required: "請輸入 Email。",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "請輸入有效的 Email 格式。",
                    },
                  })}
                  autoFocus
                />
                <label htmlFor="username">Email address</label>
                {errors.username && <p className="text-danger">{errors.username.message}</p>}
              </div>
              <div className="form-floating mb-6">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "請輸入密碼。",
                    minLength: {
                      value: 6,
                      message: "密碼長度至少為 6 個字元。",
                    },
                  })}
                />
                <label htmlFor="password">Password</label>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
              </div>
              <button
                className="btn btn-lg btn-primary w-100"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? '登入中...' : '登入'}
              </button>
            </form>
            <p className="text-center text-muted mb-3">&copy; 2024~∞ - 六角學院</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;