import axios from "axios";

import { useAuthStore } from "@/stores/auth";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  function (config) {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("ERROR", JSON.stringify(error, null, 2));

    if (error.code === "ERR_NETWORK") {
      console.log("Service unavailable", "Please try again later.");

      return;
    }

    if (error.response.status === 401) {
      useAuthStore.getState().clearCredentials();

      return;
    }

    if (error.response.data.message) {
      console.log("Ops.", error.response.data.message);
    } else {
      console.log("Ops.", error.message);
    }

    return Promise.reject(error);
  }
);
