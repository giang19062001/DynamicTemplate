import React from "react";

export default function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h2>{name}</h2>
        <p>{price.toLocaleString()} đ</p>
      </div>
    </div>
  );
}
