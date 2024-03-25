import React, { useState } from 'react'
import logoImg from '../../assets/img/blog-logo.png'
import { Link } from 'react-router-dom'
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { RiImageAddLine } from "react-icons/ri"

import "./nav.css"
const PublicNavbar = () => {
  const user = true
  const [profileOpen, setProfileOpen] = useState(false)
  const close = () => {
    setProfileOpen(false)
  }
  return (
    <>
      <nav className=' bg-slate-50 text-black shadow-2xl w-full sticky top-0 flex  justify-between px-6 p-4'>
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
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src='https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <Link to='/'>
                  <div className='image'>
                    <div className='img'>
                      <img src='https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
                    </div>
                    <div className='text'>
                      <h4>Eden Smith</h4>
                      <label>Los Angeles, CA</label>
                    </div>
                  </div>
                </Link>
                <Link to='/create'>
                  <button className='box'>
                    <RiImageAddLine className='icon' />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to='/login'>
                  <button className='box'>
                    <IoSettingsOutline className='icon' />
                    <h4>My Account</h4>
                  </button>
                </Link>
                <button className='box'>
                  <BsBagCheck className='icon' />
                  <h4>My Order</h4>
                </button>
                <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button>
                <button className='box'>
                  <GrHelp className='icon' />
                  <h4>Help</h4>
                </button>
                <button className='box'>
                  <BiLogOut className='icon' />
                  <h4>Log Out</h4>
                </button>
              </div>
            )}
          </>
        ) : (
          <button>My Account</button>
        )}
      </div>
      </nav>
    </>
  )
}

export default PublicNavbar