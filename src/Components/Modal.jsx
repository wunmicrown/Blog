// Modal.js

import React from 'react';

const Modal = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Log in to continue</h2>
        <p className="mb-4">Blogify</p>
        <p className="mb-4">
          We're a place where coders share, stay up-to-date and grow their careers.
        </p>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Log in</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Create account</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
