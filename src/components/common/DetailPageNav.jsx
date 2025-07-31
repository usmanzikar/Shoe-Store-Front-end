import React, { useEffect, useState } from "react";
import detailnavimage from "../../assets/detailnavimg.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../utils/api"; // API call

export default function DetailPageNav() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchProductById(id);
        if (data && data._id) {
          setProduct(data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 px-4 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-28 px-4 text-center text-gray-500">
        Product not found.
      </div>
    );
  }

  return (
    <section
      className="relative h-64 w-full flex items-center justify-center text-center text-white mb-20"
      style={{
        backgroundImage: `url(${detailnavimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-10 left-4 z-20 bg-white text-black px-3 py-1 text-sm rounded hover:bg-orange-500 hover:text-white transition"
      >
        ← Back
      </button>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold">{product.name || "Product Details"}</h1>
        <p className="text-sm text-gray-200 mt-2">
          <Link
            to="/collection"
            className="hover:text-orange-500 transition"
          >
            Shop
          </Link>{" "}
          &gt; {product.name || "Product"}
        </p>
      </div>
    </section>
  );
}
