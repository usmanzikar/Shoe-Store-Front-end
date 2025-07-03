import React from 'react';
import walk1 from '../../assets/ln1.jpg';
import walk2 from '../../assets/ln2.jpg';
import walk3 from '../../assets/ln3.jpg';
import LazyImage from '../lazy/LazyMotion';

const articles = [
  {
    title: "Why Most People Prefer Boots for Walking",
    description: "Discover how boots offer comfort, durability, and style for everyday use and outdoor adventures.",
    image: walk1,
  },
  {
    title: "Sneakers vs Loafers: What’s Best for You?",
    description: "Understand the key differences between these styles and which fits your lifestyle better.",
    image: walk2,
  },
  {
    title: "Top 5 Walking Shoes in 2025",
    description: "Check out our expert picks for the best walking shoes that combine comfort and trend.",
    image: walk3,
  },
];

export default function LatestNewsSection() {
  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-12 text-gray-900">Latest News</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <LazyImage
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
              skeletonClass="w-full h-48"
            />
            <div className="p-5 text-left">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{article.description}</p>
              <a
                href="#"
                className="text-orange-500 font-medium hover:underline"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
