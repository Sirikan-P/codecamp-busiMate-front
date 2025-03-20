import { Outlet } from "react-router";
import MainNav from "../components/MainNav";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";

function LayoutAdmin() {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-1 ml-64">
          <Header />
          <main className="p-6 mt-16 w-full">
            <Outlet />
          </main>
        </div>
      </div>
      {/*  // <outlet/> render c   hild node */}
    </div>
  );
}

export default LayoutAdmin;