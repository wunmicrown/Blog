import React, { useState } from 'react';
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

const PublicNavbar = () => {
  // const user = true;
  const [profileOpen, setProfileOpen] = useState(false);

  const close = () => {
    setProfileOpen(false);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow fixed w-full top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  {/* Logo here */}
                  <Link to="/">
                    <FaBlog className="block text-green-400 h-8 w-auto lg:hidden" />
                  </Link>

                  <FaBlog className="hidden text-green-400 h-8 w-auto lg:block" />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-green-600 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-green-300" */}
                  <Link
                    to={"/"}
                    className="
                     inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent text-gray-900 
                     hover:border-green-600 hover:text-green-300
                     "
                  >
                    Home
                  </Link>
                  <Link
                    to={"/login"}
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-green-600 hover:text-green-300"
                  >
                    Posts
                  </Link>
                  <Link
                    to={"/login"}
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-green-600 hover:text-green-300"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-green-600 hover:text-green-300"
                  >
                    Register
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    to={"/login"}
                    className="ml-2 relative inline-flex items-center gap-x-1.5 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                  >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Add New Post
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-green-600 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-green-600 hover:text-green-300" */}
              <Link
                to={"/"}
                className="block border-l-4 border-green-600 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
              >
                Home
              </Link>
              <Link
                to={"/login"}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-green-600 hover:bg-gray-50 hover:text-green-300 sm:pl-5 sm:pr-6"
              >
                Posts
              </Link>
              <Link
                to={"/register"}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-green-600 hover:bg-gray-50 hover:text-green-300 sm:pl-5 sm:pr-6"
              >
                Register
              </Link>
              <Link
                to={"/login"}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-green-600 hover:bg-gray-50 hover:text-green-300 sm:pl-5 sm:pr-6"
              >
                Login
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default PublicNavbar
