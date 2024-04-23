import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { API_URL } from "../constants/Api";

const PrivateNavbar = () => {
  const [user, setUser] = useState(null);
  const [tokenMatch, setTokenMatch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const URL = `${API_URL}/api/v1/users/getUser`;

  useEffect(() => {
    const userDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data: user } = await axios.get(URL, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setTokenMatch(true);
        setUser(user);

      } catch (error) {
        console.log('Error message:', error);
        console.log(error.response);
        setTokenMatch(false);
        navigate('/login');
      }
    }
    userDetails();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/v1/posts`, {
        params: { page: 1, title: searchTerm },
      });
      setPosts(response.data.posts);
      setNoResults(response.data.posts.length === 0);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPosts();
    setSearchTerm("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchPosts();
      setSearchTerm("");
    }
  };

  const handleSignOut = () => {
    navigate("/login");
    setShowConfirmation(false);
  };
  useEffect(() => {
    let timer;
    if (noResults) {
      timer = setTimeout(() => {
        setNoResults(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [noResults]);
  return (
    <>

      <Disclosure as="nav" className="bg-white shadow-lg fixed w-full top-0 z-50">
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
                    <Link to="/posts">
                      <FaBlog className="block text-green-400 h-8 w-auto lg:hidden" />
                    </Link>

                    <FaBlog className="hidden text-green-400 h-8 w-auto lg:block" />
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-green-600 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-green-300" */}
                    <Link
                      to={"/posts"}
                      className="
                      inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent text-gray-900 
                      hover:border-green-600 hover:text-green-300
                      "
                    >
                      Home
                    </Link>
                    <div className=" mt-4 ">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-20 py-2 w-full sm:w-auto border bg-green-100 border-gray-200 rounded-md focus:ring-1 focus:ring-green-500 focus:outline-none focus:border-transparent text-gray-700 font-bold"
                      />
                      <span className="absolute hover:bg-green-400 pl-2 rounded-lg" onClick={handleSearch}>
                        <BsSearch className="absolute top-3 right-5 text-gray-800" size={20} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link
                      to={"/create-post"}
                      className="ml-2 relative  items-center gap-x-1.5 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300  hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center"
                    >
                      <PlusIcon className="-ml-0.5 h-5 w-5 " aria-hidden="true" />
                      Create Post
                    </Link>
                  </div>

                  <div className=" md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    <Menu as="div" className="relative ml-3">
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:shadow-xl hover:focus:outline-none hover:focus:ring-2 hover:focus:ring-green-500 focus:ring-offset-2">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user && user.profilePic ? user.profilePic : "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"} alt="Profile Pic"
                        />

                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className=" w-56 absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={"/user-profile-details"}
                                className={`${active ? "bg-gray-100" : ""
                                  } block px-4 py-2 text-sm text-gray-700 hover:text-green-500 hover:underline`}
                              >
                                {user.username}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={"/user-profile-details"}
                                className={`${active ? "bg-gray-100" : ""
                                  } block px-4 py-2 text-sm text-gray-700 hover:text-green-500 hover:underline`}
                              >
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={"/create-post"}
                                className={`${active ? "bg-gray-100" : ""
                                  } block px-4 py-2 text-sm text-gray-700 hover:text-green-500 hover:underline`}
                              >
                                Create Post
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/settings/profile"
                                className={`${active ? "bg-gray-100" : ""
                                  } block px-4 py-2 text-sm text-gray-700 hover:text-green-500 hover:underline`}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <div>
                            <hr className=" mb-4" />
                          </div>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? "bg-gray-100" : ""
                                  } block px-4 py-2 text-sm text-gray-700 hover:text-green-500 hover:underline w-full text-left`}
                                onClick={() => setShowConfirmation(true)} // Open sign-out confirmation modal
                              >
                                Sign Out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Transition
              show={showConfirmation}
              as={Fragment}
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-md shadow-md">
                  <p className="mb-4">Are you sure you want to sign out?</p>
                  <div className="flex justify-end">
                    <button
                      className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      onClick={handleSignOut} // Call handleSignOut to sign out and navigate
                    >
                      Yes, sign out
                    </button>
                    <button
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                      onClick={() => setShowConfirmation(false)} // Close modal without signing out
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition>

            <Disclosure.Panel className="md:hidden">
              <div className=" mt-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="py-2 w-full sm:w-auto border bg-green-100 border-gray-200 rounded-md focus:ring-1 focus:ring-green-500 focus:outline-none focus:border-transparent text-gray-700 font-bold"
                />
                <span className="absolute hover:bg-green-400 pl-2 rounded-lg" onClick={handleSearch}>
                  <BsSearch className="absolute top-3 right-5 text-gray-800" size={20} />
                </span>
              </div>
              <div className="space-y-1 pt-2 pb-3">
                {/* Current: "bg-indigo-50 border-green-600 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-green-600 hover:text-green-300" */}
                <Link
                  to={"/posts"}
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-green-600 hover:bg-gray-50 hover:text-green-300 sm:pl-5 sm:pr-6"
                >
                  Home
                </Link>
                <Link
                  to={"/posts"}
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-green-600 hover:bg-gray-50 hover:text-green-300 sm:pl-5 sm:pr-6"
                >
                  Posts
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {noResults && (
        <div className="text-red-500 mt-20 text-center">No results match that query</div>
      )}
    </>
  );
};

export default PrivateNavbar;
