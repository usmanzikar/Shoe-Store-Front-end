import React from "react";
import dummyProducts from "../dummyData/dummyMenProduct";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";
import { toast } from 'react-hot-toast';

export default function ProductGridm({ filters }) {
  const navigate = useNavigate();
  const filterProducts = (product) => {
    const { color, size, priceMax, category } = filters;
    let valid = true;
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

  const filtered = dummyProducts.filter(filterProducts);

   const dispatch = useDispatch();
  
   const handleAddToCart = (e, product) => {
  e.stopPropagation();
  dispatch(addToCart(product));

  toast.success(`${product.name} added to cart`, {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#1F2937',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 20px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#f97316',
      secondary: '#fff',
    },
  });
};


  return (
    
    <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {filtered.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="cursor-pointer bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 p-4 relative group flex flex-col justify-between h-auto max-w-[320px]"
        >
          {/* Image */}
          <img
            src={product.image[0] || "https://via.placeholder.com/250"}
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
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Add cart functionality here
                }}
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
