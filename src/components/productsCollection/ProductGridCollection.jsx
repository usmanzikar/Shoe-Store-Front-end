import React, { useState } from "react";
import allProductsCombined from "../dummyData/allProductsCombined";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LazyImage from "../lazy/LazyMotion";

const ITEMS_PER_PAGE = 6;

export default function ProductGridCollection({ filters }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filterProducts = (product) => {
    const { color, size, priceMax, category, gender } = filters;
    let valid = true;

    if (gender) {
      const productGenders = Array.isArray(product.gender)
        ? product.gender.map((g) => g.toLowerCase())
        : [product.gender?.toLowerCase()];
      if (!productGenders.includes(gender.toLowerCase())) return false;
    }

    if (category && product.category.toLowerCase() !== category.toLowerCase())
      valid = false;

    if (color && product.color !== color) valid = false;
    if (size && (!product.sizes || !product.sizes.includes(size)))
      valid = false;
    if (priceMax && product.price > priceMax) valid = false;

    return valid;
  };

  const filtered = allProductsCombined.filter(filterProducts);

  React.useEffect(() => {
    const newTotalPages = Math.max(
      1,
      Math.ceil(filtered.length / ITEMS_PER_PAGE)
    );
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages); // Go to the last valid page instead of page 1
    }
  }, [filtered.length]);

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {paginated.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group perspective-[1000px] w-full max-w-[320px] mx-auto cursor-pointer"
          >
            <div className="relative w-full h-[380px] transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden rounded-xl shadow overflow-hidden">
               
                <LazyImage
                  src={product.image[0]}
                  alt={product.name}
                  className="rounded-md"
                  skeletonClass="h-full w-full"
                />
              </div>

              {/* Back Side */}
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
                {/* Title in Center */}
                <h2 className="text-2xl font-bold text-center mb-3 border-b border-white pb-2">
                  {product.name}
                </h2>

                {/* Info Box */}
                <div className="flex flex-col gap-1 text-sm flex-grow">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">
                      Category:
                    </span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Gender:</span>
                    <span>{product.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Color:</span>
                    <span>{product.color}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="font-semibold text-orange-400">
                      Price:
                    </span>
                    <span className="font-bold">PKR {product.price}</span>
                  </div>
                </div>

                {/* Description aligned left */}
                <p className="text-xs text-gray-200 mt-3 italic leading-snug line-clamp-2">
                  {product.description}
                </p>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <button className="px-4 py-1 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                    Shop Now
                  </button>
                  <button className="p-2 rounded-full shadow hover:bg-orange-500 hover:text-white transition">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
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
  );
}
