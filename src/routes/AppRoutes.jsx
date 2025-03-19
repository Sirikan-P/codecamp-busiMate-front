import { Navigate, Route, Routes } from "react-router";
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
import SettingPageUser from "../pages/user/SettingPageUser";
import AdminGetDriver from "../pages/admin/AdminGetDriver";
import ProfileUser from "../pages/user/ProfileUser";
import ProfileUser2 from "../pages/user/ProfileUser2";
import PaymentUser from "../pages/user/PaymentUser";
import PaymentEditUser from "../pages/user/PaymentEditUser";
import EditProfileUser from "../pages/user/EditProfileUser";
import Dashboard from "../pages/admin/Dashboard";
import Drivers from "../pages/admin/Drivers";
import Patients from "../pages/admin/Patients";
import Settings from "../pages/admin/Setting";
import Reports from "../pages/admin/Report";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { driverAuthStore } from "../store/driverAuthStore";
import LoginDriver from "../pages/driver/LoginDriver";
import RegisterDriver from "../pages/driver/RegisterDriver";
import { userAuthStore } from "../store/userAuthStore";
import UserHome from "../pages/user/UserHome";
import UserBooking from "../pages/user/UserBooking";
import UserProfile from "../pages/user/UserProfile";
import MockUserProfile from "../pages/user/MockUserProfile";
import DriverProfile from "../pages/driver/DriverProfile";
import DriverDashboard from "../pages/driver/DriverDashboard";
import SettingPageDriver from "../pages/driver/SettingPageDriver";
import MockDriverHome from "../pages/driver/MockDriverHome";
import MockDriverEditProfile from "../pages/driver/MockDriverEditProfile";

function AppRoutes() {
  const { authUser, checkAuth, isCheckingAuth } = userAuthStore();
  const { authDriver, checkAuthDriver, isCheckingAuthDriver } =
    driverAuthStore();

  useEffect(() => {
    checkAuth();
    checkAuthDriver();
  }, [checkAuth, checkAuthDriver]);

  if ((isCheckingAuth && !authUser) || (isCheckingAuthDriver && !authDriver)) {
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
          {/* <Route index element={authUser ? <Home /> : <Navigate to="/user/login" />}/> */}
          <Route index element={<Home />} />
          <Route path="driver/register" element={<RegisterDriver />} />
          <Route path="driver/login" element={<LoginDriver />} />
          <Route path="user/register" element={<RegisterUser />} />
          <Route path="user/login" element={<LoginUser />} />
        </Route>

        {/* User Routes */}
        <Route path="user" element={<LayoutUser />}>
          <Route
            path="profile"
            element={
              authUser ? <MockUserProfile /> : <Navigate to="/user/login" />
            }
          />
          <Route
            path="home"
            element={authUser ? <UserHome /> : <Navigate to="/user/login" />}
          />
          <Route
            path="booking"
            element={authUser ? <UserBooking /> : <Navigate to="/user/login" />}
          />
          <Route
            path="setting"
            element={
              authUser ? <SettingPageUser /> : <Navigate to="/user/login" />
            }
          />
          {/* <Route path="booking" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/>
          <Route path="chat" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/>
          <Route path="makebooking" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/> */}
        </Route>

        {/* Driver Routes */}
        <Route path="driver" element={<LayoutDriver />}>
          <Route
            index
            element={
              authDriver ? <MockDriverHome /> : <Navigate to="/driver/login" />
            }
          />
          <Route
            path="profile"
            element={
              authDriver ? (
                <MockDriverEditProfile />
              ) : (
                <Navigate to="/driver/login" />
              )
            }
          />
          <Route
            path="setting"
            element={
              authDriver ? (
                <SettingPageDriver />
              ) : (
                <Navigate to="/driver/login" />
              )
            }
          />
        </Route>

        {/* Admin Routes */}
        {/* <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="admingetdriver" element={<AdminGetDriver />} />
          <Route path="profile-user" element={<ProfileUser />} />
          <Route path="profile-user2" element={<ProfileUser2 />} />
          <Route path="payment-user" element={<PaymentUser />} />
          <Route path="payment-edit-user" element={<PaymentEditUser />} />
          <Route path="profile-edit-user" element={<EditProfileUser />} />
        </Route> */}

        {/* new dashboaard for Admin */}
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="patients" element={<Patients />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
}

export default AppRoutes;
