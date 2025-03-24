import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const driverAuthStore = create(
  persist(
    (set, get) => ({
      authDriver: null,
      isRegister: false,
      isLogin: false,
      isUpdatingProfile: false,
      isCheckingAuthDriver: false,

      initializeAuth: async () => {
        const persistedState = localStorage.getItem("driver-auth-storage");
        const token = localStorage.getItem("driverToken");
        if (persistedState && token) {
          const { state } = JSON.parse(persistedState);
          if (state.authDriver) {
            set({ authDriver: state.authDriver });
            return true;
          }
        }
        return false;
      },

      checkAuthDriver: async () => {
        const { authDriver } = get();
        const token = localStorage.getItem("driverToken");
        if (!token) {
          set({ authDriver: null, isCheckingAuthDriver: false });
          return false;
        }

        set({ isCheckingAuthDriver: true });
        try {
          const res = await axiosInstance.get("/auth/check/driver", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("checkAuthDriver response:", res.data);
          const role =
            res.data.result?.role || res.data.userData?.role || res.data.role;
          if (role === "driver") {
            set({
              authDriver: res.data.result || res.data.userData || res.data,
              isCheckingAuthDriver: false,
            });
            return true;
          } else {
            set({ authDriver: null, isCheckingAuthDriver: false });
            toast.error("Invalid role detected. Please log in again.");
            return false;
          }
        } catch (error) {
          console.error("Error in checkAuthDriver:", error.response || error);
          if (error.response?.status === 401) {
            localStorage.removeItem("driverToken");
            set({ authDriver: null, isCheckingAuthDriver: false });
            toast.error("Session expired. Please log in again.");
            return false;
          }
          set({ isCheckingAuthDriver: false });
          if (authDriver) return true;
          return false;
        }
      },

      register: async (data) => {
        set({ isRegister: true });
        try {
          const res = await axiosInstance.post("/auth/register-driver", data);
          localStorage.setItem("driverToken", res.data.token);
          set({ authDriver: res.data.result });
          toast.success("Account created successfully");
          return true;
        } catch (error) {
          toast.error(error.response?.data?.message || "Registration failed");
          console.error("Error in register:", error);
          return false;
        } finally {
          set({ isRegister: false });
        }
      },

      login: async (data) => {
        set({ isLogin: true });
        try {
          const res = await axiosInstance.post("/auth/login-driver", data);
          localStorage.setItem("driverToken", res.data.token);
          set({ authDriver: res.data.userData });
          toast.success("Logged in successfully");
          return true;
        } catch (error) {
          toast.error(error.response?.data?.message || "Login failed");
          console.error("Error in login:", error);
          return false;
        } finally {
          set({ isLogin: false });
        }
      },

      logout: async () => {
        localStorage.removeItem("driverToken");
        set({ authDriver: null });
        get().disconnectSocket();
        toast.success("Logged out successfully");
      },

      updateProfileDriver: async (file) => {
        set({ isUpdatingProfile: true });
        try {
          const formData = new FormData();
          if (!(file instanceof File)) {
            throw new Error("Invalid file provided for upload");
          }
          formData.append("profilePic", file);

          const token = localStorage.getItem("driverToken");
          if (!token) {
            throw new Error("No driver token found. Please log in again.");
          }

          const res = await axiosInstance.put(
            "/auth/update-driverprofile",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ authDriver: res.data.data });
          toast.success("Profile updated successfully");
          return res.data.data;
        } catch (error) {
          // ...
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    }),
    {
      name: "driver-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ authDriver: state.authDriver }),
    }
  )
);
