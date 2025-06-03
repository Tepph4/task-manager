// utils/auth.js
import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token); // ✅ ใช้แบบ named import
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
};

