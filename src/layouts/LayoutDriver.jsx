import { Outlet } from "react-router";
import MainNavDriver from "../components/MainNavDriver";

function LayoutDriver() {
  return (
    <div>
      <MainNavDriver />

      {/*  // <outlet/> render c   hild node */}
      <Outlet />
    </div>
  );
}

export default LayoutDriver;
