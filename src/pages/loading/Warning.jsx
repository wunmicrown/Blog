import React from 'react'
import { Link } from 'react-router-dom'

const Warning = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center bg-green-100 py-2">
                <div className="p-6 m-4 w-full max-w-md bg-white shadow-md rounded-md text-center">
                    <p className="mb-4 text-lg text-gray-700">
                        Create an account or login to view more posts
                    </p>
                    <Link to={"/register"}>
                        <button className="mb-4 mt-9 p-4 py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 flex items-center justify-center animate-pulse">
                            Create Account
                        </button>
                    </Link>
                    <Link to={"/login"}>
                        <button className="mb-4 mt-9 p-4 py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-gradient-to-r from-green-400 to-lime-500 hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 flex items-center justify-center animate-pulse">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Warning