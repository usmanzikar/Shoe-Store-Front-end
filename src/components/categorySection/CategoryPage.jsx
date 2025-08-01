import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import FilterSidebarProductCollection from "../productsCollection/FilterSidebarProductCollection";
import LazyImage from "../lazy/LazyMotion";
import { ShoppingCart } from "lucide-react";
import detailnavimage from "../../assets/detailnavimg.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart } from "../../redux/slices/CartSlice";
import { toast } from "react-hot-toast";
import { fetchProducts } from "../../utils/api";

const ITEMS_PER_PAGE = 6;

export default function CategoryPage() {
  const { categorypage } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // ✅ Access Redux cart

  const [filters, setFilters] = useState({
    gender: "",
    color: "",
    size: "",
    priceMax: 5000,
    categorypage: categorypage || "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
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

  const normalize = (str) => str?.toLowerCase().replace(/[-\s]/g, "");

  // ✅ Filter products
  const filterProducts = (product) => {
    const { color, size, priceMax, categorypage, gender } = filters;

    if (gender) {
      const genders = Array.isArray(product.gender)
        ? product.gender.map((g) => g.toLowerCase())
        : [product.gender?.toLowerCase()];
      if (!genders.includes(gender.toLowerCase())) return false;
    }

    if (categorypage && normalize(product.categorypage) !== normalize(categorypage))
      return false;

    if (
      color &&
      (!product.colors ||
        !product.colors.map((c) => c.toLowerCase()).includes(color.toLowerCase()))
    )
      return false;

    if (size && (!product.sizes || !product.sizes.map(String).includes(String(size))))
      return false;

    if (priceMax && Number(product.price) > Number(priceMax)) return false;

    return true;
  };

  const filtered = products.filter(filterProducts);

  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
  }, [filtered.length]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // ✅ Fixed Add to Cart
  const handleAddToCart = async (e, product) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to add items to cart");
        return;
      }

      // 🔹 Check if product already in cart
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
    return <p className="text-center text-gray-500 mt-10">Loading {categorypage} products...</p>;
  }

  return (
    <>
      {/* Banner */}
      <section
        className="relative h-64 w-full flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${detailnavimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "60px",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-4 z-20 bg-white text-black px-3 py-1 text-sm rounded hover:bg-orange-500 hover:text-white transition"
        >
          ← Category
        </button>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">All Collection</h1>
          <p className="text-sm text-gray-200 mt-2">
            <Link to="/collection" className="hover:text-orange-500 transition hover:cursor-pointer">
              Shop
            </Link>{" "}
            &gt; {categorypage}
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="p-6 flex flex-col md:flex-row gap-6">
        <FilterSidebarProductCollection filters={filters} setFilters={setFilters} />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 capitalize">{categorypage} Products</h1>

          {filtered.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="group perspective-[1000px] w-full max-w-[320px] mx-auto cursor-pointer"
                >
                  <div className="relative w-full h-[380px] transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                    <div className="absolute w-full h-full backface-hidden rounded-xl shadow overflow-hidden">
                      <LazyImage src={product.images?.[0]} alt={product.name} className="rounded-md" skeletonClass="h-full w-full" />
                    </div>
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
                      <h2 className="text-2xl font-bold text-center mb-3 border-b border-white pb-2">{product.name}</h2>
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
                          <span>{Array.isArray(product.colors) ? product.colors.join(", ") : product.colors}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="font-semibold text-orange-400">Price:</span>
                          <span className="font-bold">PKR {product.price}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-200 mt-3 italic line-clamp-2">{product.shortDesc}</p>
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
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-300"}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
