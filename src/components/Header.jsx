import React from "react";
import { FiShoppingCart } from "react-icons/fi";

function Header(props) {
  return (
    <div className="header">
      <nav className="nav-links">
        <button type="button" className="nav-link" onClick={props.onHomeClick}>
          Home
        </button>
        <button
          type="button"
          className="nav-link"
          onClick={props.onProductsClick}
        >
          Products
        </button>
        <button type="button" className="nav-link" onClick={props.onContactClick}>
          Contact
        </button>
        <button type="button" className="nav-link" onClick={props.onCartClick}>
          Cart
        </button>
      </nav>
      <div className="cart-icon-container" onClick={props.onCartClick}>
        <FiShoppingCart className="cart-icon" size={24} />
        {props.itemCount > 0 && (
          <span className="badge">{props.itemCount}</span>
        )}
      </div>
    </div>
  );
}
export default Header;





