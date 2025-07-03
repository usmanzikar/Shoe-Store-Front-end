import React, { useState } from "react";

export default function FilterSidebar({ filters, setFilters, onClose }) {
  const sizes = ["40", "41", "42", "43", "44"];
  const colors = ["Black", "White", "Brown", "Blue"];
  const [selectedPrice, setSelectedPrice] = useState(5000);

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
    setFilters({ ...filters, priceMax: value });
  };

  return (
    <aside className="w-full md:w-[250px] bg-orange-100 p-5 rounded-lg shadow">

      {/* filter toogle menue onclose event */}
      {onClose && (
        <div className="flex justify-end md:hidden">
          <button
            onClick={onClose}
            className="text-orange-600 font-bold mb-2 text-sm hover:underline"
          >
            ✖ Close
          </button>
        </div>
      )}

      <h3 className="text-xl font-bold mb-4 text-orange-600">Filters</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Category</h4>
        {["Sneakers", "Boots", "Sandals", "Loafers"].map((category) => (
          <label
            key={category}
            className="block mb-1 hover:text-orange-500 transition cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={() => setFilters({ ...filters, category })}
              className="mr-2"
            />
            {category}
          </label>
        ))}
        {/* "None" option to reset the color filter */}
        <label className="block mb-1 hover:text-orange-500 transition cursor-pointer">
          <input
            type="radio"
            name="category"
            value=""
            checked={filters.category === ""}
            onChange={() => setFilters({ ...filters, category: "" })}
            className="mr-2"
          />
          None
        </label>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Color</h4>

        {colors.map((color) => (
          <label
            key={color}
            className="block mb-1 hover:text-orange-500 transition cursor-pointer"
          >
            <input
              type="radio"
              name="color"
              value={color}
              checked={filters.color === color}
              onChange={() => setFilters({ ...filters, color })}
              className="mr-2"
            />
            {color}
          </label>
        ))}
        {/* "None" option to reset the color filter */}
        <label className="block mb-1 hover:text-orange-500 transition cursor-pointer">
          <input
            type="radio"
            name="color"
            value=""
            checked={filters.color === ""}
            onChange={() => setFilters({ ...filters, color: "" })}
            className="mr-2"
          />
          None
        </label>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Size</h4>
        {sizes.map((size) => (
          <p
            key={size}
            className="block mb-1 hover:text-orange-500 transition cursor-pointer"
          >
            <input
              type="radio"
              name="size"
              value={size}
              checked={filters.size === size}
              onChange={() => {
                console.log("Setting size filter to:", size);
                setFilters({ ...filters, size: size });
              }}
              className="mr-2"
            />
            {size}
          </p>
        ))}
        {/* "None" option to reset the color filter */}
        <label className="block mb-1 hover:text-orange-500 transition cursor-pointer">
          <input
            type="radio"
            name="size"
            value=""
            checked={filters.size === ""}
            onChange={() => setFilters({ ...filters, size: "" })}
            className="mr-2"
          />
          None
        </label>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Max Price (PKR)</h4>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={selectedPrice}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="w-full"
        />
        <p className="text-sm mt-1">Up to PKR {selectedPrice}</p>
      </div>
      <button
        onClick={() => {
          setSelectedPrice(5000);
          setFilters({
            color: "",
            size: "",
            priceMax: 5000,
          });
        }}
        className="mt-6 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition flex items-center justify-center gap-2"
      >
        🔄 Reset Filters
      </button>
    </aside>
  );
}
