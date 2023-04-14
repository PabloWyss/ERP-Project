import axios from "axios";

const callAPI = axios.create({
  baseURL: "https://motion.propulsion-home.ch/backend/api/auth/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default callAPI;
