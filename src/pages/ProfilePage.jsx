import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Dummy Orders (still here for now)
const dummyOrders = [
  {
    id: "ORD-001",
    date: "2025-07-25",
    total: 7500,
    status: "Pending",
    items: [
      { name: "Nike Air Max", quantity: 1, price: 5000 },
      { name: "Adidas Sneakers", quantity: 1, price: 2500 },
    ],
  },
  {
    id: "ORD-002",
    date: "2025-07-20",
    total: 3500,
    status: "Shipped",
    items: [{ name: "Puma Casual", quantity: 1, price: 3500 }],
  },
  {
    id: "ORD-003",
    date: "2025-07-10",
    total: 2200,
    status: "Delivered",
    items: [{ name: "Converse Classic", quantity: 1, price: 2200 }],
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout(); // clears token + user in context
    navigate("/"); // redirect home
  };

  const trackingSteps = ["Pending", "Shipped", "Delivered"];
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
  };

  // Loading state if user not loaded yet
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 mt-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow w-full sm:w-auto"
          >
            Logout
          </button>
        </div>

        {/* Orders Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">
            My Orders
          </h3>

          {dummyOrders.length === 0 ? (
            <p className="text-gray-500">You have no orders yet.</p>
          ) : (
            <div className="space-y-6">
              {dummyOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-5 bg-gray-50 shadow-sm"
                >
                  {/* Order Info */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">
                        Order ID: {order.id}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Date: {order.date}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Tracking Progress Bar */}
                  <div className="relative flex items-center justify-between px-2 mb-6">
                    {trackingSteps.map((step, index) => {
                      const isActive =
                        trackingSteps.indexOf(order.status) >= index;
                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center flex-1"
                        >
                          {index > 0 && (
                            <div
                              className={`absolute top-4 h-1 w-full -z-10 ${
                                trackingSteps.indexOf(order.status) >= index
                                  ? "bg-orange-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          )}
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${
                              isActive ? "bg-orange-500" : "bg-gray-300"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span
                            className={`mt-2 text-xs ${
                              isActive
                                ? "text-orange-600 font-semibold"
                                : "text-gray-400"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Items */}
                  <div className="border-t pt-3 space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm text-gray-700"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>{item.price} PKR</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-3 font-semibold text-gray-800">
                    <span>Total</span>
                    <span>{order.total} PKR</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
