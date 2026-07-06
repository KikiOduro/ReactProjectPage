import { useState } from "react";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import CartModal from "./components/CartModal";
import "./App.css";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrollToProducts, setScrollToProducts] = useState(false);

  function handleSelectProduct(product) {
    setSelectedProduct(product);
  }

  function handleBackToHome() {
    setSelectedProduct(null);
  }

  function handleHomeClick() {
    setSelectedProduct(null);
    setScrollToProducts(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleProductsClick() {
    setSelectedProduct(null);
    setScrollToProducts(true);
  }

  function handleProductsScrolled() {
    setScrollToProducts(false);
  }

  function handleCartClick() {
    setIsCartOpen(true);
  }

  function handleCloseCart() {
    setIsCartOpen(false);
  }

  function handleAddToCart(newItem) {
    setCartItems(function (currentItems) {
      const existingItem = currentItems.find(function (item) {
        return item.key === newItem.key;
      });

      if (existingItem) {
        return currentItems.map(function (item) {
          if (item.key === newItem.key) {
            return { ...item, quantity: item.quantity + newItem.quantity };
          }
          return item;
        });
      }

      return [...currentItems, newItem];
    });
  }

  function handleIncreaseItem(itemKey) {
    setCartItems(function (currentItems) {
      return currentItems.map(function (item) {
        if (item.key === itemKey) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  }

  function handleDecreaseItem(itemKey) {
    setCartItems(function (currentItems) {
      return currentItems
        .map(function (item) {
          if (item.key === itemKey && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(function (item) {
          return item.quantity > 0;
        });
    });
  }

  function handleRemoveItem(itemKey) {
    setCartItems(function (currentItems) {
      return currentItems.filter(function (item) {
        return item.key !== itemKey;
      });
    });
  }

  const totalItemCount = cartItems.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  return (
    <div className="App">
      {selectedProduct ? (
        <ProductPage
          product={selectedProduct}
          onBackToHome={handleBackToHome}
          onHomeClick={handleHomeClick}
          onProductsClick={handleProductsClick}
          onCartClick={handleCartClick}
          onAddToCart={handleAddToCart}
          cartItemCount={totalItemCount}
        />
      ) : (
        <HomePage
          onSelectProduct={handleSelectProduct}
          onHomeClick={handleHomeClick}
          onProductsClick={handleProductsClick}
          onProductsScrolled={handleProductsScrolled}
          scrollToProducts={scrollToProducts}
          onCartClick={handleCartClick}
          cartItemCount={totalItemCount}
        />
      )}

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
export default App;