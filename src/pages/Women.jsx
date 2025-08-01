import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterSidebarWomen from "../components/womenSection/FilterSidebarWomen";
import ProductGridWomen from "../components/womenSection/ProductGridWomen";
import detailnavimage from "../assets/detailnavimg.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Women() {
  const navigate = useNavigate();

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
    <>
      <section
        className="relative h-64 w-full flex items-center justify-center text-center text-white "
        style={{
          backgroundImage: `url(${detailnavimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "60px",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-4 z-20 bg-white text-black px-3 py-1 text-sm rounded hover:bg-orange-500 hover:text-white transition"
        >
          ← Back
        </button>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold">All Collection</h1>
          <p className="text-sm text-gray-200 mt-2">
            <Link
              to="/collection"
              className=" hover:text-orange-500 transition hover:cursor-pointer"
            >
              Shop
            </Link>{" "}
            &gt; Women's Wear
          </p>
        </div>
      </section>
      <section className="min-h-screen bg-white pt-10 px-4 py-10">
        {/* Mobile filter button */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Women Shoes</h2>
          {/* Filter Toggle menue */}
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
            <FilterSidebarWomen filters={filters} setFilters={setFilters} />
          </div>

          {/* Product Grid */}
          <div>
            <ProductGridWomen filters={filters} />
          </div>
        </div>
      </section>
    </>
  );
}
