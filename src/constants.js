export const API_URL = import.meta.env.VITE_API_URL;
export const token = localStorage.getItem("userToken");
export const sendTokenHeader = {
 headers: {
  Authorization: `Bearer ${token}`,
 },
};

export const currency = "$";
