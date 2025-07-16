import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import allProducts from "../dummyData/allProductsCombined";
import FilterSidebarProductCollection from "../productsCollection/FilterSidebarProductCollection";
import LazyImage from "../lazy/LazyMotion";
import { ShoppingCart } from "lucide-react";
import detailnavimage from "../../assets/detailnavimg.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";
import { toast } from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

export default function CategoryPage() {
  const { categorypage } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    gender: "",
    color: "",
    size: "",
    priceMax: 5000,
    categorypage: categorypage || "", // Set initial category filter
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic Filtering Function
  const filterProducts = (product) => {
    const { color, size, priceMax, category, gender } = filters;
    let valid = true;

    if (gender) {
      const genders = Array.isArray(product.gender)
        ? product.gender.map((g) => g.toLowerCase())
        : [product.gender?.toLowerCase()];
      if (!genders.includes(gender.toLowerCase())) return false;
    }
    //this is the logic to fetch the categorypage items
    if (
      categorypage &&
      product.categorypage.toLowerCase() !== categorypage.toLowerCase()
    )
      valid = false;

    if (color && product.color !== color) valid = false;
    if (size && (!product.sizes || !product.sizes.includes(size)))
      valid = false;
    if (priceMax && product.price > priceMax) valid = false;

    return valid;
  };

  const filtered = allProducts.filter(filterProducts);
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));

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
  };

  // Adjust current page if filter changes
  useEffect(() => {
    const newTotalPages = Math.max(
      1,
      Math.ceil(filtered.length / ITEMS_PER_PAGE)
    );
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, [filtered.length]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <>
      <section
        className="relative h-64 w-full flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${detailnavimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "60px",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-4 z-20 bg-white text-black px-3 py-1 text-sm rounded hover:bg-orange-500 hover:text-white transition"
        >
          ← Category
        </button>

        {/* Text Content */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">All Collection</h1>
          <p className="text-sm text-gray-200 mt-2">
            <Link
              to="/collection"
              className="hover:text-orange-500 transition hover:cursor-pointer"
            >
              Shop
            </Link>{" "}
            &gt; {categorypage}
          </p>
        </div>
      </section>

      <section className="p-6 flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <FilterSidebarProductCollection
          filters={filters}
          setFilters={setFilters}
        />

        {/* Product Grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 capitalize">
            {categorypage} Products
          </h1>

          {filtered.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group perspective-[1000px] w-full max-w-[320px] mx-auto cursor-pointer"
                >
                  <div className="relative w-full h-[380px] transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden rounded-xl shadow overflow-hidden">
                      <LazyImage
                        src={product.image[0]}
                        alt={product.name}
                        className="rounded-md"
                        skeletonClass="h-full w-full"
                      />
                    </div>

                    {/* Back */}
                    <div
                      className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-xl p-5 flex flex-col justify-between text-white"
                      style={{
                        backgroundImage: `url(${product.image[0]})`,
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
                          <span className="font-semibold text-gray-300">
                            Category:
                          </span>
                          <span>{product.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-300">
                            Gender:
                          </span>
                          <span>{product.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-300">
                            Color:
                          </span>
                          <span>{product.color}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="font-semibold text-orange-400">
                            Price:
                          </span>
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
          )}

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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
