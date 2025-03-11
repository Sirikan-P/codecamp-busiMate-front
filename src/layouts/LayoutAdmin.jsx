import { Outlet } from "react-router"
import MainNav from "../components/MainNav"

function LayoutAdmin() {
  return (
    <div>LayoutAdmin

        <MainNav />
        
        {/*  // <outlet/> render c   hild node */}
        <Outlet />

    </div>
  )
}

export default LayoutAdmin