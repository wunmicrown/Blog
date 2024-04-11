import { Outlet } from "react-router-dom";
import PrivateNavbar from "../Navbar/PrivateNavbar";
import Footer from "../Footer";

const SettingLayout = () => {
    return (
        <>
            <PrivateNavbar />
                {/* Outlet for rendering child routes */}
                <Outlet />
            <Footer />
        </>
    )
}

export default SettingLayout;
