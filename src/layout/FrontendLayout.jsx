import { Outlet, NavLink } from "react-router";

function FrontendLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">首頁</NavLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/product">產品</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">購物車</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/checkout">結帳</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">後台登入</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default FrontendLayout;