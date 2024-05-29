import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="bg-striped-gradient w-full text-black font-sans font-semibold border-2 fixed bottom-0 border-[#f3f2f2] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <p className="text-sm text-[#262525] font-bold ">&copy; 2024 Your Blog App. <span className='text-white'> All rights reserved.</span></p>
            <div className="flex space-x-4">
              {/* <Link to={"#"} className="hover:text-gray-400">About</Link> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
