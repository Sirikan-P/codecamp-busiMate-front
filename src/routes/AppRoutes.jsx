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
import { useEffect, useState } from "react";
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
import DriverEditProfile from "../pages/driver/DriverEditProfile";
import DriverAddress from "../pages/driver/DriverAddress";
import DriverAddAddress from "../pages/driver/DriverAddAddress";
import DriverBooking from "../pages/driver/DriverBooking";
import CreateBookingNoti from "../pages/user/CreateBookingNoti";
import SettingPagePatiens from "../pages/user/SettingPagePatiens";
import PatientsPageUser from "../pages/user/PatientsPageUser";
import DriverBookingNoti from "../pages/driver/DriverBookingNoti";
import HandleBookingResponse from "../pages/user/userBooking/HandleBookingResponse";
import CreateBookingNotiResult from "../pages/user/CreateBookingNotiResult";
import Checkout from "../pages/user/payment/Checkout";
import CheckoutComplete from "../pages/user/payment/CheckoutComplete";
import UserHome from "../pages/user/UserHome";
import UserBooking from "../pages/user/UserBooking";
import UserProfile from "../pages/user/UserProfile";
import MockUserProfile from "../pages/user/MockUserProfile";
import Patients from "../pages/admin/Patients";
import Dashboard1 from "../pages/admin/Dashboard1";
import Dashboard2 from "../pages/admin/Dashboard2";
import SettingPageDriver from "../pages/driver/SettingPageDriver";
import SettingPageUser from "../pages/user/SettingPageUser";
import Patients1 from "../pages/admin/Patients1";
import ChatUser from "../pages/user/ChatUser";
import ChatDriver from "../pages/driver/ChatDriver";
import LoginAdmin from "../pages/admin/LoginAdmin";
import { adminAuthStore } from "../store/adminAuthStore";
import FindNewDriver from "../pages/user/userBooking/FindNewDriver";
import ReviewDriver from "../pages/user/reviewDriver";

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
  const { isCheckingAuthAdmin, authAdmin, checkAuthAdmin } = adminAuthStore();

  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  useEffect(() => {
    const performInitialAuthCheck = async () => {
      initializeUserAuth();
      initializeDriverAuth();

      const promises = [];
      if (!authUser) promises.push(checkAuth());
      if (!authDriver) promises.push(checkAuthDriver());
      if (!authAdmin) promises.push(checkAuthAdmin());
      await Promise.all(promises);

      setIsInitialCheckDone(true);
    };

    performInitialAuthCheck();
  }, []);

  if (
    !isInitialCheckDone ||
    (isCheckingAuth && !authUser) ||
    (isCheckingAuthDriver && !authDriver) ||
    (isCheckingAuthAdmin && !authAdmin)
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
          <Route
            path="profile"
            element={
              authUser ? <ProfilePageUser /> : <Navigate to="/user/login" />
          
            }/>
          <Route path="setting" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/>
          <Route path="patients" element={authUser ? <PatientsPageUser /> :<Navigate to="/user/login" />}/>
          <Route path="settingpatients/:id" element={authUser ? <SettingPagePatiens /> :<Navigate to="/user/login" />}/>
          <Route path="booking" element={authUser ? <AllBooking /> : <Navigate to="/user/login" />}/>
          <Route path="booking/get/:id" element={authUser ? <ShowOneBooking /> : <Navigate to="/user/login" />}/>
          <Route path="booking/create" element={authUser ? <CreateBooking /> : <Navigate to="/user/login" />}/>
          <Route path="booking/uploadimg" element={authUser ? <UploadAppointmentImg /> : <Navigate to="/user/login" />}/>
          <Route path="booking/finddriver" element={authUser ? <FindDriver /> : <Navigate to="/user/login" />}/>
          <Route path="booking/findNewdriver" element={authUser ? <FindNewDriver/> : <Navigate to="/user/login" />}/>
          <Route path="booking/handlebookingres" element={authUser ? <HandleBookingResponse /> : <Navigate to="/user/login" />}/>
          {/* <Route
            path="register"
            element={authUser ? <Navigate to="/user" /> : <RegisterUser />}
          />
           <Route
            path="login"
            element={authUser ? <Navigate to="/user" /> : <LoginUser />}
          /> */}
           <Route
            path="chat"
            element={authUser ? <ChatUser /> : <Navigate to="/user/login" />}
          />
          {/* <Route path="booking" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/>
          <Route path="chat" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/>
          <Route path="makebooking" element={authUser ? <SettingPageUser /> : <Navigate to="/user/login" />}/> */}
          
          {/* payment */}
            <Route path='checkout/:id'element= { <Checkout /> } /> 
            <Route path='complete/:session'element= { <CheckoutComplete /> } /> 
        
        </Route>

        {/* Driver Routes */}
        <Route path="driver" element={<LayoutDriver />}>
          <Route index element={authDriver ? <HomeDriver /> : <Navigate to="/driver/login" />} />
          <Route path="profile" element={authDriver ? (<ProfilePageDriver />) : (<Navigate to="/driver/login" /> )}/>
          <Route path="edit" element={authDriver ? (<DriverEditProfile />) : (<Navigate to="/driver/login" /> )}/>
          <Route path="address" element={authDriver ? (<DriverAddress />) : (<Navigate to="/driver/login" /> )}/>
          <Route path="address/add" element={authDriver ? (<DriverAddAddress />) : (<Navigate to="/driver/login" /> )}/>
          <Route path="booking" element={authDriver ? (<DriverBooking />) : (<Navigate to="/driver/login" /> )}/>


           <Route path="receiveNoti" element={<DriverBookingNoti />} />
            {/*move these route for usernoti page */}
            <Route path="sendNoti" element={<CreateBookingNoti />} />
           <Route path="receiveNotiresult" element={<CreateBookingNotiResult />} />
           {/* <Route
            path="register"
            element={
              authDriver ? <Navigate to="/driver" /> : <RegisterDriver />
            }
          />
          <Route
            path="login"
            element={authDriver ? <Navigate to="/driver" /> : <LoginDriver />}
          /> */}
          <Route
            path="chat"
            element={
              authDriver ? <ChatDriver /> : <Navigate to="/driver/login" />
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard2 />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="patients" element={<Patients1 />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="drivers-old" element={<AdminGetDriver />} />
          <Route path="dashboard-chun" element={<Dashboard />} />
          <Route path="login" element={<LoginAdmin />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
}

export default AppRoutes;
