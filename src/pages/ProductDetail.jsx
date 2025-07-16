// src/pages/ProductDetail.jsx
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import allProductsCombined from "../components/dummyData/allProductsCombined";
import ProductImageGallery from "../components/productDetail/ProductImageGallery";
import RelatedProducts from "../components/productDetail/RelatedProducts";
import Footer from "../components/footer/Footer";
import DetailPageNav from "../components/common/DetailPageNav";
import { FaShippingFast, FaUndoAlt, FaWhatsapp } from "react-icons/fa";
import OtherProductDetail from "../components/productDetail/OtherProductDetails";

export default function ProductDetail() {
  const { id } = useParams();
  const product = allProductsCombined.find((p) => p.id === parseInt(id));

  // hot tags function
  const salesMessages = [
    "🔥 20 items sold in the last 24 hours",
    "⚡ 9 items sold in the last 9 hours",
  ];
  const [activeMessage, setActiveMessage] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 260, behavior: "auto" });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessage((prev) => (prev + 1) % salesMessages.length);
    }, 9000); // Change every 9 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  if (!product) {
    return (
      <div className="pt-28 px-4 text-center text-gray-500">
        Product not found.
      </div>
    );
  }
  //quantity usestate
  const [quantity, setQuantity] = useState(1);

  // Handler functions
  const increaseQuantity = () => {
    if (quantity < product.stocks) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const totalPrice = product.price * quantity;


  return (
    <>
      <section className="bg-white min-h-screen pt-20  ">
        <DetailPageNav />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-1">
          <ProductImageGallery images={product.image} />

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-red-500 font-semibold animate-pulse">
              {salesMessages[activeMessage]}
            </p>

            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-gray-600 text-sm">{product.detaildesc}</p>
            <p className="text-orange-600 text-lg font-semibold">
              PKR {totalPrice.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              (PKR {product.price.toLocaleString()} per item)
            </p>

            <p className="text-gray-600 text-sm">
              Product Type: {product.category}
            </p>
            <p className="inline-block bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md animate-pulse w-fit">
              ⏳ Hurry! Only {product.stocks} left in stock!
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Available Color:
              </p>
              <div className="flex gap-3">
                {(() => {
                  const colorMap = {
                    brown: "#8B4513",
                    white: "#FFFFFF",
                    black: "#000000",
                  };

                  const bgColor =
                    colorMap[product.color.toLowerCase()] || "#ccc"; // fallback

                  return (
                    <span
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: bgColor }}
                      title={product.color}
                    ></span>
                  );
                })()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-4 w-full">
              {/* Quantity Controls */}
              <div className="flex items-center justify-center gap-2 bg-orange-500 px-4 py-2 rounded-md shadow-sm w-full">
                <button
                  onClick={decreaseQuantity}
                  className="bg-orange-200 text-gray-800 px-2 py-1 rounded hover:bg-orange-300 transition w-8"
                >
                  −
                </button>
                <span className="px-3 py-1 bg-white  border rounded-md text-orange-500 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="bg-orange-200 text-gray-800 px-2 py-1 rounded hover:bg-orange-300 transition w-8"
                >
                  ＋
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition w-full">
                🛒 Add to Cart
              </button>
            </div>
            <button className="border border-orange-500 text-orange-500 py-2 px-4 rounded hover:bg-orange-500 hover:text-white transition">
              ⚡ Shop Now
            </button>
            {/* Estimated Delivery block */}
            <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md w-full">
              <div className="flex items-center gap-3">
                <FaShippingFast className="text-green-600 text-xl" />
                <span className="text-gray-800 text-sm md:text-base">
                  Estimated Delivery: <strong>5–7 Days</strong> from order date
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaUndoAlt className="text-blue-600 text-xl" />
                <span className="text-gray-800 text-sm md:text-base">
                  Free Shipping & Returns: On orders above{" "}
                  <strong>2000 PKR</strong>
                </span>
              </div>
            </div>
            {/* query contact block  */}
            <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md w-full">
              <span className="text-gray-800 text-sm md:text-base">
                Let us know if you have any query !
              </span>
              <a
                href="https://wa.me/923038960300?text=Hi%20there!%20I%20have%20a%20question%20about%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm md:text-base rounded-md shadow hover:bg-green-600 transition"
              >
                <FaWhatsapp className="text-xl" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <OtherProductDetail />

        <div className="mt-16 mb-20">
          <RelatedProducts
            currentProduct={product}
            products={allProductsCombined}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
