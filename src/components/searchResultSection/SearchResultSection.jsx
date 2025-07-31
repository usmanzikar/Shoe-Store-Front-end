import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FilterSidebarSearchPage from "./FilterSidebarSearchPage";
import allProductsCombined from "../dummyData/allProductsCombined";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCart } from "../../redux/slices/CartSlice";
import { toast } from 'react-hot-toast';


export default function SearchResultsPage() {
    const navigate = useNavigate();

  const { query } = useParams();

  const [filters, setFilters] = useState({
    color: "",
    size: "",
    priceMax: 5000,
    category: "", // e.g., Boots, Sneakers
    gender: "", // ✅ separate gender
  });

  const [showFilters, setShowFilters] = useState(false); // ⬅️ mobile sidebar toggle
  const filterProducts = (product) => {
    const { color, size, priceMax, category, gender } = filters;

    // Search matching
    const matchesSearch =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase());

    if (!matchesSearch) return false;

    // Gender match
    if (gender) {
      const productGenders = Array.isArray(product.gender)
        ? product.gender.map((g) => g.toLowerCase())
        : [product.gender?.toLowerCase()];

      if (!productGenders.includes(gender.toLowerCase())) return false;
    }

    // Category match (e.g., Boots)
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    if (color && product.color.toLowerCase() !== color.toLowerCase()) {
      return false;
    }

    if (size && (!product.sizes || !product.sizes.includes(size))) {
      return false;
    }

    if (priceMax && product.price > priceMax) return false;

    return true;
  };

  const filteredResults = allProductsCombined.filter(filterProducts);

  const dispatch = useDispatch();
    
 const handleAddToCart = async (e) => {
  e.stopPropagation();

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to cart");
      return;
    }

    const axiosConfig = {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    };

    const response = await axios.post(
      `http://localhost:5000/api/cart/item`,
      { productId: product._id, quantity: 1 },
      axiosConfig
    );

    // Update Redux with returned cart from backend
    dispatch(setCart(response.data.items));

    toast.success(`${product.name} added to cart`, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#1F2937",
        color: "#fff",
        borderRadius: "8px",
        padding: "12px 20px",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#f97316",
        secondary: "#fff",
      },
    });
  } catch (error) {
    console.error("Add to cart error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to add to cart");
  }
};

  return (
    <section className="pt-28 px-4 bg-white min-h-screen">
      {/* Heading + Filter Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-600  w-full md:w-auto">
          {query.toUpperCase()}
        </h2>
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full shadow-md hover:bg-orange-600 transition"
        >
          <span className="text-lg">☰</span>{" "}
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - visible on mobile if toggled */}
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <FilterSidebarSearchPage
            filters={filters}
            setFilters={setFilters}
            onClose={() => setShowFilters(false)}
          />
        </div>

        {/* Products */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 flex flex-col h-[500px] w-full"
              >
                {/* Product Image */}
                <img
                  src={item.image[0] || "Image Not Available"}
                  alt={item.name}
                  className="w-full h-[220px] object-cover rounded-t-xl"
                />

                {/* Card Content */}
                <div className="flex flex-col justify-between flex-1 p-4">
                  {/* Text Info */}
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      Category: {item.category}
                    </p>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      For: {item.gender}
                    </p>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      Color: {item.color}
                    </p>
                    <p className="text-orange-500 font-semibold">
                      PKR {item.price}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 mt-auto">
                    <button className="px-4 py-1 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                      Shop Now
                    </button>
                    <button
               onClick={(e) => handleAddToCart(e, item)}
                className="p-2 rounded-full shadow hover:bg-orange-500 hover:text-white transition"
              >
                <ShoppingCart size={18} />
              </button>
                  </div>
                </div>
              </div>
                
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No products found for "{query}".
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
