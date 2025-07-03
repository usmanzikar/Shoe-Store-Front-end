import React from 'react';

export default function ProductFilter({ categories, active, onSelect }) {
  return (
    <div className="flex gap-4 flex-wrap justify-center mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            active === cat ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-orange-100'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
