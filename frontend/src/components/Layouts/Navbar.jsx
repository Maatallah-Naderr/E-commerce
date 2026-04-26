
import {Link} from "react-router-dom"
export default function Navbar() {
  return (
<nav className="navbar">
    <h2>My Shop</h2>
    <ul className="nav-links">
        <li>   
            <Link to="/">Home</Link>
        </li>
        <li><Link to="/categories">Categories</Link></li>
    </ul>

<div className="nav-right">
    <Link to="/cart" className="cart-icon" >
    🛒 <span className="badge"> 0</span>

    </Link>

</div>


</nav>
  )
}
