import React from 'react';
import formalImg from '../../assets/formalc.jpg';
import bootsImg from '../../assets/bootsc.jpg';
import sneakersImg from '../../assets/sneakersc.jpg';
import loaferImg from '../../assets/loafersc.jpg';
import sportsImg from '../../assets/sportc.jpg';
import CategoryCard from './CategoryCard';

export default function CategorySection() {
  const categories = [
    { label: 'FORMAL', image: formalImg, color: 'pink' },
    { label: 'BOOTS', image: bootsImg, color: 'blue' },
    { label: 'SNEAKERS', image: sneakersImg, color: 'orange' },
    { label: 'LOAFERS', image: loaferImg, color: 'purple' },
    { label: 'SPORTS', image: sportsImg, color: 'red' },
  ];

  return (
    <section className="py-16 bg-white text-center" id='catagoryhome'>
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Product Category</h2>
      <p className="text-lg text-gray-600 mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt<br />
        ut labore et dolore magna aliqua.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            image={category.image}
            label={category.label}
            color={category.color}
          />
        ))}
      </div>
    </section>
  );
}
