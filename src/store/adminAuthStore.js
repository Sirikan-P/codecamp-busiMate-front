import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const adminAuthStore = create(
  persist(
    (set, get) => ({
      authAdmin: null,
      isLogin: false,
      isCheckingAuthAdmin: false,

      checkAuthAdmin: async () => {
        const { authAdmin } = get();
        const token = localStorage.getItem("adminToken");
        if (!token) {
          set({ authAdmin: null, isCheckingAuthAdmin: false });
          return false;
        }

        set({ isCheckingAuthAdmin: true });
        try {
          const res = await axiosInstance.get("/auth/admin/check", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.result?.role === "admin") {
            set({ authAdmin: res.data.result, isCheckingAuthAdmin: false });
            return true;
          } else {
            set({ authAdmin: null, isCheckingAuthAdmin: false });
            localStorage.removeItem("adminToken");
            toast.error("Invalid admin role. Please log in again.");
            return false;
          }
        } catch (error) {
          console.error("Error in admin checkAuth:", error.response || error);
          if (error.response?.status === 401) {
            localStorage.removeItem("adminToken");
            set({ authAdmin: null, isCheckingAuthAdmin: false });
            toast.error("Admin session expired. Please log in again.");
            return false;
          }
          set({ isCheckingAuthAdmin: false });
          if (authAdmin) return true;
          return false;
        }
      },

      login: async (data) => {
        set({ isLogin: true });
        try {
          const res = await axiosInstance.post("/auth/login-admin", data);
          localStorage.setItem("adminToken", res.data.token);
          set({ authAdmin: res.data.adminData });
          toast.success("Admin logged in successfully");
          return true;
        } catch (error) {
          toast.error(error.response?.data?.message || "Admin login failed");
          return false;
        } finally {
          set({ isLogin: false });
        }
      },

      logout: async () => {
        localStorage.removeItem("adminToken");
        set({ authAdmin: null });
        toast.success("Admin logged out successfully");
      },
    }),
    {
      name: "admin-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        authAdmin: state.authAdmin,
      }),
    }
  )
);
