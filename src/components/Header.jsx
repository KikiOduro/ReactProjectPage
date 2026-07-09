import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

function Header(props) {
  return (
    <div className="header">
      <nav className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/#new-arrivals-section" className="nav-link">
          Products
        </Link>
        <Link to="/#contact-section" className="nav-link">
          Contact
        </Link>
        <Link to="/cart" className="nav-link">
          Cart
        </Link>
      </nav>
      <Link to="/cart" className="cart-icon-container">
        <FiShoppingCart className="cart-icon" size={24} />
        {props.itemCount > 0 && (
          <span className="badge">{props.itemCount}</span>
        )}
      </Link>
    </div>
  );
}

export default Header;





