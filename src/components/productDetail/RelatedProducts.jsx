import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function RelatedProducts({ currentProduct, products }) {
  const navigate = useNavigate();

  if (!currentProduct || !products || !Array.isArray(products)) return null;

const related = products
  .filter(
    (item) =>
      (item.id || item._id) !== (currentProduct.id || currentProduct._id) &&
      item.category === currentProduct.category
  )
  .slice(0, 4);


  if (related.length === 0) return null; // ✅ No crash if no related items

  return (
    <div className="mt-16 px-4 w-full max-w-6xl mx-auto">
      <h3 className="text-xl font-bold mb-6 text-orange-600">
        Recommended Products
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 flex flex-col hover:cursor-pointer"
          >
            <img
              src={item.images?.[0] || "fallback.jpg"}
              alt={item.name}
              className="w-full h-[220px] object-cover rounded-t-xl"
            />
            <div className="flex flex-col justify-between flex-1 p-4">
              <h4 className="font-bold text-lg text-gray-800 truncate">{item.name}</h4>
              <p className="text-orange-500 font-semibold">PKR {item.price}</p>
              <button className="mt-2 px-4 py-1 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

