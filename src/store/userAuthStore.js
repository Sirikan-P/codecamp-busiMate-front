import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const userAuthStore = create((set) => ({
  authUser: null,
  isRegister: false,
  isLogin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  patients: [],
  userAddress: [],
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("res ====", res)
      set({ authUser: res.data });

      console.log(res);
    } catch (error) {
      // console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    set({ isRegister: true });
    try {
      const res = await axiosInstance.post("/auth/register-user", data);
      localStorage.setItem("token", res.data.token);
      toast.success("Account created successfully");
      set({ authUser: res.data.result });
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
      const res = await axiosInstance.post("/auth/login-user", data);
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in successfully");
      set({ authUser: res.data.userData });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally { set({ isLogin: false });
    }
  },

  fetchGetPatients: async () => {
    try {
      const res = await axiosInstance.get("/user/patient");
      set({ patients: res.data.patients });
    } catch (error) {
      console.log(error);
    }
  },
  UpdateImageProfileAuthUser: async (formData) => {
    try {
      const res = await axiosInstance.post("/user/me/profile/upload", formData);
      set({ patients: res.data });
    } catch (error) {
      console.log(error);
    }
  },

  fetchGetUserAddress: async () => {
    try {
      const res = await axiosInstance.get("/user/useraddress");
      set({ userAddress: res.data });
    } catch (error) {
      console.log(error);
    }
  }
}));


