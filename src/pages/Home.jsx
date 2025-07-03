import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import shoe1 from '../assets/casual.jpg';
import shoe2 from '../assets/formal.jpg';
import shoe3 from '../assets/sneakers.jpg';
import CategorySection from '../components/categorySection/CategorySection';



const slides = [
  {
    image: shoe1,
    heading: 'Walk Bold in',
    highlight: 'Style',
    description: 'Elevate your look with comfort and confidence. Discover our premium range of casual shoes — perfect for daily adventures.',
  },
  {
    image: shoe2,
    heading: 'Every Step',
    highlight: 'Matters',
    description: 'Experience unmatched grip and support for long walks, busy days, and weekend fun.',
  },
  {
    image: shoe3,
    heading: 'Fashion Meets',
    highlight: 'Function',
    description: 'Modern design and everyday performance, crafted to match your unique vibe.',
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <section  className="pt-20 md:pt-10 bg-white text-black min-h-[90vh] overflow-hidden flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <motion.div
          key={index + '-image'}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}

        >
          <img
            src={slides[index].image}
            alt="Shoe Slide"
            className="w-full max-w-[500px] mx-auto h-auto"
          />
        </motion.div>

        {/* Text Carousel Section */}
        <div className="pt-12 md:pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold font-[Poppins] leading-tight mb-4 text-gray-900">
                {slides[index].heading}{' '}
                <span className="text-orange-500">{slides[index].highlight}</span>
              </h1>
              <p className="text-lg font-medium text-gray-600 mb-6 font-[Inter]">
                {slides[index].description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-orange-600 transition font-semibold"
              >
                Explore More
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
    <CategorySection/>
    
    </>
  );
}
