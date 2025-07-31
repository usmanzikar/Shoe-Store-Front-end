import React, { useState,useEffect } from "react";
import ProductGrid from "../components/ProductSection/ProductGrid";
import ProductFilter from "../components/ProductSection/ProductFilter";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../utils/api";

const ITEMS_PER_LOAD = 6;
const MAX_VISIBLE = 12; // 4 rows × 3 items

export default function Products() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Shop All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [products, setProducts] = useState([]);

  //fetch api for products
   useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    })();
  }, []);

  const categories = ["Shop All", "Sneakers", "Formal", "Boots", "Loafers"];

  const filtered =
    filter === "Shop All"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === filter.toLowerCase()
        );

  const visibleProducts = filtered.slice(0, visibleCount);

  const showLoadMore = visibleCount < MAX_VISIBLE && visibleCount < filtered.length;
  const showExploreMore = visibleCount >= MAX_VISIBLE;

  const handleFilterChange = (selected) => {
    setFilter(selected);
    setVisibleCount(ITEMS_PER_LOAD); // reset to 6 on filter change
  };

  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Product List</h2>

      {/* Filter Tabs */}
      <ProductFilter
        categories={categories}
        active={filter}
        onSelect={handleFilterChange}
      />

      {/* Product Grid */}
      <ProductGrid products={visibleProducts} />

      {/* Buttons */}
      <div className="mt-10">
        {showLoadMore && (
          <button
            className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-orange-500 transition"
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
          >
            Load More
          </button>
        )}

        {showExploreMore && (
          <button
            className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-orange-500 transition"
            onClick={() => navigate("/collection")}
          >
            Explore More
          </button>
        )}
      </div>
    </section>
  );
}
