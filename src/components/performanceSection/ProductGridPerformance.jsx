import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart } from "../../redux/slices/CartSlice";
import { toast } from "react-hot-toast";
import { fetchProducts } from "../../utils/api";

export default function ProductGridPerformance({ filters }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // ✅ Access cart

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching Performance products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // ✅ Filtering logic
  const filterProducts = (product) => {
    const { color, size, priceMax, category } = filters;

    if (category && product.category?.toLowerCase() !== category.toLowerCase()) return false;

    if (
      color &&
      (!product.colors ||
        !product.colors.map((c) => c.toLowerCase()).includes(color.toLowerCase()))
    )
      return false;

    if (
      size &&
      (!product.sizes || !product.sizes.map(String).includes(String(size)))
    )
      return false;

    if (priceMax && Number(product.price) > Number(priceMax)) return false;

    return true;
  };

  const filtered = products.filter(filterProducts);

  // ✅ Add to cart handler
  const handleAddToCart = async (e, product) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to add items to cart");
        return;
      }

      // 🔹 Check duplicate
      const alreadyInCart = cartItems.some(
        (item) => item.productId?._id === product._id || item.productId === product._id
      );
      if (alreadyInCart) {
        toast.error(`${product.name} is already in your cart`);
        return;
      }

      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        `http://localhost:5000/api/cart/item`,
        { productId: product._id, quantity: 1 },
        axiosConfig
      );

      dispatch(setCart(response.data.items));

      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading Performance products...</p>;
  }

  return (
    <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {filtered.map((product) => (
        <div
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
          className="bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 p-4 relative group flex flex-col justify-between h-auto max-w-[320px]"
        >
          <img
            src={product.images?.[0] || "https://via.placeholder.com/250"}
            alt={product.name}
            className="w-full h-[250px] object-cover rounded"
          />

          <div className="mt-3 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-lg text-gray-800">{product.name}</h4>
              <p className="text-gray-600 text-sm">{product.shortDesc}</p>
              <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-sm text-gray-600 mb-2">For: {product.gender}</p>
              <p className="text-sm text-gray-600 mb-2">
                Color:{" "}
                {Array.isArray(product.colors)
                  ? product.colors.join(", ")
                  : product.colors}
              </p>
              <p className="text-orange-600 font-bold mt-1">PKR {product.price}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-1 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
              >
                Shop Now
              </button>
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="p-2 rounded-full shadow hover:bg-orange-500 hover:text-white transition"
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
