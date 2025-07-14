// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", //api en tus rutas backend
  withCredentials: true, // cookies para autenticación
});

export default api;
