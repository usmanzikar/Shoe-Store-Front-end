import React from "react";
import dummyProducts from "../dummyData/dummyMenProduct";
import { ShoppingCart } from "lucide-react";

export default function ProductGrid({ filters }) {
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

  return (
    <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {filtered.map((product) => (
    <div
  key={product.id}
  className="bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 p-4 relative group flex flex-col justify-between h-[500px] max-w-[320px]"
>
  {/* Image */}
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-[250px] object-cover rounded"
  />

  {/* Text Content */}
  <div className="mt-3 flex-1 flex flex-col justify-between">
    <div>
      <h4 className="font-bold text-lg text-gray-800">{product.name}</h4>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-orange-600 font-bold mt-1">PKR {product.price}</p>
      <p className="text-gray-400 text-xs h-5 mt-4">Interest: N/A</p> {/* force height here */}
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
