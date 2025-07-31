import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import detailnavimage from "../assets/detailnavimg.jpg";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get auth token from localStorage or context (adjust this part to your auth setup)
  const token = localStorage.getItem("token");

  // Axios config with Authorization header
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch cart on mount
useEffect(() => {
  async function fetchCart() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });

      console.log("Cart API response:", response.data);

      setCartItems(response.data.items || response.data.cart?.items || []);
    } catch (error) {
      toast.error("Failed to load cart");
      console.error("Cart fetch error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }
  fetchCart();
}, []);


  // Update quantity (calls API and updates state)
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.post(
        "/api/cart/item",
        { productId, quantity: newQuantity },
        axiosConfig
      );
      setCartItems(response.data.items);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  // Remove item (calls API and updates state)
  const removeItem = async (productId) => {
    try {
      const response = await axios.delete(`/api/cart/item/${productId}`, axiosConfig);
      setCartItems(response.data.items);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.productId.price || 0) * item.quantity,
    0
  );
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  if (loading) {
    return <div className="pt-28 text-center">Loading cart...</div>;
  }

  return (
    <>
      {/* Top section with banner */}
      <section
        className="relative h-64 w-full flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${detailnavimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "60px",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-4 z-20 bg-white text-black px-3 py-1 text-sm rounded hover:bg-orange-500 hover:text-white transition"
        >
          ← Back
        </button>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">Cart Page</h1>
          <p className="text-sm text-gray-200 mt-2">
            <Link
              to="/collection"
              className="hover:text-orange-500 transition hover:cursor-pointer"
            >
              Shop
            </Link>{" "}
            &gt; Products
          </p>
        </div>
      </section>

      <div className="min-h-screen px-4 py-10 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-lg">Your cart is empty.</p>
            <Link
              to="/collection"
              className="text-orange-500 hover:underline mt-2 block"
            >
              Go back to shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = item.productId; // populated product data
                return (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 p-4 bg-white shadow rounded-lg"
                  >
                    <img
                      src={
                        Array.isArray(product.images) && product.images.length > 0
                          ? product.images[0]
                          : "https://via.placeholder.com/96"
                      }
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{product.name}</h4>
                      <p className="text-gray-500">{product.price} PKR</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(product._id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(product._id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} PKR</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%)</span>
                <span>{tax.toFixed(2)} PKR</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>{total.toFixed(2)} PKR</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
