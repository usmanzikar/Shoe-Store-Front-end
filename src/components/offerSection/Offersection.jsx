import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OffersSection() {
  const offers = [
    {
      title: 'Up to 70% Off',
      subtitle: 'Sneakers Collection',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      title: 'Flat 50% Discount',
      subtitle: 'Formal Shoes',
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      title: '30% Off',
      subtitle: 'Boots & Loafers',
      color: 'bg-red-100 text-red-700',
    },
  ];

  // ⏱ Countdown Logic
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const target = new Date();
    target.setDate(target.getDate() + 2); // 2 days from now
    const difference = target - new Date();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white text-center px-6" id='offer'>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Hot Offers Just for You</h2>
      <p className="text-gray-600 mb-6">Limited-time deals you don't want to miss!</p>

      {/* Countdown */}
      <div className="text-lg font-semibold text-red-600 mb-10">
        🕒 Offer ends in:&nbsp;
        <span className="font-mono">
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
        </span>
      </div>

      {/* Offer Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`w-[280px] h-[180px] rounded-xl shadow-md p-6 cursor-pointer ${offer.color}`}
          >
            <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
            <p className="text-md">{offer.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all"
      >
        Shop Offers
      </motion.button>
    </section>
  );
}
