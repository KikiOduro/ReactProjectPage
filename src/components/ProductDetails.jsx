import React from "react";
<<<<<<< HEAD

function renderStars(rating) {
  return Array.from({ length: 5 }, function (_, index) {
    return index < Math.round(rating) ? "★" : "☆";
  }).join("");
}

=======
>>>>>>> 435eb497467eddc027d47e83f415f7d396e44a7a
function ProductDetails(props) {
  return (
    <div className="details-block">
      <h1 className="product-name">{props.name}</h1>
<<<<<<< HEAD
      <div className="product-rating">
        <span
          className="product-stars"
          aria-label={`Rating ${props.rating} out of 5`}
        >
          {renderStars(props.rating)}
        </span>
        <span className="product-rating-value">{props.rating.toFixed(1)}</span>
        <span className="product-review-count">({props.reviewCount} reviews)</span>
      </div>
=======
>>>>>>> 435eb497467eddc027d47e83f415f7d396e44a7a
      <p className="product-price">${props.price}</p>
      <p className="product-description">{props.description}</p>
    </div>
  );
}

export default ProductDetails;