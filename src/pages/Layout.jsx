import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import PublicNavbar from './Navbar/PublicNavbar';
import PrivateNavbar from './Navbar/PrivateNavbar';

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
