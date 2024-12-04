import axios from "axios";

export const url = "http://localhost:5000/api";
// export const url = "https://car-details-backend.vercel.app/api";


const api = axios.create({
  baseURL: url
});

export default api;
