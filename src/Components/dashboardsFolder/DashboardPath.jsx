import React from 'react'
import { Outlet } from 'react-router-dom'
import PrivateNavbar from '../Navbar/PrivateNavbar'

const DashboardPath = () => {
  return (
    <>
      <PrivateNavbar/>
        <Outlet/>
    </>
  )
}

export default DashboardPath