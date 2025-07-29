import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL

export const createOrder = (orderData) => {
  return axios.post(`${API_BASE_URL}/orders`, orderData);
};

export const getOrders = () => {
  return axios.get(`${API_BASE_URL}/orders`);
};
