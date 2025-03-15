import { Outlet } from "react-router"
import MainNav from "../components/MainNavUser"
import MainNavUser from "../components/MainNavUser"
import NavbarChatUser from "../components/NavbarChatUser"

function LayoutUser() {
  return (
    <div>

       <MainNavUser/>
        
        {/*  // <outlet/> render c   hild node */}
        <Outlet />

    </div>
  )
}

export default LayoutUser