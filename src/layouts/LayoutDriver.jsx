import { Outlet } from "react-router"
import MainNav from "../components/MainNav"

function LayoutDriver() {
  return (
    <div>LayoutDriver

        <MainNav />
        
        {/*  // <outlet/> render c   hild node */}
        <Outlet />
    </div>
  )
}

export default LayoutDriver