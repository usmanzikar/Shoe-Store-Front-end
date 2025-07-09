// src/components/common/LazyImage.jsx
import React, { useEffect, useState } from 'react';
import useLazyImage from '../../hooks/ImageLazy';

export default function LazyImage({
  src,
  alt = '',
  className = '',
  skeletonClass = 'h-[250px]',
}) {
  const { imgRef, isVisible, src: loadedSrc } = useLazyImage(src);
  const [isLoaded, setIsLoaded] = useState(false);

  // 🧠 Preload image when it becomes visible
  useEffect(() => {
    if (isVisible && loadedSrc) {
      const img = new Image();
      img.src = loadedSrc;
    }
  }, [isVisible, loadedSrc]);

  return (
    <div className={`relative overflow-hidden rounded-md ${skeletonClass}`}>
      {/* Skeleton Loader */}
      <div
        className={`absolute inset-0  transition-opacity duration-100 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={loadedSrc || 'Image not Available'}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`
          w-full h-full object-cover rounded-md transition-opacity duration-500 ease-in-out 
          ${isVisible && isLoaded ? 'opacity-100' : 'opacity-0'} 
          ${className}
        `}
      />
    </div>
  );
}
