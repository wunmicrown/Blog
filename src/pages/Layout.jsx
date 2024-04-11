// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import PublicNavbar from './Navbar/PublicNavbar';
// import PrivateNavbar from './Navbar/PrivateNavbar';
// import Footer from '../pages/Footer';

// const Layout = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 

//   return (
//     <>
//       <main>
//         {isLoggedIn ? <PrivateNavbar />: <PublicNavbar />}
//         <Outlet />
//         <Footer />
//       </main>
//     </>
//   );
// };

// export default Layout;
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import PrivateNavbar from '../components/Navbar/PrivateNavbar';
import PublicNavbar from '../components/Navbar/PublicNavbar';

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
  return (
    <>
      <div>
        {isLoggedIn ? <PrivateNavbar /> : <PublicNavbar />}

        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default Layout
