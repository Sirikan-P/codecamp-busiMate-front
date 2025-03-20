// import { Route, Routes } from "react-router";
// import LayoutUser from "../layouts/LayoutUser";
// import LayoutDriver from "../layouts/LayoutDriver";
// import LayoutAdmin from "../layouts/LayoutAdmin";
// import HomeUser from "../pages/user/HomeUser";
// import HomeDriver from "../pages/driver/HomeDriver";
// import HomeAdmin from "../pages/admin/HomeAdmin";
// import Layout from "../layouts/Layout";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import RegisterDriver from "../pages/RegisterDriver";
// import AdminGetDriver from "../pages/admin/AdminGetDriver";

// function AppRoutes() {
//   return (
//     <>
//       <Routes>
//         {/* public */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="register-driver" element={<RegisterDriver />} />
//           {/* ขอยาดยืมพื้นที่เพื่อหนีพาท และลองโค้ด */}
//           <Route path="admingetdriver" element={<AdminGetDriver />} />
//         </Route>

//         {/* private [user] */}
//         {/* < Route path="user"
//                     element= { < ProtectRoutes  el={ <LayoutUser /> }
//                                                 allows={ ["USER"] }/>}
//             > */}
//         <Route path="user" element={<LayoutUser />}>
//           <Route index element={<HomeUser />} />
//         </Route>

//         {/* private [driver] */}
//         {/* < Route path="driver"
//                     element= { < ProtectRoutes  el={ <LayoutDriver /> }
//                                                 allows={ ["DRIVER"] }/>}
//             > */}
//         <Route path="driver" element={<LayoutDriver />}>
//           <Route index element={<HomeDriver />} />
//         </Route>

//         {/* private [admin] */}
//         {/* <Route  path="admin"
//                     element= { < ProtectRoutes  el={ <LayoutAdmin/> }
//                                                 allows={ ["ADMIN"] }/> }
//             >                  */}
//         <Route path="admin" element={<LayoutAdmin />}>
//           <Route index element={<HomeAdmin />} />
//         </Route>

//         <Route path="*" element={<h1> 404 not found </h1>} />
//       </Routes>
//     </>
//   );
// }

// export default AppRoutes;

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
import ProfilePageDriver from "../pages/driver/ProfilePageDriver";
import AdminGetDriver from "../pages/admin/AdminGetDriver";
import ProfileUser from "../pages/user/ProfileUser";
import ProfileUser2 from "../pages/user/ProfileUser2";
import PaymentUser from "../pages/user/PaymentUser";
import PaymentEditUser from "../pages/user/PaymentEditUser";
import EditProfileUser from "../pages/user/EditProfileUser";
import Dashboard from "../pages/admin/Dashboard";
import Drivers from "../pages/admin/Drivers";
import Settings from "../pages/admin/Setting";
import Reports from "../pages/admin/Report";
import DriverProfile from "../pages/driver/DriverProfile";
import DriverEarnings from "../pages/driver/DriverEarning";
import DriverHistory from "../pages/driver/DriverHistory";
import DriverChat from "../pages/driver/DriverChat";
import DriverDashboard from "../pages/driver/DriverDashboard";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { driverAuthStore } from "../store/driverAuthStore";
import LoginDriver from "../pages/driver/LoginDriver";
import RegisterDriver from "../pages/driver/RegisterDriver";
import { userAuthStore } from "../store/userAuthStore";
import DriverEditProfile from "../pages/driver/DriverEditProfile";
import DriverAddress from "../pages/driver/DriverAddress";
import DriverAddAddress from "../pages/driver/DriverAddAddress";
import CreateBookingNoti from "../pages/user/CreateBookingNoti";
import DriverBookingNoti from "../pages/driver/DriverBookingNoti";
import DriverBooking from "../pages/driver/DriverBooking";
import UserHome from "../pages/user/UserHome";
import UserBooking from "../pages/user/UserBooking";
import UserProfile from "../pages/user/UserProfile";
import MockUserProfile from "../pages/user/MockUserProfile";
import Patients from "../pages/admin/Patients";
import Dashboard1 from "../pages/admin/Dashboard1";
import Dashboard2 from "../pages/admin/Dashboard2";
import SettingPageDriver from "../pages/driver/SettingPageDriver";

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
        <Route index element={ <Home /> } />
          {/* <Route index element={<Home />} /> */}
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
          <Route index element={authDriver ? <HomeDriver /> : <Navigate to="/driver/login" />} />
          <Route path="profile" element={authDriver ? (<ProfilePageDriver />) : (<Navigate to="/driver/login" /> )}/>
          <Route path="setting" element={authDriver ? (<SettingPageDriver />) : (<Navigate to="/driver/login" /> )}/>
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
          <Route index element={<Dashboard2 />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="patients" element={<Patients />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="drivers-old" element={<AdminGetDriver />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
}

export default AppRoutes;