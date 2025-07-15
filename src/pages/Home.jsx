import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import homeSlides from "../components/dummyData/homedummydata";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % homeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4 md:px-10 overflow-hidden text-white">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Shoe Image (fully visible, no mask) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "-image"}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="w-full h-[500px] flex items-center justify-center"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
          >
            <motion.img
              src={homeSlides[index].image}
              alt="Shoe"
              className="w-full h-full object-contain rounded-xl"
              animate={{
                rotate: isFlipped ? -8 : 0,
                scale: isFlipped ? 1.05 : 1,
                scaleX: isFlipped ? -1 : 1, // smooth horizontal flip
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Right: Slide Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "-text"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading font-family font-[Poppins] leading-tight mb-4 text-white">
              {homeSlides[index].heading}{" "}
              <span className="text-orange-500">
                {homeSlides[index].highlight}
              </span>
            </h1>
            <p className="text-lg font-medium font-body text-gray-300 mb-6 font-[Inter] max-w-lg">
              {homeSlides[index].description}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/collection')}
              className="bg-orange-500 text-white font-heading px-6 py-3 rounded-md shadow-lg hover:bg-orange-600 transition font-semibold"
            >
              Explore More
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
