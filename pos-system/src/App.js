import React from "react";
import "./styles.css";
import ProductCard from "./components/ProductCard";

const mockProducts = [
  { id: 1, name: "Coca Cola", price: 12000, image: "/img/coca.jpg" },
  { id: 2, name: "Pepsi", price: 11000, image: "/img/pepsi.jpg" },
  { id: 3, name: "Snack Oishi", price: 15000, image: "/img/snack.jpg" },
];

export default function App() {
  return (
    <div className="pos-container">
      <h1 className="title">POS System</h1>
      <div className="grid-products">
        {mockProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
