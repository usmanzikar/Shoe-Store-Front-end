import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrders, updateOrderStatus } from "../utils/api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Cancel order with backend check
 const handleCancelOrder = async (orderId) => {
  if (!window.confirm("Are you sure you want to cancel this order?")) return;

  try {
    // Check latest status from backend
    const res = await getOrders();
    const currentOrder = res.data.find((o) => o._id === orderId);

    if (!currentOrder) {
      alert("Order not found.");
      return;
    }

    if (currentOrder.status !== "Pending") {
      alert(`Order cannot be cancelled. Current status: ${currentOrder.status}`);
      return;
    }

    // Cancel order in DB
    await updateOrderStatus(orderId, { status: "Cancelled" });

    alert("Order cancelled successfully.");
    fetchOrders(); // Refresh after cancellation
  } catch (err) {
    console.error("Cancel failed:", err);
    alert("Failed to cancel order. Please try again.");
  }
};

  const trackingSteps = ["Pending", "Shipped", "Delivered"];
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          {loading ? "Loading profile..." : "Redirecting..."}
        </p>
      </div>
    );
  }

  const runningOrders = orders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled"
  );
  const completedOrders = orders.filter(
    (o) => o.status === "Delivered" || o.status === "Cancelled"
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 mt-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
         {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow"
        >
          ← Back
        </button>
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

        {/* Running Orders */}
        {runningOrders.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">
              Current Running Orders
            </h3>
            <div className="space-y-6">
              {runningOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  trackingSteps={trackingSteps}
                  statusColors={statusColors}
                  onCancel={handleCancelOrder}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Orders */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">
            Order History
          </h3>
          {completedOrders.length === 0 ? (
            <p className="text-gray-500">No completed orders yet.</p>
          ) : (
            <div className="space-y-6">
              {completedOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  trackingSteps={trackingSteps}
                  statusColors={statusColors}
                  onCancel={handleCancelOrder}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, trackingSteps, statusColors, onCancel }) {
  const createdTime = new Date(order.createdAt);
  const now = new Date();
  const diffHours = (now - createdTime) / (1000 * 60 * 60);
  const canCancel = order.status === "Pending" && diffHours <= 2;

  return (
    <div className="border rounded-lg p-5 bg-gray-50 shadow-sm">
      {/* Order Info */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="font-bold text-lg text-gray-800">
            Order ID: {order.orderId}
          </h4>
          <p className="text-gray-500 text-sm">
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Payment:{" "}
            <span
              className={`font-medium ${
                order.paymentStatus === "Paid"
                  ? "text-green-600"
                  : order.paymentStatus === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {order.paymentStatus}
            </span>
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
          const isActive = trackingSteps.indexOf(order.status) >= index;
          return (
            <div key={step} className="flex flex-col items-center flex-1">
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
                  isActive ? "text-orange-600 font-semibold" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Items with Size & Color */}
      <div className="border-t pt-3 space-y-2">
        {order.products.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between text-sm text-gray-700"
          >
            <div>
              <span className="block font-medium">
                {item.name} x {item.quantity}
              </span>
              {item.size && (
                <span className="text-xs text-gray-500">Size: {item.size}</span>
              )}
              {item.color && (
                <span className="text-xs text-gray-500 ml-2">
                  Color: {item.color}
                </span>
              )}
            </div>
            <span>{item.price} PKR</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-3 font-semibold text-gray-800">
        <span>Total</span>
        <span>{order.totalAmount} PKR</span>
      </div>

      {/* Cancel Button */}
     {order.status === "Pending" && (
        <div className="mt-4">
          <button
            onClick={() => onCancel(order._id)}
            className="px-4 py-2 rounded-lg text-white transition w-full bg-red-500 hover:bg-red-600"
          >
            Cancel Order
          </button>
        </div>
      )}
    </div>
  );
}
