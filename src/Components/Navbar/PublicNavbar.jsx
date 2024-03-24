import React from 'react'
import logoImg from '../../assets/img/blog-logo.png'
import { Link } from 'react-router-dom'
const PublicNavbar = () => {
  return (
    <>
      <nav className=' bg-slate-50 text-black shadow-2xl w-full fixed top-0 flex  justify-between px-6 p-4'>
      <div>
      <img src={logoImg} alt="" className=' w-14'/>
      </div>
      <ul className=' flex flex-shrink-0 gap-8   text-center pt-4 font-bold'>
          <li>
          </li>
          <li>
            <Link to ={'/'} >Home</Link>
            </li>
          <li>
            <Link to ={'/posts'}>Posts</Link>
          </li>
          <li>
            <Link to ={'/login'}>Login</Link>
          </li>
          <li>
            <Link to ={'/register'}>Register</Link>
          </li>
      </ul>
      <ul>
        profile
      </ul>
      </nav>
    </>
  )
}

export default PublicNavbar