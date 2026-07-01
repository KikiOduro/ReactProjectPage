import React from "react";
import { FiShoppingCart } from "react-icons/fi";

function Header(props) {
  return (
    <div className="header">
      <h2 className="logo">White Sneakers</h2>
      <nav className="nav-links">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Products</a>
        <a href="#" className="nav-link">Contact</a>
        <a href="#" className="nav-link">Shop</a>
        <a href="#" className="nav-link">Cart</a>
        <a href="#" className="nav-link">Catalogue</a>
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





