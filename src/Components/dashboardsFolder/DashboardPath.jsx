import React from 'react'
import { Outlet } from 'react-router-dom'
import PrivateNavbar from '../Navbar/PrivateNavbar'
import Footer from '../Footer'

const DashboardPath = () => {
  return (
    <>
      <PrivateNavbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default DashboardPath