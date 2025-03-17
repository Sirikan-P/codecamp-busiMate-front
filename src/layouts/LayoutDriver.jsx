import { Outlet } from "react-router";
import MainNav from "../components/MainNav";
import DriverNavbar from "../components/Driver/DriverNavBar";

function LayoutDriver() {
  return (
    <div>
      <DriverNavbar />

      {/*  // <outlet/> render c   hild node */}
      <Outlet />
    </div>
  );
}

export default LayoutDriver;
