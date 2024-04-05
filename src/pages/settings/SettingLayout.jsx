import { Outlet } from "react-router-dom";
import PrivateNavbar from "../../components/Navbar/PrivateNavbar";
import Footer from "../../components/Footer";

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
