// src/pages/OfferPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import allProductsCombined from '../components/dummyData/allProductsCombined';
import FilterSidebarProductCollection from '../components/productsCollection/FilterSidebarProductCollection';
import { motion } from 'framer-motion';
import detailnavimage from '../assets/detailnavimg.jpg';
import { Link } from 'react-router-dom';

const offers = [
  { key: '70-off', label: '70% Off', colorClass: 'text-orange-500' },
  { key: '50-off', label: '50% Off', colorClass: 'text-yellow-500' },
  { key: '30-off', label: '30% Off', colorClass: 'text-red-500' },
];

export default function OfferPage() {
  const { offerType } = useParams();
  const navigate = useNavigate();

  const [selectedOffer, setSelectedOffer] = useState(offerType);
  const [filters, setFilters] = useState({
    gender: '',
    color: '',
    size: '',
    priceMax: 5000,
  });

  useEffect(() => {
    setSelectedOffer(offerType);
  }, [offerType]);

  useEffect(() => {
    if (offerType !== selectedOffer) {
      navigate(`/offerpage/${selectedOffer}`);
    }
  }, [selectedOffer, offerType, navigate]);

  const filteredProducts = useMemo(() => {
    return allProductsCombined.filter(product => {
      if (product.offer !== selectedOffer) return false;
      if (filters.gender && product.gender !== filters.gender) return false;
      if (filters.color && product.color !== filters.color) return false;
      if (filters.size && !product.sizes.includes(filters.size)) return false;
      if (product.price > filters.priceMax) return false;
      return true;
    });
  }, [selectedOffer, filters]);

  return (
     <>
     <section
          className="relative h-64 w-full flex items-center justify-center text-center text-white"
          style={{
            backgroundImage: `url(${detailnavimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginTop: "60px",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-10 left-4 z-20 bg-white text-black px-3 py-1 text-sm rounded hover:bg-orange-500 hover:text-white transition"
          >
            ← Back
          </button>
    
          {/* Text Content */}
          <div className="relative z-10">
            <h1 className="text-3xl font-bold">All Collection</h1>
            <p className="text-sm text-gray-200 mt-2">
              <Link
                to="/collection"
                className="hover:text-orange-500 transition hover:cursor-pointer"
              >
                Shop
              </Link>{" "}
              &gt; Offers
            </p>
          </div>
        </section>
    <section className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <FilterSidebarProductCollection filters={filters} setFilters={setFilters} />

      {/* Main */}
      <main className="flex-1">
        {/* Offer Tabs */}
        <div className="flex justify-center gap-10 mb-8 border-b border-gray-300 pb-4 select-none">
          {offers.map(({ key, label, colorClass }) => {
            const isSelected = key === selectedOffer;
            return (
              <button
                key={key}
                onClick={() => setSelectedOffer(key)}
                className={`relative text-lg font-semibold transition-colors duration-300 ${
                  isSelected ? colorClass : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {label}
                {isSelected && (
                  <motion.div
                    layoutId="underline"
                    className={`absolute -bottom-2 left-0 right-0 h-1 rounded-full ${colorClass.replace(
                      'text-',
                      'bg-'
                    )}`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border rounded-md p-4 shadow hover:shadow-lg cursor-pointer"
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-orange-600 font-bold">PKR {product.price.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </section>
    </>
    
  );
}
