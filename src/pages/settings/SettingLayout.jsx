import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PrivateNavbar from "../../components/Navbar/PrivateNavbar";
import Footer from "../../components/Footer";
import { API_URL } from "../../components/constants/Api";


const SettingLayout = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tokenMatch, setTokenMatch] = useState(false);
  
    useEffect(() => {
     const userDetails= async () =>{
      try {
        const token = localStorage.getItem('token');
        const { data:user} = await axios.get(`${API_URL}/users/getUser`, {
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
      < >
        <PrivateNavbar
          user={user}/>
          <div className="mt-24 ml-32 w-32 ">
            <p className=" cursor-pointer hover:bg-gray-50 rounded-lg p-2">🙂 <span className=" hover:text-green-500">Profile</span></p>
          </div>
          <Outlet/>
          <Footer/>
      </>
    )
}

export default SettingLayout