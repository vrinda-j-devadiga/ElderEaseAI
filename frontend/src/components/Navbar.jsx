import { Link, useLocation } from "react-router-dom";
import { FaHeartbeat, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="landing-navbar">

      <div className="landing-logo">
        <FaHeartbeat className="logo-icon" />
        <span>ElderEase AI</span>
      </div>

     <ul className={`landing-links ${menuOpen ? "active" : ""}`}>

  <li>
    {isHome ? (
      <a href="#features" onClick={() => setMenuOpen(false)}>
        Features
      </a>
    ) : (
      <Link to="/#features">Features</Link>
    )}
  </li>

  <li>
    {isHome ? (
      <a href="#how" onClick={() => setMenuOpen(false)}>
        How it Works
      </a>
    ) : (
      <Link to="/#how">How it Works</Link>
    )}
  </li>

  <li>
    {isHome ? (
      <a href="#AI" onClick={() => setMenuOpen(false)}>
        AI Assistant
      </a>
    ) : (
      <Link to="/#AI">AI Assistant</Link>
    )}
  </li>

  <li>
    {isHome ? (
      <a href="#contact" onClick={() => setMenuOpen(false)}>
        Contact
      </a>
    ) : (
      <Link to="/#contact">Contact</Link>
    )}
  </li>

  <li className="mobile-btn">
    <Link to="/login" onClick={() => setMenuOpen(false)}>
      <button className="login-btn">Login</button>
    </Link>
  </li>

  <li className="mobile-btn">
<Link to="/register" onClick={() => setMenuOpen(false)}>
      <button className="signup-btn">Get Started</button>
    </Link>
  </li>

</ul>

      
      <div
  className="menu-icon"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <FaTimes /> : <FaBars />}
</div>

      <div className="nav-buttons">

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link to="/register">
          <button className="signup-btn">Get Started</button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;