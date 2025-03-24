import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8877/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userToken");
    const driverToken = localStorage.getItem("driverToken");
    const adminToken = localStorage.getItem("adminToken");

    // User-specific routes
    if (
      config.url.includes("/messages-user") ||
      config.url.includes("/auth/login-user") ||
      config.url.includes("/auth/register-user") ||
      config.url.includes("/auth/update-userprofile") ||
      config.url.includes("/user/booking") ||
      config.url.includes("/auth/check/user") ||
      config.url.includes("/user/patient") ||
      config.url.includes("/user/useraddress") ||
      config.url.includes("/user/booking/create") 
    ) {
      if (userToken) {
        config.headers["Authorization"] = `Bearer ${userToken}`;
      }
    }
    // Driver-specific routes
    else if (
      config.url.includes("/messages-driver") ||
      config.url.includes("/auth/login-driver") ||
      config.url.includes("/auth/register-driver") ||
      config.url.includes("/auth/update-driverprofile") ||
      config.url.includes("/driver/booking") ||
      config.url.includes("/auth/check/driver")
    ) {
      if (driverToken) {
        config.headers["Authorization"] = `Bearer ${driverToken}`;
      }
    }
    // Admin-specific routes
    else if (
      config.url.includes("/auth/login-admin") ||
      config.url.includes("/auth/check/admin")
    ) {
      if (adminToken) {
        config.headers["Authorization"] = `Bearer ${adminToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInstance };
