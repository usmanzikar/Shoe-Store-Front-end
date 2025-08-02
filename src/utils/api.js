import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL

// Create Order
export const createOrder = (orderData) => {
  return axios.post(`${API_BASE_URL}/orders`, orderData);
};

// Get Orders
export const getOrders = () => {
  return axios.get(`${API_BASE_URL}/orders`);
};

// ✅ Update Order Status (Cancel, Ship, etc.)
export const updateOrderStatus = (orderId, updateData) => {
  return axios.patch(`${API_BASE_URL}/orders/${orderId}`, updateData);
};

// Fetch Products
export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE_URL}/products`);
  return res.data;
};

// Fetch Single Product
export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/products/${id}`);
  return res.data;
};

// clear cart api when order has been placed successfully 
export const clearCart = () => {
  const token = localStorage.getItem("token"); // ✅ Always fetch latest token
  return axios.delete(`${API_BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
};

