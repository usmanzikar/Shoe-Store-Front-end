import React from "react";
import { useParams } from "react-router-dom";
import allProducts from "../dummyData/allProductsCombined";

export default function SearchResultSection() {

    const { query } = useParams();

  const results = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );



  return (
    <section className="min-h-screen bg-white pt-28 px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-orange-500">{query}</span>
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 p-4 relative group flex flex-col justify-between h-[500px] max-w-[320px]"
            >
              <img
                src={product.image || 'Image not Available'}
                alt={product.name}
                className="w-full h-[250px] object-cover rounded"
              />
              <div className="mt-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{product.name}</h4>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <p className="text-orange-600 font-bold mt-1">PKR {product.price}</p>
                </div>
                <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found for "<strong>{query}</strong>"</p>
      )}
    </section>
  );
}
