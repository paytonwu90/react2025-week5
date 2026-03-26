import { Outlet, NavLink } from "react-router";

function AdminLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* <NavLink className="navbar-brand" to="/">回到前台首頁</NavLink> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/product">後台產品</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/order">後台訂單</NavLink>
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

export default AdminLayout;