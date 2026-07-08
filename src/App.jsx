import { useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  function handleHomeClick() {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
  }

  function handleProductsClick() {
    navigate("/", { state: { scrollToProducts: true } });
  }

  function handleProductsScrolled() {
    navigate("/", { replace: true });
  }

  function handleContactClick() {
    navigate("/", { state: { scrollToContact: true } });
  }

  function handleContactScrolled() {
    navigate("/", { replace: true });
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
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onSelectProduct={function (product) {
                navigate(`/product/${product.id}`);
              }}
              onHomeClick={handleHomeClick}
              onProductsClick={handleProductsClick}
              onProductsScrolled={handleProductsScrolled}
              scrollToProducts={location.state?.scrollToProducts === true}
              onContactClick={handleContactClick}
              onContactScrolled={handleContactScrolled}
              scrollToContact={location.state?.scrollToContact === true}
              onCartClick={function () {
                navigate("/cart");
              }}
              cartItemCount={totalItemCount}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProductPage
              onBackToHome={function () {
                navigate("/");
              }}
              onHomeClick={handleHomeClick}
              onProductsClick={handleProductsClick}
              onContactClick={handleContactClick}
              onCartClick={function () {
                navigate("/cart");
              }}
              onAddToCart={handleAddToCart}
              cartItemCount={totalItemCount}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              itemCount={totalItemCount}
              onHomeClick={handleHomeClick}
              onProductsClick={handleProductsClick}
              onContactClick={handleContactClick}
              onCartClick={function () {
                navigate("/cart");
              }}
              onIncreaseItem={handleIncreaseItem}
              onDecreaseItem={handleDecreaseItem}
              onRemoveItem={handleRemoveItem}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
export default App;