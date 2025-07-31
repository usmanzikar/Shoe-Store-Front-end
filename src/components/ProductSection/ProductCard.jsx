import React from "react";
import { ShoppingCart } from "lucide-react";
import LazyImage from "../lazy/LazyMotion";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCart } from "../../redux/slices/CartSlice";
import { toast } from "react-hot-toast";

export default function ProductCard({ product, onClick }) {
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
    <div
      onClick={onClick}
      className="relative overflow-hidden group rounded-xl shadow-lg bg-white transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
    >
      <LazyImage
        src={product.images?.[0] || "Image not Available"}
        alt={product.name}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
        skeletonClass="w-full h-72"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-6 py-8 flex flex-col justify-center items-center text-center rounded-xl">
        <h3 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">
          {product.name}
        </h3>

        <p className="text-sm text-gray-200 mb-4 line-clamp-2 px-2">
          {product.shortDesc}
        </p>

        <div className="text-xs text-gray-300 space-y-1 mb-4">
          <p>Category: <span className="font-medium text-white">{product.category}</span></p>
          <p>For: <span className="font-medium text-white">{product.gender}</span></p>
          <p>Color: <span className="font-medium text-white"> {Array.isArray(product.colors) ? product.colors.join(", ") : product.colors}</span></p>
        </div>

        <div className="flex justify-between items-center w-full px-4">
          <span className="text-lg font-bold text-orange-400 drop-shadow">
            {product.price} PKR
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
