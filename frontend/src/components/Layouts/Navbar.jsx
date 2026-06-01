import { NavLink } from "react-router-dom";

import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
export default function Navbar() {
  const { totalCount } = useContext(CartContext);
  const { isAuthenticated, logout,user } = useContext(AuthContext);
  console.log(user)
  console.log(isAuthenticated)
  return (
    <nav className="navbar">
      <h2>My Shop</h2>
      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/categories">Categories</NavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <button className="btn-logout" onClick={logout}>
              {" "}
              <NavLink to="/login">Logout</NavLink>
            </button>
            {user?.role ==="admin"&& <NavLink to= "/dashboard"> Dashboard</NavLink>}
          </li>
        ) : (
          <li>
            <NavLink to="/register">Sign up</NavLink>
          </li>
        )}
      </ul>

      <div className="nav-right">
        {isAuthenticated && (
          <NavLink to="/cart" className="cart-icon">
            🛒 <span className="badge"> {totalCount}</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
