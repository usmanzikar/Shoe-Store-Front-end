// src/components/home/OffersSection.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function OffersSection() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const nextReset = new Date();
    nextReset.setDate(now.getDate() + (7 - now.getDay()));
    nextReset.setHours(0, 0, 0, 0);
    const diff = nextReset - now;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const offers = [
    {
      key: '70-off',
      label: '70% Off',
      bgGradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
      textColor: 'text-white',
    },
    {
      key: '50-off',
      label: '50% Off',
      bgGradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      textColor: 'text-gray-900',
    },
    {
      key: '30-off',
      label: '30% Off',
      bgGradient: 'bg-gradient-to-br from-red-400 to-red-600',
      textColor: 'text-white',
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-16" id="offer">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 select-none">
        🔥 Choose Your Hot Offer
      </h1>

      {/* Countdown Timer */}
      <div className="mb-10 text-center text-lg font-semibold text-red-600 select-none">
        Offer ends in:&nbsp;
        <span className="font-mono">
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
        </span>
      </div>

      {/* Offer Boxes */}
      <div className="flex flex-col sm:flex-row gap-6 max-w-4xl w-full justify-center">
        {offers.map(({ key, label, bgGradient, textColor }) => (
          <motion.div
            key={key}
            onClick={() => navigate(`/offerpage/${key}`)}
            className={`${bgGradient} ${textColor} rounded-3xl shadow-lg cursor-pointer flex items-center justify-center p-8 sm:p-14 w-full sm:w-72 select-none`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          >
            <motion.h2
              className="text-6xl font-extrabold"
              animate={{ rotate: [0, 2.5, -2.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {label}
            </motion.h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
