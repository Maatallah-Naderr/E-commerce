
import {Link} from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
export default function Navbar() {
const {cartCount}= useContext(CartContext)
  return (
<nav className="navbar">
    <h2>My Shop</h2>
    <ul className="nav-links">
        <li>   
            <Link to="/">Home</Link>
        </li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>

<div className="nav-right">
    <Link to="/cart" className="cart-icon" >
    🛒 <span className="badge"> {cartCount}</span>

    </Link>

</div>


</nav>
  )
}
