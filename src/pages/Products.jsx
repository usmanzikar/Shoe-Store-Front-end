import React, { useState } from "react";
import ProductGrid from "../components/ProductSection/ProductGrid";
import ProductFilter from "../components/ProductSection/ProductFilter";
import sneakerp from "../assets/sneakers.jpg";
import formalp from "../assets/formal.jpg";
import formalp1 from "../assets/fp.jpg";
import loaferp from "../assets/lp1.jpg";
import bootsp from "../assets/boots1p.jpg";
import { useNavigate } from "react-router-dom";

const dummyProducts = [
  {
    id: 1,
    name: "Classic Sneakers",
    image: sneakerp,
    description: "Comfortable and stylish.",
    category: "Sneakers",
    price: 59.99,
    interest: "90",
  },
  {
    id: 2,
    name: "Formal Leather",
    image: formalp,
    description: "Elegant formal shoes.",
    category: "Formal",
    price: 89.99,
    interest: "85",
  },
  {
    id: 3,
    name: "Boots",
    image: bootsp,
    description: "Durable and rugged boots.",
    category: "Boots",
    price: 99.99,
    interest: "80",
  },
  {
    id: 4,
    name: "Formal Leather",
    image: formalp1,
    description: "Sharp look for office or events.",
    category: "Formal",
    price: 89.99,
    interest: "85",
  },
  {
    id: 5,
    name: "Soft Loafers",
    image: loaferp,
    description: "Easy wear loafers with soft padding.",
    category: "Loafers",
    price: 79.99,
    interest: "87",
  },
  // Add more products if needed
];

export default function Products() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Shop All");
  const categories = ["Shop All", "Sneakers", "Formal", "Boots", "Loafers"];

  const filtered =
    filter === "Shop All"
      ? dummyProducts
      : dummyProducts.filter((p) => p.category === filter);

  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Our Product List
      </h2>

      {/* Category Filter */}
      <ProductFilter
        categories={categories}
        active={filter}
        onSelect={setFilter}
      />

      {/* Product Grid */}
      <ProductGrid products={filtered} />

      {/* Explore More Button */}
      <div className="mt-10">
        <button
          className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-orange-500 transition"
          onClick={() => navigate("/collection")}
        >
          Explore More
        </button>
      </div>
    </section>
  );
}
