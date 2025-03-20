import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const driverAuthStore = create((set) => ({
  authDriver: null,
  isRegister: false,
  isLogin: false,
  isUpdatingProfile: false,
  isCheckingAuthDriver: true,
  checkAuthDriver: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authDriver: res.data });
    } catch (error) {
      // console.log(error);
      set({ authDriver: null });
    } finally {
      set({ isCheckingAuthDriver: false });
    }
  },

  register: async (data) => {
    set({ isRegister: true });
    try {
      const res = await axiosInstance.post("/auth/register-driver", data);
      localStorage.setItem("token", res.data.token);
      toast.success("Account created successfully");
      set({ authDriver: res.data.result });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isRegister: false });
    }
  },

  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/auth/login-driver", data);
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in successfully");
      set({ authDriver: res.data.userData });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isLogin: false });
    }
  },
}));
