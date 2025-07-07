import React, { useState } from "react";

export default function ProductImageGallery({ images }) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="md:w-1/2" style={{ width: '100%' }}>
      <div className="mb-4 rounded overflow-hidden border">
        <img
          src={selected}
          alt="Main Product"
          className="w-full h-80 md:h-[400px] object-cover transition duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex gap-3 justify-center">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Product thumb ${i}`}
            className={`w-20 h-20 object-cover border cursor-pointer rounded transition-transform duration-200 hover:scale-110 ${
              selected === img ? "border-orange-500" : "border-gray-300"
            }`}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>
    </div>
  );
}
