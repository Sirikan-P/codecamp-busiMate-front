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
import AdminGetUser from "../pages/admin/AdminGetUser";

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="register-driver" element={<RegisterDriver />} />
          {/* ขอยาดยืมพื้นที่เพื่อหนีพาท และลองโค้ด */}
          <Route path="admingetdriver" element={<AdminGetDriver />} />
          <Route path="admingetuser" element={<AdminGetUser />} />
        </Route>

        {/* private [user] */}
        {/* < Route path="user" 
                    element= { < ProtectRoutes  el={ <LayoutUser /> }
                                                allows={ ["USER"] }/>}
            > */}
        <Route path="user" element={<LayoutUser />}>
          <Route index element={<HomeUser />} />
        </Route>

        {/* private [driver] */}
        {/* < Route path="driver" 
                    element= { < ProtectRoutes  el={ <LayoutDriver /> }
                                                allows={ ["DRIVER"] }/>}
            > */}
        <Route path="driver" element={<LayoutDriver />}>
          <Route index element={<HomeDriver />} />
        </Route>

        {/* private [admin] */}
        {/* <Route  path="admin" 
                    element= { < ProtectRoutes  el={ <LayoutAdmin/> }  
                                                allows={ ["ADMIN"] }/> }
            >                  */}
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
        </Route>

        <Route path="*" element={<h1> 404 not found </h1>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
