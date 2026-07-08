import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

function MainLayout() {
    return(
        <div className="main-h-screen bg-neutral-950 text-white">
            <Navbar/>
            <Outlet/>
        </div>
    );
}
export default MainLayout;