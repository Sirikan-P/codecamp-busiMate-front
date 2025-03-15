import { Outlet } from "react-router"
import MainNav from "../components/MainNavUser"
import MainNavUser from "../components/MainNavUser"

function LayoutUser() {
  return (
    <div>

       
        
        {/*  // <outlet/> render c   hild node */}
        <Outlet />

    </div>
  )
}

export default LayoutUser