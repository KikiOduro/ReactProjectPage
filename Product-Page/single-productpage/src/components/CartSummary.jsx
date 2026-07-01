import React from "react";

function CartSummary(props) {
  return (
    <div className="cart-summary-container">
      <h2 className="cart-summary-title">Cart Summary</h2>
      <p>Items in cart: {props.itemCount}</p>
      <p>Total price: ${props.total}</p>
    </div>
  );
}

export default CartSummary;