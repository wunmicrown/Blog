// import React, { useEffect, useState } from 'react'
// import { Outlet, useNavigate } from 'react-router-dom'
// import PrivateNavbar from '../Navbar/PrivateNavbar'
// import Footer from '../Footer'
// import { API_URL } from '../constants/Api'
// import axios from 'axios'

// const DashboardPath = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [tokenMatch, setTokenMatch] = useState(false);

//   useEffect(() => {
//    const userDetails= async () =>{
//     try {
//       const token = localStorage.getItem('token');
//       const { data:user} = await axios.get(`${API_URL}/users/getUser`, {
//         headers: {
//             "Authorization": `Bearer ${token}`
//           }
//       });
//       console.log("user", user);
//       setTokenMatch(true);
//       setUser(user); // Initialize image source

//     } catch (error) {
//       console.log('Error message:', error);
//       console.log(error.response);
//       setTokenMatch(false);
//       navigate('/login');

//     }
//    }
//     userDetails();
//   }, [])

//   return (
//     <>
//       <PrivateNavbar
//         user={user}
//       />
//         <Outlet/>
//         <Footer/>
//     </>
//   )
// }

// export default DashboardPath