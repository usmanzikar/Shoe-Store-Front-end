import React from 'react';
import classNames from 'classnames';

export default function CategoryCard({ image, label, color }) {
  return (
    <div
      className={classNames(
        'relative w-[170px] h-[270px] rounded-full overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:scale-105 hover:border-4 hover:border-orange-500'
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-md font-semibold text-white"
        style={{ backgroundColor: color, fontFamily: 'Poppins' }}
      >
        {label}
      </div>
    </div>
  );
}
