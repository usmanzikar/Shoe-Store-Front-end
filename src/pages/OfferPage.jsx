// src/pages/OfferPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import FilterSidebarProductCollection from "../components/productsCollection/FilterSidebarProductCollection";
import { motion } from "framer-motion";
import detailnavimage from "../assets/detailnavimg.jpg";
import { fetchProducts, fetchProductById } from "../utils/api";

const offers = [
  { key: "70-off", label: "70% Off", colorClass: "text-orange-500" },
  { key: "50-off", label: "50% Off", colorClass: "text-yellow-500" },
  { key: "30-off", label: "30% Off", colorClass: "text-red-500" },
];

export default function OfferPage() {
  const { offerType } = useParams();
  const navigate = useNavigate();

  const [selectedOffer, setSelectedOffer] = useState(offerType);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    color: "",
    size: "",
    priceMax: 5000,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all products from API on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching offer products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Update selectedOffer on route change
  useEffect(() => {
    setSelectedOffer(offerType);
  }, [offerType]);

  // Map route param to offer string in product data
  const offerMapping = {
    "70-off": "70%",
    "50-off": "50%",
    "30-off": "30%",
  };

  // Filter products based on offer and filters
  const filteredProducts = useMemo(() => {
    const normalizedOffer = offerMapping[selectedOffer] || selectedOffer;

    return products.filter((product) => {
      if (!product.offer) return false;
      if (product.offer.toLowerCase() !== normalizedOffer.toLowerCase()) return false;

      if (filters.gender && product.gender !== filters.gender) return false;
      if (
        filters.color &&
        (!product.colors ||
          !product.colors.map((c) => c.toLowerCase()).includes(filters.color.toLowerCase()))
      )
        return false;
      if (
        filters.size &&
        (!product.sizes || !product.sizes.includes(filters.size))
      )
        return false;
      if (product.price > filters.priceMax) return false;

      return true;
    });
  }, [products, selectedOffer, filters]);

  // Handle click: fetch product by id, then navigate passing product data in state
  const handleProductClick = async (id) => {
    try {
      const productDetail = await fetchProductById(id);
      navigate(`/product/${id}`, { state: { product: productDetail } });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading {selectedOffer} products...
      </p>
    );
  }

  return (
    <>
      {/* Hero Section */}
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
          ← Back
        </button>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">Offers</h1>
          <p className="text-sm text-gray-200 mt-2">
            <Link
              to="/collection"
              className="hover:text-orange-500 transition hover:cursor-pointer"
            >
              Shop
            </Link>{" "}
            &gt; Offers
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row gap-8">
        {/* Filter Toggle (Mobile) */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Offers</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-orange-500 text-white px-3 py-1 rounded shadow hover:bg-orange-600"
          >
            ☰ Filters
          </button>
        </div>

        {/* Filter Sidebar - Desktop */}
        <div className="hidden md:block">
          <FilterSidebarProductCollection
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* Filter Sidebar - Mobile Overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-white p-4 overflow-auto md:hidden shadow-lg">
            <button
              onClick={() => setShowFilters(false)}
              className="text-sm mb-4 bg-gray-200 px-3 py-1 rounded"
            >
              Close
            </button>
            <FilterSidebarProductCollection
              filters={filters}
              setFilters={(newFilters) => {
                setFilters(newFilters);
                setShowFilters(false);
              }}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Offer Tabs */}
          <div className="flex justify-center gap-10 mb-8 border-b border-gray-300 pb-4 select-none">
            {offers.map(({ key, label, colorClass }) => {
              const isSelected = key === selectedOffer;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedOffer(key)}
                  className={`relative text-lg font-semibold transition-colors duration-300 ${
                    isSelected
                      ? colorClass
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {label}
                  {isSelected && (
                    <motion.div
                      layoutId="underline"
                      className={`absolute -bottom-2 left-0 right-0 h-1 rounded-full ${colorClass.replace(
                        "text-",
                        "bg-"
                      )}`}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border rounded-md p-4 shadow hover:shadow-lg cursor-pointer"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-orange-600 font-bold">
                    PKR {product.price}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </section>
    </>
  );
}
