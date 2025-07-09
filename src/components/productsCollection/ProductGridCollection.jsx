import React from "react";
import allProductsCombined from "../dummyData/allProductsCombined";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductGridCollection({ filters }) {
  const navigate = useNavigate();
  const filterProducts = (product) => {
    const { color, size, priceMax, category, gender } = filters;
    let valid = true;

        // Gender match
    if (gender) {
      const productGenders = Array.isArray(product.gender)
        ? product.gender.map((g) => g.toLowerCase())
        : [product.gender?.toLowerCase()];

      if (!productGenders.includes(gender.toLowerCase())) return false;
    }
    // category match 
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      valid = false;
    }
    if (color && product.color !== color) valid = false;

    // product.sizes needs to be defined in the data
    if (size && (!product.sizes || !product.sizes.includes(size)))
      valid = false;

    if (priceMax && product.price > priceMax) valid = false;

    return valid;
  };

  const filtered = allProductsCombined.filter(filterProducts);
  return (
    <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {filtered.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 p-4 relative group flex flex-col justify-between h-auto max-w-[320px] hover:cursor-pointer"
        >
          {/* Image */}
          <img
            src={product.image[0] || "Image not Available"}
            alt={product.name}
            className="w-full h-[250px] object-cover rounded"
          />

          {/* Text Content */}
          <div className="mt-3 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-lg text-gray-800">
                {product.name}
              </h4>
              <p className="text-gray-600 text-sm">{product.description}</p>
               <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      Category: {product.category}
                    </p>
                     <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      For: {product.gender}
                    </p>
                     <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      Color: {product.color}
                    </p>
              <p className="text-orange-600 font-bold mt-1">
                PKR {product.price}
              </p>
              
              {/* force height here */}
            </div>

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
      ))}
    </div>
  );
}
