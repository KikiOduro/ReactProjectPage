import React from "react";

// function renderStars(rating) {
//   return Array.from({ length: 5 }, function (_, index) {
//     return index < Math.round(rating) ? "★" : "☆";
//   }).join("");
// }

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => {
    return index < Math.round(rating) ? "★" : "☆";
  }).join("");  
}

function ProductDetails(props) {
  return (
    <div className="details-block">
      <h1 className="product-name">{props.name}</h1>
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
      <p className="product-price">${props.price}</p>
      <p className="product-description">{props.description}</p>
    </div>
  );
}

export default ProductDetails;