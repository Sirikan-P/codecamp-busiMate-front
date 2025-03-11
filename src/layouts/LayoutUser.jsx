import { Outlet } from "react-router"
import MainNav from "../components/MainNav"

function LayoutUser() {
  return (
    <div>LayoutUser

        <MainNav />
        
        {/*  // <outlet/> render c   hild node */}
        <Outlet />

    </div>
  )
}

export default LayoutUser