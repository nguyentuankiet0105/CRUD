import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: baseURL,
  timeout: 2000,
  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default api;
