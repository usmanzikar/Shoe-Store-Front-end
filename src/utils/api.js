import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL

export const createOrder = (orderData) => {
  return axios.post(`${API_BASE_URL}/orders`, orderData);
};

export const getOrders = () => {
  return axios.get(`${API_BASE_URL}/orders`);
};

export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE_URL}/products`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/products/${id}`);
  return res.data;
};
