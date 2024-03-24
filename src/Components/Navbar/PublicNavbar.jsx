import React from 'react'
import logoImg from '../../assets/img/blog-logo.png'
const PublicNavbar = () => {
  return (
    <>
      <nav className=' bg-red-400 text-white shadow-2xl w-full fixed top-0 flex  justify-between px-6 p-4'>
      <div>
      <img src={logoImg} alt="" className=' w-14'/>
      </div>
      <ul className=' flex flex-shrink-0 gap-2 text-center pt-4'>
          <li>
          </li>
          <li>Home</li>
          <li>Posts</li>
          <li>Login</li>
          <li>Register</li>
      </ul>
      <ul>
        profile
      </ul>
      </nav>
    </>
  )
}

export default PublicNavbar