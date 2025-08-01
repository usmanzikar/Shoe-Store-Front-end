import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../utils/api"; // fetch all for related
import ProductImageGallery from "../components/productDetail/ProductImageGallery";
import Footer from "../components/footer/Footer";
import DetailPageNav from "../components/common/DetailPageNav";
import { FaShippingFast, FaUndoAlt, FaWhatsapp } from "react-icons/fa";
import OtherProductDetail from "../components/productDetail/OtherProductDetails";
import RelatedProducts from "../components/productDetail/RelatedProducts";
import axios from "axios";
import { setCart } from "../redux/slices/CartSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeMessage, setActiveMessage] = useState(0);
    const dispatch = useDispatch();

  const salesMessages = useMemo(
    () => [
      "🔥 20 items sold in the last 24 hours",
      "⚡ 9 items sold in the last 9 hours",
    ],
    []
  );

  // Fetch product and all products for related
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchProductById(id);
        console.log("🔍 Single Product:", data);

        if (data && (data._id || data.id)) {
          // Normalize ID for consistency
          setProduct({ ...data, id: data.id || data._id });
          setError(false);
        } else {
          setError(true);
        }

        const all = await fetchProducts();
        setAllProducts(all);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Rotate sales messages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessage((prev) => (prev + 1) % salesMessages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [salesMessages]);

  const increaseQuantity = () => {
    if (quantity < parseInt(product?.stock || 1)) setQuantity((q) => q + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const totalPrice = useMemo(
    () => (product?.price || 0) * quantity,
    [product?.price, quantity]
  );

  // Loading
  if (loading) {
    return <div className="pt-28 text-center">Loading product...</div>;
  }

  // Error or no product found
  if (!loading && (error || !product)) {
    return (
      <section className="pt-28 text-center text-gray-500 min-h-screen">
        <DetailPageNav />
        <p>🚫 Product not found.</p>
        <Footer />
      </section>
    );
  }
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
      { productId: product._id, quantity }, 
      axiosConfig
    );

    // Update Redux with returned cart from backend
     dispatch(setCart(response.data.items || response.data.cart?.items || []));

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

  // Main View
  return (
    <>
      <section className="bg-white min-h-screen pt-20">
        <DetailPageNav />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-1">
          <ProductImageGallery images={product.images || []} />

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-red-500 font-semibold animate-pulse">
              {salesMessages[activeMessage]}
            </p>

            <p className="text-gray-600 text-sm">{product.shortDesc}</p>
            <p className="text-gray-600 text-sm">{product.detailedDesc}</p>

            <p className="text-orange-600 text-lg font-semibold">
              PKR {totalPrice.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              (PKR {product.price?.toLocaleString()} per item)
            </p>

            <p className="text-gray-600 text-sm">
              Product Type: {product.category}
            </p>
            <p className="inline-block bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md animate-pulse w-fit">
              ⏳ Hurry! Only {product.stock} left in stock!
            </p>

            {/* Colors */}
            {Array.isArray(product.colors) && product.colors.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Available Colors:
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {Array.isArray(product.sizes) && product.sizes.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Available Sizes:
                </p>
                <div className="flex gap-2">
                  {product.sizes.map((size, i) => (
                    <span key={i} className="px-3 py-1 border rounded text-sm">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="grid grid-cols-2 gap-2 mt-4 w-full">
              <div className="flex items-center justify-center gap-2 bg-orange-500 px-4 py-2 rounded-md shadow-sm w-full">
                <button
                  onClick={decreaseQuantity}
                  className="bg-orange-200 text-gray-800 px-2 py-1 rounded hover:bg-orange-300 transition w-8"
                >
                  −
                </button>
                <span className="px-3 py-1 bg-white border rounded-md text-orange-500 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="bg-orange-200 text-gray-800 px-2 py-1 rounded hover:bg-orange-300 transition w-8"
                >
                  ＋
                </button>
              </div>

              <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition w-full" 
              onClick={(e) => handleAddToCart(e, product)}
              >
                🛒 Add to Cart
              </button>
            </div>

            <button className="border border-orange-500 text-orange-500 py-2 px-4 rounded hover:bg-orange-500 hover:text-white transition">
              ⚡ Shop Now
            </button>

            {/* Delivery Info */}
            <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md w-full">
              <div className="flex items-center gap-3">
                <FaShippingFast className="text-green-600 text-xl" />
                <span className="text-gray-800 text-sm md:text-base">
                  Estimated Delivery: <strong>5–7 Days</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaUndoAlt className="text-blue-600 text-xl" />
                <span className="text-gray-800 text-sm md:text-base">
                  Free Shipping & Returns: On orders above{" "}
                  <strong>2000 PKR</strong>
                </span>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md w-full">
              <span className="text-gray-800 text-sm md:text-base">
                Let us know if you have any query!
              </span>
              <a
                href="https://wa.me/923038960300?text=Hi%20there!%20I%20have%20a%20question%20about%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm md:text-base rounded-md shadow hover:bg-green-600 transition"
              >
                <FaWhatsapp className="text-xl" />
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <OtherProductDetail />
        <div className="mt-16 mb-20">
          <RelatedProducts currentProduct={product} products={allProducts} />
        </div>
      </section>
      <Footer />
    </>
  );
}
