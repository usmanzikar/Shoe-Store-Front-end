import React from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

export default function ProductGrid({ products }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((p) => (
        <ProductCard key={p.id}  
        onClick={() => navigate(`/product/${p.id}`)}
        product={p}
        />
      ))}
    </div>
  );
}
