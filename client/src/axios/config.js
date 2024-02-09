import axios from "axios";

const taskFetch = axios.create({
  baseURL: "http://127.0.0.1:3500",
  headers: {
    "Content-Type": "application/json",
  },
});

export default taskFetch;
