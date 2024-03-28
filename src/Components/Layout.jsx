import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from './Navbar/PublicNavbar';
import PrivateNavbar from './Navbar/PrivateNavbar';
import Footer from './Footer';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial state to false for not logged in

  return (
    <>
      <main>
        {isLoggedIn ? <PrivateNavbar /> : <PublicNavbar />}
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
