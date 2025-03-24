import { Outlet } from "react-router";
import MainNavAdmin from "../components/MainNavAdmin";

function LayoutAdmin() {
  return (
    <div>
      <MainNavAdmin />

      {/*  // <outlet/> render c   hild node */}
      <Outlet />
    </div>
  );
}

export default LayoutAdmin;
