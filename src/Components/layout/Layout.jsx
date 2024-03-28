import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavbar from '../Navbar/PublicNavbar'
import PrivateNavbar from '../Navbar/PrivateNavbar'
import Footer from '../Footer'


const Layout = () => {
  return (
    <>
      <main>
        <PublicNavbar />
        <PrivateNavbar />
        <Outlet />
        <Footer />

      </main>
    </>
  )
}

export default Layout