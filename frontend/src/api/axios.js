import axios from "axios";

const API = axios.create({
  baseURL: "https://eldereaseai.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("Token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Headers:", config.headers);

  return config;
});

export default API;