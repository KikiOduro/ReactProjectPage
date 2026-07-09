import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // const handleAddToCart = (newItem) => {
  //   setCartItems((currentItems) => {
  //     const existingItem = currentItems.find((item) => item.key === newItem.key);
  //   });
  // };
  // function handleAddToCart(newItem) {
  //   setCartItems(function (currentItems) {
  //     const existingItem = currentItems.find(function (item) {
  //       return item.key === newItem.key;
  //     });

  //     if (existingItem) {
  //       return currentItems.map(function (item) {
  //         if (item.key === newItem.key) {
  //           return { ...item, quantity: item.quantity + newItem.quantity };
  //         }
  //         return item;
  //       });
  //     }

  //     return [...currentItems, newItem];
  //   });
  // }
  const handleAddToCart = (newItem) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.key === newItem.key);

      if (existingItem) {
        return currentItems.map((item) => {
          if (item.key === newItem.key) {
            return { ...item, quantity: item.quantity + newItem.quantity };
          }
          return item;
        });
      }

      return [...currentItems, newItem];
    });
  };

  // function handleIncreaseItem(itemKey) {
  //   setCartItems(function (currentItems) {
  //     return currentItems.map(function (item) {
  //       if (item.key === itemKey) {
  //         return { ...item, quantity: item.quantity + 1 };
  //       }
  //       return item;
  //     });
  //   });
  // }
  
  const handleIncreaseItem = (itemKey) => {
    setCartItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.key === itemKey) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };
  // function handleDecreaseItem(itemKey) {
  //   setCartItems(function (currentItems) {
  //     return currentItems
  //       .map(function (item) {
  //         if (item.key === itemKey && item.quantity > 1) {
  //           return { ...item, quantity: item.quantity - 1 };
  //         }
  //         return item;
  //       })
  //       .filter(function (item) {
  //         return item.quantity > 0;
  //       });
  //   });
  // }

  const handleDecreaseItem = (itemKey) => {
    setCartItems((currentItems) => {
      return currentItems
        .map((item) => {
          if (item.key === itemKey && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // function handleRemoveItem(itemKey) {
  //   setCartItems(function (currentItems) {
  //     return currentItems.filter(function (item) {
  //       return item.key !== itemKey;
  //     });
  //   });
  // }

  const handleRemoveItem = (itemKey) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.key !== itemKey);
    });
  };
  const totalItemCount = cartItems.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage cartItemCount={totalItemCount} />}
          />
          <Route
            path="/product/:productId"
            element={
              <ProductPage
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
                onIncreaseItem={handleIncreaseItem}
                onDecreaseItem={handleDecreaseItem}
                onRemoveItem={handleRemoveItem}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
