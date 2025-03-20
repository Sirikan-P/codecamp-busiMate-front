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
import SettingPageUser from "../pages/user/SettingPageUser";
import ProfilePageDriver from "../pages/driver/ProfilePageDriver";
import SettingPageDriver from "../pages/driver/SettingPageDriver";
import AdminGetDriver from "../pages/admin/AdminGetDriver";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { driverAuthStore } from "../store/driverAuthStore";
import LoginDriver from "../pages/driver/LoginDriver";
import RegisterDriver from "../pages/driver/RegisterDriver";
import { userAuthStore } from "../store/userAuthStore";
import CreateBooking from "../pages/user/userBooking/CreateBooking";
import AllBooking from "../pages/user/userBooking/AllBooking";
import FindDriver from "../pages/user/userBooking/FindDriver";
import ShowOneBooking from "../pages/user/userBooking/ShowOneBooking";
import UploadAppointmentImg from "../pages/user/userBooking/UploadAppointmentImg";

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
          <Route index element={authUser ? <ProfilePageUser /> : <Navigate to="/user/login" />}/>
          <Route path="setting" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/>
          <Route path="booking" element={authUser ? <AllBooking /> : <Navigate to="/user/login" />}/>
          <Route path="booking/get/:id" element={authUser ? <ShowOneBooking /> : <Navigate to="/user/login" />}/>
          <Route path="booking/create" element={authUser ? <CreateBooking /> : <Navigate to="/user/login" />}/>
          <Route path="booking/uploadimg" element={authUser ? <UploadAppointmentImg /> : <Navigate to="/user/login" />}/>
          <Route path="booking/finddriver" element={authUser ? <FindDriver /> : <Navigate to="/user/login" />}/>
          {/* <Route path="booking" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/>
          <Route path="chat" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/>
          <Route path="makebooking" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/> */}
        </Route>

        {/* Driver Routes */}
        <Route path="driver" element={<LayoutDriver />}>
          <Route index element={authDriver ? <HomeDriver /> : <Navigate to="/driver/login" />} />
          <Route path="profile" element={authDriver ? (<ProfilePageDriver />) : (<Navigate to="/driver/login" /> )}/>
          <Route path="setting" element={authDriver ? (<SettingPageDriver />) : (<Navigate to="/driver/login" /> )}/>
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<LayoutAdmin />}>
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
