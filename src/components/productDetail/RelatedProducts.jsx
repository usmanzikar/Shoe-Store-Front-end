import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function RelatedProducts({ currentProduct, products = [] }) {
  const navigate = useNavigate();

  if (!products || !Array.isArray(products)) return null;

  const related = products
    .filter(
      (item) =>
        item.id !== currentProduct.id &&
        item.category === currentProduct.category
    )
    .slice(0, 4);

  return (
    <div className="mt-16 px-4 w-full max-w-6xl mx-auto">
      <h3 className="text-xl font-bold mb-6 text-orange-600">Recommended Products</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <div
                key={item.id}
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
                    <button className="p-2 rounded-full hover:bg-orange-500 hover:text-white transition">
                      🛒
                    </button>
                  </div>
                </div>
              </div>
        ))}
      </div>
    </div>
  );
}
