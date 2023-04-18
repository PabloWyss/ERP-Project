import axios from "axios";

const callAPI = axios.create({
  baseURL: "http://127.0.0.1:8001/backend/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default callAPI;

