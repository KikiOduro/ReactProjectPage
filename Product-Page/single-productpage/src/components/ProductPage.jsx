import React, { useState } from "react";
import Header from "./Header";
import ProductDetails from "./ProductDetails";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";
import CartSummary from "./CartSummary";
import CartModal from "./CartModal";
import sneakerImage from "../assets/single-product-removebg-preview.png";

function ProductPage() {
  const product = {
    id: 1,
    name: "Basic Sneakers",
    price: 50,
    originalPrice: 65,
    rating: 4.6,
    reviewCount: 18,
    description: "Comfortable everyday shoes perfect for any occasion.",
    image: sneakerImage,
    colors: ["#1a1a1a", "#e8e0d5", "#7a1f3d"],
    sizes: [8, 9, 10, 11, 12],
  };

  const [quantity, setQuantity] = useState(1);
  // const[cartItems, setCartItems] = useState([);])
  const [cartItems, setCartItems] = useState([]);
  // const[showConfirmation, setShowConfirmmation]=usestate(fajslej);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const[selectedColor,setSelectedColor]=useState(product.colors[0];)
 
  // const[selectedsize,setselectedsize]=useState(product.sizes[0]])
  // const[selectedSize,setSelectedSize]=useState(product.sizes[0];)
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

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
    const existingItem = cartItems.find(function (item) {
      return item.id === product.id;
    });
   
    if (existingItem) {
      const updatedItems = cartItems.map(function (item) {
        if (item.id === product.id) {
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
        size: product.size,
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

  ////////
  function handleRemoveItems(itemId){
    const updatedItems = cartItems.fileter(function(item){
      return item.id !== itemId;
    });
    setCartItems(updatedItems);
  }
  //////

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

        <CartSummary itemCount={totalItemCount} total={cartTotal} />
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
