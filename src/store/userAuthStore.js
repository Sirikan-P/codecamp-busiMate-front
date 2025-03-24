import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const userAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isRegister: false,
      isLogin: false,
      isUpdatingProfile: false,
      isCheckingAuth: false,
      patients: [],
  userAddress: [],

      initializeAuth: async () => {
        const persistedState = localStorage.getItem("user-auth-storage");
        const token = localStorage.getItem("userToken");
        if (persistedState && token) {
          const { state } = JSON.parse(persistedState);
          if (state.authUser) {
            set({ authUser: state.authUser });
            return true;
          }
        }
        return false;
      },

      checkAuth: async () => {
        const { authUser } = get();
        const token = localStorage.getItem("userToken");
        if (!token) {
          set({ authUser: null, isCheckingAuth: false });
          return false;
        }

        set({ isCheckingAuth: true });
        try {
          const res = await axiosInstance.get("/auth/check/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("checkAuth response:", res.data);
          if (res.data.result?.role === "user") {
            set({ authUser: res.data.result, isCheckingAuth: false });
            return true;
          } else {
            set({ authUser: null, isCheckingAuth: false });
            localStorage.removeItem("userToken");
            toast.error("Invalid role. Please log in again.");
            return false;
          }
        } catch (error) {
          console.error("Error in checkAuth:", error.response || error);
          if (error.response?.status === 401) {
            localStorage.removeItem("userToken");
            set({ authUser: null, isCheckingAuth: false });
            toast.error("Session expired. Please log in again.");
            return false;
          }
          set({ isCheckingAuth: false });
          if (authUser) return true;
          return false;
        }
      },

      register: async (data) => {
        set({ isRegister: true });
        try {
          const res = await axiosInstance.post("/auth/register-user", data);
          localStorage.setItem("userToken", res.data.token);
          set({ authUser: res.data.result });
          toast.success("Account created successfully");
          return true;
        } catch (error) {
          toast.error(error.response?.data?.message || "Registration failed");
          return false;
        } finally {
          set({ isRegister: false });
        }
      },

      login: async (data) => {
        set({ isLogin: true });
        try {
          const res = await axiosInstance.post("/auth/login-user", data);
          localStorage.setItem("userToken", res.data.token);
          set({ authUser: res.data.userData });
          toast.success("Logged in successfully");
          return true;
        } catch (error) {
          toast.error(error.response?.data?.message || "Login failed");
          return false;
        } finally {
          set({ isLogin: false });
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
      },

      logout: async () => {
        localStorage.removeItem("userToken");
        set({ authUser: null });
        get().disconnectSocket();
        toast.success("Logged out successfully");
      },

      updateProfile: async (file) => {
        set({ isUpdatingProfile: true });
        try {
          const formData = new FormData();
          if (!(file instanceof File)) {
            throw new Error("Invalid file provided for upload");
          }
          formData.append("profilePic", file);

          const token = localStorage.getItem("userToken");
          if (!token) {
            throw new Error("No user token found. Please log in again.");
          }

          const res = await axiosInstance.put(
            "/auth/update-userprofile",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ authUser: res.data.data });
          toast.success("Profile updated successfully");
          return res.data.data;
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to update profile"
          );
          throw error;
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    }),
    {
      name: "user-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);
