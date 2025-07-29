import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../utils/api";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",        // NEW
    postalCode: "",  // NEW
    country: "",     // NEW
    phone: "",
    email: "",
    payment: "COD",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [activeStep, setActiveStep] = useState(2);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.address || !formData.city || !formData.postalCode || !formData.country || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    if (formData.payment === "Card" && (!formData.cardNumber || !formData.expiry || !formData.cvv)) {
      alert("Please fill in all card details.");
      return;
    }

    const orderPayload = {
  orderId: `ORD-${Math.floor(Math.random() * 10000)}`, // temporary until auto-gen works
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
  products: cartItems.map(item => ({
    productId: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  })),
  totalAmount: total,
  status: "Pending"
};


    try {
      await createOrder(orderPayload);
      setShowModal(true);
      setActiveStep(3);
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const steps = ["Cart", "Checkout", "Shipped"];

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 mt-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8 relative">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = activeStep === stepNumber;
              const isCompleted = activeStep > stepNumber;
              return (
                <div key={step} className="flex-1 flex flex-col items-center relative">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-white z-10
                      ${isActive ? "bg-orange-500" : isCompleted ? "bg-green-500" : "bg-gray-400"}
                    `}
                  >
                    {stepNumber}
                  </div>
                  <span className={`mt-2 text-sm select-none ${isActive || isCompleted ? "font-semibold" : "text-gray-500"}`}>
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

          <div className="grid md:grid-cols-3 gap-6">
            {/* Form */}
            <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 border-b pb-3">Shipping Details</h2>
              <div className="space-y-4">
                <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                <textarea name="address" placeholder="Shipping Address *" value={formData.address} onChange={handleChange} className="w-full border rounded px-3 py-2"></textarea>
                
                {/* NEW FIELDS */}
                <input type="text" name="city" placeholder="City *" value={formData.city} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                <input type="text" name="postalCode" placeholder="Postal Code *" value={formData.postalCode} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                <input type="text" name="country" placeholder="Country *" value={formData.country} onChange={handleChange} className="w-full border rounded px-3 py-2" />

                <input type="text" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                <input type="email" name="email" placeholder="Email (Optional)" value={formData.email} onChange={handleChange} className="w-full border rounded px-3 py-2" />

                <div>
                  <label className="font-medium block mb-2">Payment Method</label>
                  <select name="payment" value={formData.payment} onChange={handleChange} className="w-full border rounded px-3 py-2">
                    <option value="COD">Cash on Delivery</option>
                    <option value="Card">Card Payment</option>
                  </select>
                </div>

                {formData.payment === "Card" && (
                  <div className="space-y-3 mt-3">
                    <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                    <div className="flex gap-2">
                      <input type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} className="w-1/2 border rounded px-3 py-2" />
                      <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} className="w-1/2 border rounded px-3 py-2" />
                    </div>
                  </div>
                )}

                <button onClick={handlePlaceOrder} className="w-full mt-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
                  Place Order
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 border-b pb-3">Order Summary</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} PKR</span>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} PKR</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>{tax.toFixed(2)} PKR</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
                <span>Total</span>
                <span>{total.toFixed(2)} PKR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center animate-fadeIn">
            <h3 className="text-2xl font-bold text-green-600 mb-3">✅ Order Confirmed!</h3>
            <p className="mb-6 text-gray-700">
              Thank you, <span className="font-semibold">{formData.name}</span>. Your order will be shipped soon.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => { setShowModal(false); navigate("/collection"); }} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-lg">Continue Shopping</button>
              <button onClick={() => { setShowModal(false); navigate("/"); }} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium transition">View Summary</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
