import React from "react";

function CartModal(props) {
  if (props.isOpen === false) {
    return null;
  }

  const subtotal = props.cartItems.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Your Cart</h2>
          <span className="modal-close-button" onClick={props.onClose}>
            ✕
          </span>
        </div>

        <div className="modal-items-container">
          {props.cartItems.length === 0 && (
            <p className="modal-empty-text">Your cart is empty.</p>
          )}

          {props.cartItems.map(function (item) {
            return (
              <div key={item.id} className="modal-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="modal-item-image"
                />

                <div className="modal-item-details">
                  <p className="modal-item-name">{item.name}</p>
                  <p className="modal-item-size">Size: US {item.size}</p>

                  <div className="modal-quantity-controls">
                    <button
                      className="modal-quantity-button"
                      onClick={function () {
                        props.onDecreaseItem(item.id);
                      }}
                    >
                      -
                    </button>
                    <span className="modal-quantity-value">
                      {item.quantity}
                    </span>
                    <button
                      className="modal-quantity-button"
                      onClick={function () {
                        props.onIncreaseItem(item.id);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="modal-item-right">
                  <p className="modal-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <span
                    className="modal-remove-button"
                    onClick={function () {
                      props.onRemoveItem(item.id);
                    }}
                  >
                    🗑 Remove
                  </span>
                </div>
              </div>
            );
          })}
        </div>
//shows the summary
        {props.cartItems.length > 0 && (
          <div className="modal-summary">
            <div className="modal-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="modal-summary-row">
              <span>Shipping</span>
              <span className="modal-free-text">Free</span>
            </div>
            <div className="modal-total-row">
              <span>Total</span>
              <span className="modal-total-value">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button className="modal-checkout-button">
              Proceed to Checkout
            </button>
          </div>
        )}

        <p className="modal-continue-shopping" onClick={props.onClose}>
          Continue Shopping
        </p>
      </div>
    </div>
  );
}

export default CartModal;