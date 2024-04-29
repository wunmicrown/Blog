import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <>
        <div className='flex justify-center mt-52'>
            <div className=' w-72 h-auto border-8 p-2 border-green-400 rounded-3xl bg-green-400'>
                <div className=' bg-black pt-20 h-72 rounded-3xl'>
                    <h1 className='text-white text-8xl font-bold text-center'>404</h1>
                </div>
            </div>
        </div>
                    <p className='text-lg text-semibold mt-6 text-center'>This page does not exist</p>
                    <Link to={'/'}>
                    <p className='text-xl font-small text-center mt-8 underline text-green-400'>Return to Home Page</p>
                    </Link>
    </>
  )
}

export default NotFoundPage