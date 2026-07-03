import React from "react";

function QuantitySelector(props) {
  return (
    <div className="quantity-container">
      <p className="quantity-label">Quantity</p>
      <div className="quantity-controls">
        <button onClick={props.onDecrease} className="quantity-button">-</button>
        <span className="quantity-value">{props.quantity}</span>
        <button onClick={props.onIncrease} className="quantity-button"> +</button>
      </div>
    </div>
  );
}

export default QuantitySelector;