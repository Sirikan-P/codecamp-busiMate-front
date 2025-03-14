import React from "react";
import MainNav from "../components/MainNavUser";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Layout;
