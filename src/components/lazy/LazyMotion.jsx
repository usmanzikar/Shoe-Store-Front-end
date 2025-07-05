// src/components/common/LazyImage.jsx
import React, { useState } from 'react';
import useLazyImage from '../../hooks/ImageLazy';

export default function LazyImage({ src, alt = '', className = '', skeletonClass = '' }) {
  const { imgRef, isVisible, src: loadedSrc } = useLazyImage(src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {/* Skeleton loader */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse rounded-md ${skeletonClass}`}
        ></div>
      )}

      <img
        ref={imgRef}
        src={loadedSrc || 'Image not Available'}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ease-in-out 
          ${isVisible && isLoaded ? 'opacity-100' : 'opacity-0'} 
          ${className}`}
      />
    </div>
  );
}
