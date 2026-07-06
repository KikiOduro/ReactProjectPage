import React, { useState } from "react";
import Header from "./Header";
import ProductDetails from "./ProductDetails";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";
import CartModal from "./CartModal";
import sneakerImage from "../assets/single-product-removebg-preview.png";

function ProductPage() {
  const product = {
    id: 1,
    name: "Onitsuka Tiger Tokuten Sneakers",
    price: 500,
    originalPrice: 65,
    rating: 4.6,
    reviewCount: 18,
    description: "Comfortable everyday shoes perfect for any occasion.",
    image: sneakerImage,
    colors: ["#1a1a1a", "#e8e0d5", "#7a1f3d", "#ed7220"],
    sizes: [8, 9, 10, 11, 12],
  };

  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[1]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "William",
      rating: 5,
      comment: "Comfortable fit and the design looks clean in person.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Naa",
      rating: 4,
      comment: "Great everyday sneaker. I would size up if you have wide feet.",
      date: "1 week ago",
    },
  ]);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  function handleIncrease() {
    setQuantity(quantity + 1);
  }

  function handleDecrease() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }



  function handleAddToCart() {
    const existingItem = cartItems.find(function (item) {
      return item.id === product.id && item.size === selectedSize;
    });
   
    if (existingItem) {
      const updatedItems = cartItems.map(function (item) {
        if (item.id === product.id && item.size === selectedSize) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setCartItems(updatedItems);
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity: quantity,
      };
      setCartItems([...cartItems, newItem]);
    }

    setShowConfirmation(true);
    setTimeout(function () {
      setShowConfirmation(false);
    }, 2000);
  }

  function handleIncreaseItem(itemId) {
    const updatedItems = cartItems.map(function (item) {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  }

  function handleDecreaseItem(itemId) {
    const updatedItems = cartItems.map(function (item) {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  }

  function handleRemoveItem(itemId) {
    const updatedItems = cartItems.filter(function (item) {
      return item.id !== itemId;
    });
    setCartItems(updatedItems);
  }

  function handleSubmitReview(event) {
    event.preventDefault();

    if (reviewText.trim() === "") {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewName.trim() === "" ? "Guest" : reviewName.trim(),
      rating: reviewRating,
      comment: reviewText.trim(),
      date: new Date().toLocaleDateString(),
    };

    setReviews(function (currentReviews) {
      return [newReview, ...currentReviews];
    });
    setReviewName("");
    setReviewRating(5);
    setReviewText("");
  }

  function renderRatingStars(value) {
    return Array.from({ length: 5 }, function (_, index) {
      return index < value ? "★" : "☆";
    }).join("");
  }

  function handleCartClick() {
    setIsCartOpen(true);
  }

  function handleCloseCart() {
    setIsCartOpen(false);
  }

  const totalItemCount = cartItems.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  const cartTotal = cartItems.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <Header itemCount={totalItemCount} onCartClick={handleCartClick} />

      <div className="page-container">
        <div className="product-container">
          <div className="image-container">
            <img src={product.image} alt="Product" className="product-image" />
          </div>

          <div className="details-container">
            <ProductDetails
              name={product.name}
              price={product.price}
              description={product.description}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />

            <div className="selectors-row">
              <div className="selector-block">
                <p className="selector-label">COLOR</p>
                <div className="color-options">
                  {product.colors.map(function (color) {
                    const isSelected = color === selectedColor;

                    return (
                      <div
                        key={color}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        onClick={function () {
                          setSelectedColor(color);
                        }}
                      >
                        {isSelected && <span className="color-checkmark">✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="selector-block">
                <p className="selector-label">SIZE</p>
                <select
                  className="size-dropdown"
                  value={selectedSize}
                  onChange={function (event) {
                    setSelectedSize(event.target.value);
                  }}
                >
                  {product.sizes.map(function (size) {
                    return (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </select>
              </div>

              <QuantitySelector
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            </div>

            <AddToCartButton
              onAddToCart={handleAddToCart}
              showConfirmation={showConfirmation}
            />
          </div>
        </div>

        <section className="reviews-section">
          <div className="reviews-section-header">
            <h2 className="reviews-title">Customer Reviews</h2>
            <p className="reviews-subtitle">
              Read feedback or add your own review below.
            </p>
          </div>

          <div className="reviews-layout">
            <div className="reviews-panel reviews-list-panel">
              <h3 className="reviews-panel-title">Past Reviews</h3>
              <div className="reviews-list">
                {reviews.map(function (review) {
                  return (
                    <article key={review.id} className="review-card">
                      <div className="review-card-header">
                        <strong>{review.name}</strong>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <div
                        className="review-stars"
                        aria-label={`Rated ${review.rating} out of 5`}
                      >
                        {renderRatingStars(review.rating)}
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="reviews-panel review-form-panel">
              <h3 className="reviews-panel-title">Write a Review</h3>
              <form className="review-form" onSubmit={handleSubmitReview}>
                <label className="review-field">
                  <span>Name</span>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={function (event) {
                      setReviewName(event.target.value);
                    }}
                    placeholder="Your name"
                  />
                </label>

                <div className="review-field">
                  <span>Rating</span>
                  <div
                    className="review-star-input"
                    role="radiogroup"
                    aria-label="Choose a rating"
                  >
                    {Array.from({ length: 5 }, function (_, index) {
                      const value = index + 1;
                      const isSelected = value <= reviewRating;

                      return (
                        <button
                          key={value}
                          type="button"
                          className={`review-star-button${isSelected ? " is-selected" : ""}`}
                          onClick={function () {
                            setReviewRating(value);
                          }}
                          aria-label={`${value} star${value > 1 ? "s" : ""}`}
                        >
                          ★
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="review-field review-textarea-field">
                  <span>Your review</span>
                  <textarea
                    value={reviewText}
                    onChange={function (event) {
                      setReviewText(event.target.value);
                    }}
                    placeholder="Tell us what you think about this product"
                    rows="5"
                  />
                </label>

                <button type="submit" className="review-submit-button">
                  Post Review
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* <CartSummary itemCount={totalItemCount} total={cartTotal} /> */}
      </div>

      <CartModal
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={handleCloseCart}
        onIncreaseItem={handleIncreaseItem}
        onDecreaseItem={handleDecreaseItem}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default ProductPage;
