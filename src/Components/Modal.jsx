// Modal.js

import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md ">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-lime-700 hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md  transform transition-all duration-500 ease-in-out hover:scale-105 mb-4 text-center text-green-600  flex items-center justify-center">Log in to continue</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <hr className='mb-8' />
        <p className="mb-8">Blogify</p>
        <p className="mb-8">
          We're a place where coders share, stay up-to-date and grow their careers.
        </p>
        <div className="flex flex-col">
          <Link to={"/login"}>
            <button className=" mb-4 p-4 py-3 px-7 w-full leading-6 text-green-50 font-bold text-center bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 flex items-center justify-center animate-pulse">
              Log in
            </button>
          </Link>
          <Link to={"/register"} className='text-center'>
            <button className=" font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-lime-700 hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md  transform transition-all duration-500 ease-in-out hover:scale-105 mb-4 text-center text-green-600 ">Create account</button>

          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
