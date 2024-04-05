import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PrivateNavbar from "../../components/Navbar/PrivateNavbar";
import Footer from "../../components/Footer";
import { API_URL } from "../../components/constants/Api";
import { MdAccountTree, MdDashboardCustomize } from "react-icons/md";
import Profile from "./Profile";
import Account from "./Account";

const SettingLayout = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tokenMatch, setTokenMatch] = useState(false);

    useEffect(() => {
        const userDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data: user } = await axios.get(`${API_URL}/users/getUser`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log("user", user);
                setTokenMatch(true);
                setUser(user); // Initialize image source

            } catch (error) {
                console.log('Error message:', error);
                console.log(error.response);
                setTokenMatch(false);
                navigate('/login');

            }
        }
        userDetails();
    }, [])

    return (
        <>
            <PrivateNavbar user={user} />
            <div className="flex">
                <div className="w-1/5 bg-green-50 items-center justify-center flex">
                    {/* Sidebar */}
                    <div className="p-4">
                        <Link to="/settings/profile" className="flex items-center p-2">
                           <p className="flex hover:bg-gray-100 p-2 rounded-sm">
                           🙂 <span className=" hover:text-green-400 ml-2">
                            Profiles
                             </span> 
                           </p>
                        </Link>
                        <Link to="/settings/account" className="flex items-center p-2 hover:text-white">
                           <p className="hover:bg-green-600 flex p-2 rounded-md">
                           <MdAccountTree className="mr-2 text-green-500 hover:text-white" size={20} />
                            <span className="">Account</span>
                           </p>
                        </Link>
                        {/* Add more sidebar links as needed */}
                    </div>
                </div>
                <div className="w-4/5">
                    {/* Outlet for rendering child routes */}
                    <Profile/> 
                    <Account/>

                    {/* <Outlet /> */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SettingLayout;
