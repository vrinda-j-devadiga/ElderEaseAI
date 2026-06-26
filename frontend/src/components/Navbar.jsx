import { Link } from "react-router-dom";
import logo from "../assets/nav-logo.png";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav>
     <div className="nav-logo">
  <img
    src={logo}
    alt="ElderEase AI"
  />
</div>

      <ul>
        <li><Link to="/">Home</Link></li>

        <li><Link to="/login">Login</Link></li>

        <li><Link to="/register">Register</Link></li>

        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;