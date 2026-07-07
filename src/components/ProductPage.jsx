import React, { useState } from "react";
import Header from "./Header";
import ProductDetails from "./ProductDetails";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";
import sneakerImage from "../assets/single-product-removebg-preview.png";

function ProductPage(props) {
  const defaultProduct = {
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
  const product = props.product || defaultProduct;
  const productColors = product.colors || defaultProduct.colors;
  const productSizes = product.sizes || defaultProduct.sizes;
  const productRating = product.rating || defaultProduct.rating;
  const productReviewCount = product.reviewCount || defaultProduct.reviewCount;
  const productDescription = product.description || defaultProduct.description;
  const productImage = product.image || defaultProduct.image;
  const productName = product.name || defaultProduct.name;
  const productPrice = product.price || defaultProduct.price;

  const [quantity, setQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  const [selectedSize, setSelectedSize] = useState(productSizes[0]);

  function handleIncrease() {
    setQuantity(quantity + 1);
  }

  function handleDecrease() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  // function handleColorSelect(color){
  //   setSelectedColor(color);
  // }

  function handleAddToCart() {
    props.onAddToCart({
      key: `${product.id}-${selectedSize}`,
      id: product.id,
      name: productName,
      price: productPrice,
      image: productImage,
      size: selectedSize,
      quantity: quantity,
    });

    setShowConfirmation(true);
    setTimeout(function () {
      setShowConfirmation(false);
    }, 2000);
  }

  const totalItemCount = props.cartItemCount || 0;

  return (
    <div>
      <Header
        itemCount={totalItemCount}
        onHomeClick={props.onHomeClick}
        onProductsClick={props.onProductsClick}
        onContactClick={props.onContactClick}
        onCartClick={props.onCartClick}
      />

      <div className="page-container">
        <button
          type="button"
          className="back-to-home-button"
          onClick={props.onBackToHome}
        >
          ← Back to products
        </button>

        <div className="product-container">
          <div className="image-container">
            <img
              src={productImage}
              alt={productName}
              className="product-image"
            />
          </div>

          <div className="details-container">
            <ProductDetails
              name={productName}
              price={productPrice}
              description={productDescription}
              rating={productRating}
              reviewCount={productReviewCount}
            />

            <div className="selectors-row">
              <div className="selector-block">
                <p className="selector-label">COLOR</p>
                <div className="color-options">
                  {productColors.map(function (color) {
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
                        {isSelected && (
                          <span className="color-checkmark">✓</span>
                        )}
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
                  {productSizes.map(function (size) {
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

        {/* <CartSummary itemCount={totalItemCount} total={cartTotal} /> */}
      </div>
    </div>
  );
}

export default ProductPage;
