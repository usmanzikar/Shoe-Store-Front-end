import React, { useState } from "react";
import FilterSidebar from "../components/menSection/FilterSidebar";
import ProductGrid from "../components/menSection/ProductGridm";

export default function Men() {
  const [filters, setFilters] = useState({
    color: "",
    size: "",
    priceMax: 5000,
    category: "",
  });
  
const [showFilters, setShowFilters] = useState(false);
  return (
    <section className="min-h-screen bg-white pt-28 px-4 py-10">
       {/* Mobile filter button */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Men's Shoes</h2>
        {/* Filter Toggle menue */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-orange-500 text-white px-3 py-1 rounded shadow hover:bg-orange-600"
        >
          ☰ Filters
        </button>
      </div>
     <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar (toggle on mobile) */}
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Product Grid */}
        <ProductGrid filters={filters} />
      </div>
    </section>
  );
}
