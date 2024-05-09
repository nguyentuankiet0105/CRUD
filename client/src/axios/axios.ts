import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
