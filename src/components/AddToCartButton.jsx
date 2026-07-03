import React from "react";

function AddToCartButton(props) {
  return (
    <div className="add-to-cart-container">
      <button onClick={props.onAddToCart} className="add-to-cart-button">
        Add to Cart
      </button>
      {props.showConfirmation === true && (
        <p className="confirmation-text">Item added to cart!</p>
      )}
    </div>
  );
}

export default AddToCartButton;

