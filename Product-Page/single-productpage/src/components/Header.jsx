import React from "react";

function Header(props) {
  return (
    <div className="header">
      <h2 className="logo">White Sneakers</h2>
      <nav className="nav-links">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">About Us</a>
        <a href="#" className="nav-link">Contact</a>
      </nav>
      <div className="cart-icon-container" onClick={props.onCartClick}>
        <span className="cart-icon">🛒</span>
        {props.itemCount > 0 && (
          <span className="badge">{props.itemCount}</span>
        )}
      </div>
    </div>
  );
}
export default Header;