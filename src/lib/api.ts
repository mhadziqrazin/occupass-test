import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Accept": "application/json",
  },
});

export default api;

