import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createOrder, clearCart as clearCartAPI } from "../utils/api";
import { clearCart as clearCartAction } from "../redux/slices/CartSlice";
import detailnavimage from "../assets/detailnavimg.jpg";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(2);
  const [showModal, setShowModal] = useState(false);

  const BASE_URL = "http://localhost:5000";
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/cart`, axiosConfig);
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Cart fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const estimatedDelivery = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );
  const shippingCost = subtotal > 5000 ? 0 : 300;
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax + shippingCost).toFixed(2);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    payment: "COD",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.address || !formData.city || !formData.postalCode || !formData.country || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.payment === "Card" && (!formData.cardNumber || !formData.expiry || !formData.cvv)) {
      toast.error("Please fill in all card details.");
      return;
    }

    const orderPayload = {
      customer: formData.name,
      shippingAddress: {
        fullName: formData.name,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },
      paymentMethod: formData.payment,
      paymentStatus: formData.payment === "COD" ? "Pending" : "Paid",
      products: cartItems.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount: total,
      estimatedDelivery,
      status: "Pending",
    };

    try {
      await createOrder(orderPayload);
      toast.success("Order placed successfully!");
      setActiveStep(3);
      setShowModal(true);

      try {
        await clearCartAPI();
        dispatch(clearCartAction());
      } catch (clearErr) {
        console.error("Cart clear failed:", clearErr);
        toast.error("Order placed, but cart not cleared. Please refresh.");
      }
    } catch (orderErr) {
      console.error("Order creation failed:", orderErr);
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading checkout...</div>;
  }

  const steps = ["Cart", "Checkout", "Order Confirmed"];

  return (
    <>
      {/* Banner */}
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
          <h1 className="text-3xl font-bold text-orange-600">Checkout Page</h1>
          <p className="text-sm text-gray-200 mt-2">
            <Link
              to="/collection"
              className="hover:text-orange-500 transition hover:cursor-pointer"
            >
              Shop
            </Link>{" "}
            &gt; Checkout
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="flex justify-center items-center gap-4 mt-6 px-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = activeStep === stepNumber;
          const isCompleted = activeStep > stepNumber;
          return (
            <div
              key={step}
              className="flex-1 flex flex-col items-center relative"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white z-10
                  ${
                    isActive
                      ? "bg-orange-500"
                      : isCompleted
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }
                `}
              >
                {stepNumber}
              </div>
              <span
                className={`mt-2 text-xs ${
                  isActive || isCompleted ? "font-semibold" : "text-gray-500"
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-1 -translate-x-1/2
                    ${activeStep > stepNumber ? "bg-green-500" : "bg-gray-300"}
                  `}
                  style={{ zIndex: 0 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Checkout Section */}
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Form */}
          <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">
              Shipping Details
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="address"
                placeholder="Shipping Address *"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              ></textarea>
              <input
                type="text"
                name="city"
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code *"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="country"
                placeholder="Country *"
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />

              {/* Payment Method */}
              <div>
                <label className="font-medium block mb-2">Payment Method</label>
                <select
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="Card">Card Payment</option>
                </select>
              </div>

              {formData.payment === "Card" && (
                <div className="space-y-3 mt-3">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                      className="w-1/2 border rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-1/2 border rounded px-3 py-2"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 border-b pb-3">
              Order Summary
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Estimated Delivery:{" "}
              <span className="font-semibold">{estimatedDelivery}</span>
            </p>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex justify-between mb-2 text-sm"
                >
                  <span>
                    {item.productId.name} x {item.quantity}
                  </span>
                  <span>
                    {(item.productId.price * item.quantity).toFixed(2)} PKR
                  </span>
                </div>
              ))
            )}

            <div className="flex justify-between mt-4 text-sm">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} PKR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (10%)</span>
              <span>{tax.toFixed(2)} PKR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `${shippingCost} PKR`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
              <span>Total</span>
              <span>{total.toFixed(2)} PKR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center animate-fadeIn">
            <h3 className="text-2xl font-bold text-green-600 mb-3">
              ✅ Order Confirmed!
            </h3>
            <p className="mb-6 text-gray-700">
              Thank you, <span className="font-semibold">{formData.name}</span>.
              Your order will be shipped soon.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/collection");
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-lg"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/ordersummary");
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
              >
                View Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
