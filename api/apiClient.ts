import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.100.221:8000/api", // your Laravel server
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;