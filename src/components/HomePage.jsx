import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import SafeImage from "./SafeImage";
import heroImage from "../assets/Affiliates.jfif";
import { products } from "../data/products";


function HomePage(props) {
  const categories = ["Black", "White", "Green", "Blue", "Pink"];
  const [activeCategory, setActiveCategory] = useState("Black");
  const newArrivalsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(function () {
    if (props.scrollToProducts && newArrivalsRef.current) {
      newArrivalsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      props.onProductsScrolled();
    }
  }, [props.scrollToProducts, props.onProductsScrolled]);

  useEffect(function () {
    if (props.scrollToContact && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      props.onContactScrolled();
    }
  }, [props.scrollToContact, props.onContactScrolled]);

  return (
    <div>
      <Header
        itemCount={props.cartItemCount || 0}
        onHomeClick={props.onHomeClick}
        onProductsClick={props.onProductsClick}
        onContactClick={props.onContactClick}
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

      <section className="contact-section" ref={contactRef}>
        <div className="contact-section-inner">
          <p className="contact-eyebrow">CONTACT</p>
          <h2 className="contact-title">Get in touch</h2>
          <p className="contact-copy">
            Questions about sizing, shipping, or styling? Reach out and we will get back to you.
          </p>

          <div className="contact-grid">
            <div className="contact-card">
              <span className="contact-label">Email</span>
              <span className="contact-value">support@walkwise.com</span>
            </div>
            <div className="contact-card">
              <span className="contact-label">Phone</span>
              <span className="contact-value">+(233) 012 234-3456</span>
            </div>
            <div className="contact-card">
              <span className="contact-label">Hours</span>
              <span className="contact-value">Mon - Fri, 9am - 5pm</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;