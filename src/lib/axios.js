import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8877/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userToken");
    const driverToken = localStorage.getItem("driverToken");

    if (
      config.url.includes("/messages-user") ||
      config.url.includes("/auth/login-user") ||
      config.url.includes("/auth/register-user") ||
      config.url.includes("/auth/update-userprofile") ||
      config.url.includes("/user/booking")
    ) {
      if (userToken) {
        config.headers["Authorization"] = `Bearer ${userToken}`;
      }
    } else if (
      config.url.includes("/messages-driver") ||
      config.url.includes("/auth/login-driver") ||
      config.url.includes("/auth/register-driver") ||
      config.url.includes("/auth/update-driverprofile") ||
      config.url.includes("/driver/booking")
    ) {
      if (driverToken) {
        config.headers["Authorization"] = `Bearer ${driverToken}`;
      }
    } else if (config.url === "/auth/check") {
      config.headers["Authorization"] = `Bearer ${userToken || driverToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInstance };