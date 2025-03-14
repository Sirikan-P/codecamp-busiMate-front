import { Route, Routes } from "react-router";
import LayoutUser from "../layouts/LayoutUser";
import LayoutDriver from "../layouts/LayoutDriver";
import LayoutAdmin from "../layouts/LayoutAdmin";
import HomeUser from "../pages/user/HomeUser";
import HomeDriver from "../pages/driver/HomeDriver";
import HomeAdmin from "../pages/admin/HomeAdmin";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RegisterDriver from "../pages/RegisterDriver";
import AdminGetDriver from "../pages/admin/AdminGetDriver";
// import ProtectRoutes from "./ProtectRoutes";

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="registerdriver" element={<RegisterDriver />} />
        </Route>

  {/* USER */}
  {/* {<ProtectRoutes el={<LayoutUser />} allow={"user"}/>} */}
        <Route path="user" element={<LayoutUser />}>
          <Route index element={<HomeUser />} />
        </Route>
{/* DRIVER */}
{/* <ProtectRoutes el={<LayoutDriver />} allow={"driver"}/> */}
        <Route path="driver" element={<LayoutDriver />}>
          <Route index element={<HomeDriver />} />
        </Route>
  
{/* ADMIN */}
{/* <ProtectRoutes el={<LayoutAdmin />} allow={"admin"}/> */}
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="admingetdriver" element={<AdminGetDriver />} />
        </Route>

        <Route path="*" element={<h1> 404 not found </h1>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
