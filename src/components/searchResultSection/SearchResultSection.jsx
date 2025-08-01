import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FilterSidebarSearchPage from "./FilterSidebarSearchPage";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart } from "../../redux/slices/CartSlice";
import { toast } from "react-hot-toast";
import { fetchProducts } from "../../utils/api";

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const { query } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [filters, setFilters] = useState({
    color: "",
    size: "",
    priceMax: 5000,
    category: "",
    gender: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from API once
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Filter products based on query and filters
  const filterProducts = (product) => {
    const { color, size, priceMax, category, gender } = filters;

    // Search matching - check name or category includes query text
    const matchesSearch =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase());

    if (!matchesSearch) return false;

    if (gender) {
      const productGenders = Array.isArray(product.gender)
        ? product.gender.map((g) => g.toLowerCase())
        : [product.gender?.toLowerCase()];
      if (!productGenders.includes(gender.toLowerCase())) return false;
    }

    if (category && product.category.toLowerCase() !== category.toLowerCase()) return false;

    if (
      color &&
      (!product.colors ||
        !product.colors.map((c) => c.toLowerCase()).includes(color.toLowerCase()))
    )
      return false;

    if (size && (!product.sizes || !product.sizes.includes(size))) return false;

    if (priceMax && product.price > priceMax) return false;

    return true;
  };

  const filteredResults = allProducts.filter(filterProducts);

  // Add to Cart handler
  const handleAddToCart = async (e, product) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to add items to cart");
        return;
      }

      // Check if product already in cart
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
    return <p className="text-center text-gray-500 mt-20">Loading products...</p>;
  }

  return (
    <section className="pt-28 px-4 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-600 w-full md:w-auto">{query.toUpperCase()}</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full shadow-md hover:bg-orange-600 transition"
        >
          <span className="text-lg">☰</span>{" "}
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <FilterSidebarSearchPage
            filters={filters}
            setFilters={setFilters}
            onClose={() => setShowFilters(false)}
          />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.length > 0 ? (
            filteredResults.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 flex flex-col h-[500px] w-full"
              >
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/220"}
                  alt={product.name}
                  className="w-full h-[220px] object-cover rounded-t-xl"
                />
                <div className="flex flex-col justify-between flex-1 p-4">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 truncate">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.shortDesc || product.description}</p>
                    <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
                    <p className="text-sm text-gray-600 mb-2">For: {product.gender}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      Color:{" "}
                      {Array.isArray(product.colors) ? product.colors.join(", ") : product.colors}
                    </p>
                    <p className="text-orange-500 font-semibold">PKR {product.price}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 mt-auto">
                    <button className="px-4 py-1 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
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
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No products found for "{query}".</p>
          )}
        </div>
      </div>
    </section>
  );
}
