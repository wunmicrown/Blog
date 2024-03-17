import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import PublicNavbar from './Navbar/PublicNavbar'
import PrivateNavbar from './Navbar/PrivateNavbar'

const Layout = () => {
  return (
    <>
    <main>
        {/* <PublicNavbar/> */}
        <PrivateNavbar/>
        <Outlet/>
        <Footer/>
        
    </main>
    </>
  )
}

export default Layout