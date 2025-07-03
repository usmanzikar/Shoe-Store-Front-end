import React, { useState } from "react";
import FilterSidebarWomen from '../components/womenSection/FilterSidebarWomen';
import ProductGridWomen from '../components/womenSection/ProductGridWomen';

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
          <FilterSidebarWomen filters={filters} setFilters={setFilters} />
        </div>

        {/* Product Grid */}
        <ProductGridWomen filters={filters} />
      </div>
    </section>
  );
}
