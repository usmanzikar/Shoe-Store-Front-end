// src/components/productsCollection/ProductGridCollection.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import LazyImage from "../lazy/LazyMotion";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCart } from "../../redux/slices/CartSlice";
import { toast } from "react-hot-toast";
import { fetchProducts } from "../../utils/api"; // ✅ Import API

const ITEMS_PER_PAGE = 6;

export default function ProductGridCollection({ filters }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // ✅ Filter products based on filters prop
  const filtered = useMemo(() => {
    return products.filter((product) => {
      const { color, size, priceMax, category, gender } = filters;

      // Gender filter
      if (gender) {
        const productGenders = Array.isArray(product.gender)
          ? product.gender.map((g) => g.toLowerCase())
          : [product.gender?.toLowerCase()];
        if (!productGenders.includes(gender.toLowerCase())) return false;
      }

      // Category filter
      if (category && product.category?.toLowerCase() !== category.toLowerCase())
        return false;

      // Color filter
      if (
        color &&
        (!product.colors ||
          !product.colors.map((c) => c.toLowerCase()).includes(color.toLowerCase()))
      )
        return false;

      // Size filter
      if (size && (!product.sizes || !product.sizes.includes(size))) return false;

      // Price filter
      if (priceMax && product.price > priceMax) return false;

      return true;
    });
  }, [products, filters]);

  // ✅ Update pagination when filtered length changes
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filtered.length, currentPage]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // ✅ Add to cart
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

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading products...</p>;
  }

  return (
    <div className="w-full">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {paginated.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="group perspective-[1000px] w-full max-w-[320px] mx-auto cursor-pointer"
          >
            <div className="relative w-full h-[380px] transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden rounded-xl shadow overflow-hidden">
                <LazyImage
                  src={product.images?.[0]}
                  alt={product.name}
                  className="rounded-md"
                  skeletonClass="h-full w-full"
                />
              </div>

              {/* Back */}
              <div
                className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-xl p-5 flex flex-col justify-between text-white"
                style={{
                  backgroundImage: `url(${product.images?.[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backgroundBlendMode: "darken",
                }}
              >
                <h2 className="text-2xl font-bold text-center mb-3 border-b border-white pb-2">
                  {product.name}
                </h2>

                <div className="flex flex-col gap-1 text-sm flex-grow">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Gender:</span>
                    <span>{product.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Color:</span>
                    <span>{product.colors?.join(", ")}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="font-semibold text-orange-400">Price:</span>
                    <span className="font-bold">PKR {product.price}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-200 mt-3 italic line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button className="px-4 py-1 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                    Shop Now
                  </button>
                  <button
                    className="p-2 rounded-full shadow hover:bg-orange-500 hover:text-white transition"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
