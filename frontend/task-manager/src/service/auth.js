// src/api/auth.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });
  return res.data; // expected to return { token, user }
};

export const register = async (username, password) => {
  const res = await axios.post(`${API_URL}/register`, { username, password });
  return res.data; // expected to return { token, user }
};
