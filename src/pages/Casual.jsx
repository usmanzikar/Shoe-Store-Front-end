import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterSidebarCasual from '../components/casualSection/FilterSidebarcasual';
import ProductGridCasual from '../components/casualSection/ProductGridCasual';

export default function Men() {
  const location = useLocation();

  const [filters, setFilters] = useState({
    color: "",
    size: "",
    priceMax: 5000,
    category: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  // Read category from state on first mount
  useEffect(() => {
    if (location.state?.category) {
      setFilters((prev) => ({
        ...prev,
        category: location.state.category,
      }));
    }
  }, [location.state]);

  return (
    <section className="min-h-screen bg-white pt-28 px-4 py-10">
      {/* Mobile filter button */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Men's Shoes</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-orange-500 text-white px-3 py-1 rounded shadow hover:bg-orange-600"
        >
          ☰ Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <FilterSidebarCasual filters={filters} setFilters={setFilters} />
        </div>

        {/* Product Grid */}
        <ProductGridCasual filters={filters} />
      </div>
    </section>
  );
}
