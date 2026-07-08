import React from "react";
import Header from "./Header";

function CartPage(props) {
  const subtotal = props.cartItems.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <Header
        itemCount={props.itemCount}
        onHomeClick={props.onHomeClick}
        onProductsClick={props.onProductsClick}
        onContactClick={props.onContactClick}
        onCartClick={props.onCartClick}
      />

      <div className="cart-page-container">
        <h1 className="cart-page-title">Your Cart</h1>
        <p className="cart-page-subtitle">
          Review the items you added before checking out.
        </p>

        {props.cartItems.length === 0 ? (
          <div className="cart-page-empty">
            <p>Your cart is empty.</p>
            <button type="button" className="cart-page-button" onClick={props.onProductsClick}>
              Browse products
            </button>
          </div>
        ) : (
          <div className="cart-page-grid">
            <div className="cart-page-items">
              {props.cartItems.map(function (item) {
                return (
                  <div key={item.key} className="modal-item cart-page-item">
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
                          type="button"
                          className="modal-quantity-button"
                          onClick={function () {
                            props.onDecreaseItem(item.key);
                          }}
                        >
                          -
                        </button>
                        <span className="modal-quantity-value">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="modal-quantity-button"
                          onClick={function () {
                            props.onIncreaseItem(item.key);
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
                          props.onRemoveItem(item.key);
                        }}
                      >
                        🗑 Remove
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-page-summary modal-summary">
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
                <span className="modal-total-value">${subtotal.toFixed(2)}</span>
              </div>

              <button type="button" className="modal-checkout-button">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;