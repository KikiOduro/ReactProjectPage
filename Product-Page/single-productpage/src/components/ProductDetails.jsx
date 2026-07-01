import React from "react";
function ProductDetails(props) {
  return (
    <div className="details-block">
      <h1 className="product-name">{props.name}</h1>
      <p className="product-price">${props.price}</p>
      <p className="product-description">{props.description}</p>
    </div>
  );
}

export default ProductDetails;