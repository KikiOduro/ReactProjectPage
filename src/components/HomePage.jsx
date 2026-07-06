import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Header from "./Header";
import SafeImage from "./SafeImage";
import heroImage from "../assets/Affiliates.jfif";


function HomePage(props) {
  const categories = ["Black", "White", "Green", "Blue", "Pink"];
  const [activeCategory, setActiveCategory] = useState("Black");
  const newArrivalsRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "Basic Running Shoe, white / navy",
      price: 69.99,
      image: "https://i.pinimg.com/1200x/9a/2c/c8/9a2cc826db9ea637a87ae0af2021af47.jpg",
      description: "Lightweight everyday pair with a clean silhouette.",
      rating: 4.6,
      reviewCount: 18,
      colors: ["#1f2937", "#e5e7eb", "#0f766e"],
      sizes: [7, 8, 9, 10, 11],
    },
    {
      id: 2,
      name: "Classic Sneaker, black / white",
      price: 69.99,
      image: "https://i.pinimg.com/1200x/37/69/6c/37696c53a790783775eca6bca6c5fe72.jpg",
      description: "Minimal profile with a flexible sole and soft lining.",
      rating: 4.4,
      reviewCount: 22,
      colors: ["#111827", "#f3f4f6", "#d97706"],
      sizes: [7, 8, 9, 10, 11],
    },
    {
      id: 3,
      name: "Trail Runner, grey / green",
      price: 120.0,
      image: "https://i.pinimg.com/1200x/2a/0c/d1/2a0cd10c8e1789bb4a98c232498c93af.jpg",
      description: "Built for extra grip and comfort on longer walks.",
      rating: 4.7,
      reviewCount: 15,
      colors: ["#4b5563", "#e5e7eb", "#166534"],
      sizes: [8, 9, 10, 11, 12],
    },
    {
      id: 4,
      name: "High Top Sneaker, cream",
      price: 120.0,
      image: "https://i.pinimg.com/1200x/62/7d/42/627d425dfc14fa9e108b8fc2f90140b3.jpg",
      description: "A taller profile with a retro streetwear look.",
      rating: 4.5,
      reviewCount: 12,
      colors: ["#f5f5dc", "#1f2937", "#92400e"],
      sizes: [7, 8, 9, 10, 11],
    },
    {
      id: 5,
      name: "Slip-On Loafer, navy",
      price: 55.0,
      image: "https://i.pinimg.com/736x/e9/41/29/e94129bc5dd5429f2b15e52a7f97fb9f.jpg",
      description: "Easy slip-on style made for casual daily wear.",
      rating: 4.3,
      reviewCount: 9,
      colors: ["#1e3a8a", "#f9fafb", "#7c2d12"],
      sizes: [7, 8, 9, 10, 11],
    },
    {
      id: 6,
      name: "Canvas Sneaker, denim blue",
      price: 120.0,
      image: "https://i.pinimg.com/736x/f4/b1/6e/f4b16e2b9b3fe5370d25e914a48917d4.jpg",
      description: "Breathable canvas upper with a relaxed fit.",
      rating: 4.4,
      reviewCount: 14,
      colors: ["#1d4ed8", "#f3f4f6", "#111827"],
      sizes: [7, 8, 9, 10, 11],
    },
    {
      id: 7,
      name: "Platform Sneaker, white",
      price: 60.0,
      image: "https://i.pinimg.com/736x/d8/01/3b/d8013b5be86dd72e652f3cfd327e7c7c.jpg",
      description: "A lifted sole that keeps the look clean and modern.",
      rating: 4.2,
      reviewCount: 11,
      colors: ["#ffffff", "#e5e7eb", "#1f2937"],
      sizes: [7, 8, 9, 10, 11],
    },
    {
      id: 8,
      name: "Retro Sneaker, multi",
      price: 130.0,
      image: "https://i.pinimg.com/1200x/e3/62/59/e36259826e6b8e1a349562d30b691b56.jpg",
      description: "Color-blocked design with a vintage-inspired profile.",
      rating: 4.8,
      reviewCount: 19,
      colors: ["#7c3aed", "#f59e0b", "#111827"],
      sizes: [7, 8, 9, 10, 11],
    },
  ];

  useEffect(function () {
    if (props.scrollToProducts && newArrivalsRef.current) {
      newArrivalsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      props.onProductsScrolled();
    }
  }, [props.scrollToProducts, props]);

  return (
    <div>
      <Header
        itemCount={props.cartItemCount || 0}
        onHomeClick={props.onHomeClick}
        onProductsClick={props.onProductsClick}
        onCartClick={props.onCartClick}
      />

      {/* ===== Hero Banner ===== */}
      <div className="hero-banner">
        <div className="hero-text">
          <p className="hero-tagline">WalkWise</p>
          <h1 className="hero-heading">Shoes for the Modern Man</h1>
          <button className="hero-button">Discover Now</button>
        </div>
        <SafeImage
          src={heroImage}
          alt="Hero"
          className="hero-image"
        />
      </div>

      {/* ===== New Arrivals ===== */}
      <div className="new-arrivals-section" ref={newArrivalsRef}>
        <h2 className="new-arrivals-title">New Arrivals</h2>

        <div className="category-tabs">
          {categories.map(function (category) {
            const isActive = category === activeCategory;
            return (
              <span
                key={category}
                className={isActive ? "category-tab active" : "category-tab"}
                onClick={function () {
                  setActiveCategory(category);
                }}
              >
                {category.toUpperCase()}
              </span>
            );
          })}
        </div>

        <div className="product-grid">
          {products.map(function (product) {
            return (
              <div
                key={product.id}
                className="product-card"
                role="button"
                tabIndex={0}
                onClick={function () {
                  props.onSelectProduct(product);
                }}
                onKeyDown={function (event) {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    props.onSelectProduct(product);
                  }
                }}
              >
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  className="product-card-image"
                />
                <p className="product-card-category">SHOES</p>
                <p className="product-card-name">{product.name}</p>
                <p className="product-card-price">${product.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Promo Banners ===== */}
      <div className="promo-section">
        {/* <div className="promo-card promo-large">
          <p className="promo-tagline">ETHEREAL ELEGANCE</p>
          <h3 className="promo-heading">Where Dreams Meet Comfort</h3>
          <button className="promo-button">Shop Now</button>
        </div> */}

        {/* <div className="promo-column">
          <div className="promo-card promo-small">
            <p className="promo-tagline">RADIANT REVERIE</p>
            <h3 className="promo-heading">Enchanting Styles for Everyone</h3>
            <button className="promo-button">Shop Now</button>
          </div>

          <div className="promo-row">
            <div className="promo-card promo-small">
              <p className="promo-tagline">URBAN STRIDES</p>
              <h3 className="promo-heading">Chic Footwear for City Living</h3>
              <button className="promo-button">Shop Now</button>
            </div>

            <div className="promo-card promo-dark">
              <h3 className="promo-heading-large">50%</h3>
              <p className="promo-subtext">Trendsetting Shoes for Her</p>
              <button className="promo-button">Shop Now</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default HomePage;