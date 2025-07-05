import React from 'react';
import { ShoppingCart } from 'lucide-react';
import LazyImage from '../lazy/LazyMotion';

export default function ProductCard({ product }) {
  return (
    <div className="relative overflow-hidden group rounded-lg shadow-md bg-white">
      <LazyImage
        src={product.image || 'Image not Available'}
        alt={product.name}
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
        skeletonClass="w-full h-72"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-500 text-white p-4 flex flex-col justify-center items-center text-center">
        <h3 className="text-lg font-bold mb-1">{product.name}</h3>
        <p className="text-sm mb-2">{product.description}</p>
        <div className="text-orange-400 font-bold text-xl mb-2">${product.price}</div>
        <div className="text-green-300 text-sm mb-2">Favourite Ratio: {product.interest}%</div>
        <button className="mt-2 bg-orange-500 hover:bg-orange-600 p-2 rounded-full">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
