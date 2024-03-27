import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/Api';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';

const PublicPosts = () => {
  const URL = `${API_URL}/posts`
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(URL);
        console.log(data);
        setPosts(data); // Assuming the response data is an array of posts
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div>
        <section className="relative py-24 bg-white">
          <div className="absolute top-0 left-0 w-full h-full" />
          <div className="container relative z-10 px-4 mx-auto">
            <div className="md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                Blog
              </span>
              <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                Read our Trending Articles
              </h3>
            </div>

            <div className="flex flex-wrap -mx-4 mb-12 md:mb-20">
              {/* loop */}
              {loading ? (
                <div className="flex justify-center items-center h-full w-full">
                  <Loading />
                </div>
              ) : error ? (
                <h3 className="text-red-500 text-center">{error?.message}</h3>
              ) : posts?.post?.length <= 0 ? (
                <h1>No Post found</h1>
              ) : (
                posts?.posts?.map((post) => {
                  return (
                    <div key={post._id} className="w-full md:w-1/2 px-4 mb-8">
                      <Link to={`/posts/${post?._id}`} className="block mb-6 overflow-hidden rounded-md">
                        <img className="w-full" src={post?.coverImgUrl} />
                      </Link>
                      <div className="mb-4">
                        <span className="inline-block py-1 px-3 text-xs leading-5 text-green-500 hover:text-green-600 font-medium uppercase bg-green-100 hover:bg-green-200 rounded-full shadow-sm">
                          {post.author}
                        </span>
                      </div>
                      <p className="mb-2 text-coolGray-500 font-medium">
                        {new Date(post?.createdAt).toDateString()}
                      </p>
                      <Link
                        className="inline-block mb-4 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:underline"
                        to={`/posts/${post?._id}`}
                      >
                        {post?.title}
                      </Link>
                      <p className="mb-4 text-coolGray-500">
                        {post?.content}
                      </p>
                      <Link
                        className="inline-flex items-center text-base md:text-lg text-green-500 hover:text-green-600 font-semibold"
                        to={`/posts/${post?._id}`}
                      >
                        <span className="mr-3">Read Post</span>
                        <svg
                          width={8}
                          height={10}
                          viewBox="0 0 8 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.94667 4.74665C7.91494 4.66481 7.86736 4.59005 7.80666 4.52665L4.47333 1.19331C4.41117 1.13116 4.33738 1.08185 4.25617 1.04821C4.17495 1.01457 4.08791 0.997253 4 0.997253C3.82246 0.997253 3.6522 1.06778 3.52667 1.19331C3.46451 1.25547 3.4152 1.32927 3.38156 1.41048C3.34792 1.4917 3.33061 1.57874 3.33061 1.66665C3.33061 1.84418 3.40113 2.01445 3.52667 2.13998L5.72667 4.33331H0.666667C0.489856 4.33331 0.320286 4.40355 0.195262 4.52858C0.070238 4.6536 0 4.82317 0 4.99998C0 5.17679 0.070238 5.34636 0.195262 5.47138C0.320286 5.59641 0.489856 5.66665 0.666667 5.66665H5.72667L3.52667 7.85998C3.46418 7.92196 3.41458 7.99569 3.38074 8.07693C3.34689 8.15817 3.32947 8.24531 3.32947 8.33331C3.32947 8.42132 3.34689 8.50846 3.38074 8.5897C3.41458 8.67094 3.46418 8.74467 3.52667 8.80665C3.58864 8.86913 3.66238 8.91873 3.74361 8.95257C3.82485 8.98642 3.91199 9.00385 4 9.00385C4.08801 9.00385 4.17514 8.98642 4.25638 8.95257C4.33762 8.91873 4.41136 8.86913 4.47333 8.80665L7.80666 5.47331C7.86736 5.40991 7.91494 5.33515 7.94667 5.25331C8.01334 5.09101 8.01334 4.90895 7.94667 4.74665Z"
                            fill="currentColor"
                          />
                        </svg>
                      </Link>
                    </div>
                  );
                })

              )}
            </div>

            <div className="flex flex-col items-center justify-center bg-green-100 py-2">
              <div className="p-6 m-4 w-full max-w-md bg-white shadow-md rounded-md text-center">
                <p className="mb-4 text-lg text-gray-700">
                  Create an account or login to view more posts
                </p>
                <Link to={"/register"}>
                  <button  className="mb-4 mt-9 p-4 py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 flex items-center justify-center animate-pulse">
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
            {/* {!userAuth?.userInfo && <Warning />} */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicPosts;