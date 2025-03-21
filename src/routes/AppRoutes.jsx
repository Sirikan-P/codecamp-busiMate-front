import { Navigate, Route, Routes } from "react-router-dom";
import LayoutUser from "../layouts/LayoutUser";
import Home from "../pages/Home";
import LayoutDriver from "../layouts/LayoutDriver";
import LayoutAdmin from "../layouts/LayoutAdmin";
import HomeDriver from "../pages/driver/HomeDriver";
import HomeAdmin from "../pages/admin/HomeAdmin";
import Layout from "../layouts/Layout";
import RegisterUser from "../pages/user/RegisterUser";
import LoginUser from "../pages/user/LoginUser";
import ProfilePageUser from "../pages/user/ProfilePageUser";
import ProfilePageDriver from "../pages/driver/ProfilePageDriver";
import AdminGetDriver from "../pages/admin/AdminGetDriver";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { driverAuthStore } from "../store/driverAuthStore";
import LoginDriver from "../pages/driver/LoginDriver";
import RegisterDriver from "../pages/driver/RegisterDriver";
import { userAuthStore } from "../store/userAuthStore";
import ChatUser from "../pages/user/ChatUser";
import ChatDriver from "../pages/driver/ChatDriver";

function AppRoutes() {
  const {
    authUser,
    checkAuth,
    isCheckingAuth,
    initializeAuth: initializeUserAuth,
  } = userAuthStore();
  const {
    authDriver,
    checkAuthDriver,
    isCheckingAuthDriver,
    initializeAuth: initializeDriverAuth,
  } = driverAuthStore();

  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  useEffect(() => {
    const performInitialAuthCheck = async () => {
      initializeUserAuth();
      initializeDriverAuth();

      const promises = [];
      if (!authUser) promises.push(checkAuth());
      if (!authDriver) promises.push(checkAuthDriver());
      await Promise.all(promises);

      setIsInitialCheckDone(true);
    };

    performInitialAuthCheck();
  }, []);

  if (
    !isInitialCheckDone ||
    (isCheckingAuth && !authUser) ||
    (isCheckingAuthDriver && !authDriver)
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<LayoutUser />}>
          <Route
            index
            element={authUser ? <Home /> : <Navigate to="/user/login" />}
          />
          <Route
            path="profile"
            element={
              authUser ? <ProfilePageUser /> : <Navigate to="/user/login" />
            }
          />
          <Route
            path="register"
            element={authUser ? <Navigate to="/user" /> : <RegisterUser />}
          />
          <Route
            path="login"
            element={authUser ? <Navigate to="/user" /> : <LoginUser />}
          />
          <Route
            path="chat"
            element={authUser ? <ChatUser /> : <Navigate to="/user/login" />}
          />
        </Route>

        {/* Driver Routes */}
        <Route path="/driver" element={<LayoutDriver />}>
          <Route
            index
            element={
              authDriver ? <HomeDriver /> : <Navigate to="/driver/login" />
            }
          />
          <Route
            path="profile"
            element={
              authDriver ? (
                <ProfilePageDriver />
              ) : (
                <Navigate to="/driver/login" />
              )
            }
          />
          <Route
            path="register"
            element={
              authDriver ? <Navigate to="/driver" /> : <RegisterDriver />
            }
          />
          <Route
            path="login"
            element={authDriver ? <Navigate to="/driver" /> : <LoginDriver />}
          />
          <Route
            path="chat"
            element={
              authDriver ? <ChatDriver /> : <Navigate to="/driver/login" />
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="admingetdriver" element={<AdminGetDriver />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default AppRoutes;