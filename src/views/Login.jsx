import { useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE;

function Login({ onLoginSuccess, onLoginFailure }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await login();
    setIsLoading(false);
  }

  async function login() {
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = response.data;
      onLoginSuccess(token, expired);
    } catch (error) {
      console.error(error);
      onLoginFailure();
    }
  }

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="container py-10">
      <div className="">
        <div className="row justify-content-center">
          <div className="col-5">
            <h1 className="h3 text-center mb-6">請先登入</h1>
            <form id="form" className="form-signin mb-10" onSubmit={handleSubmit}>
              <div className="form-floating mb-6">
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="name@example.com"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
                <label htmlFor="username">Email address</label>
              </div>
              <div className="form-floating mb-6">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="password">Password</label>
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