import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import truncatePost from "../../utils/truncatepost";
import Loading from "../loading/Loading";
import axios from "axios"; // Import Axios for making HTTP requests
import { API_URL } from "../constants/Api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]); // State to track liked posts
  const [loadingCategories, setLoadingCategories] = useState(false); // State to track loading categories

  const URL = `${API_URL}/posts`
  const handleNext = () => setPage(page + 1);
  const handlePrev = () => setPage(page > 1 ? page - 1 : 1);

  useEffect(() => {
    const fetchPostsByCategory = async (categoryName) => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/posts`, {
          params: { category_id: categoryName },
        });
        console.log("Posts", response);
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPostsByCategory();
  }, [page, category]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true); // Set loading state to true when fetching categories
      try {
        const { data } = await axios.get(`${API_URL}/categories`);
        console.log("Categories", data);
        setCategories(data.categories);
        setLoadingCategories(false); // Set loading state to false after fetching categories
      } catch (error) {
        setErrorCategories(error);
        setLoadingCategories(false); // Set loading state to false if there's an error fetching categories
      }
    };

    fetchCategories();
  }, []);

  // Function to handle like button click
  const handleLikeClick = (postId) => {
    setLikedPosts((prevLikedPosts) => {
      if (prevLikedPosts.includes(postId)) {
        // If post is already liked, remove from liked posts
        return prevLikedPosts.filter((id) => id !== postId);
      } else {
        // If post is not liked, add to liked posts
        return [...prevLikedPosts, postId];
      }
    });
  };

  return (
    <>
      <div>
        <section className="relative py-24 bg-white">
          {/*  */}
          <div className="container relative z-10 px-4 mx-auto">
            <div className="md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                Blog
              </span>
              <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                Read our Trending Articles
              </h3>
            </div>
            {/* Categories */}
            {/* <div className="flex flex-wrap justify-center mb-4">
              {loadingCategories ? ( // Show loading indicator while categories are being fetched
                <Loading />
              ) : error ? (
                <h3 className="text-red-500 text-center">{error?.message}</h3>
              ) : (
                categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setCategory(category._id)}
                    className="mx-2 my-2 px-4 py-2 text-white bg-gradient-to-r from-green-500 to-blue-500 rounded"
                  >
                    {category.categoryName}
                  </button>
                ))
              )}
            </div> */}

            <div className="flex flex-wrap -mx-4 mb-12 md:mb-20">
              {/* loop */}
              {loading ? (
                <div className="flex justify-center items-center h-full w-full">
                  <Loading />
                </div>
              ) : error ? (
                <h3 className="text-red-500 text-center">{error?.message}</h3>
              ) : posts?.length <= 0 ? (
                <div className="flex justify-center items-center h-full w-full">
                  <h1 className="text-2xl">No Post found</h1>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post._id} className="w-full md:w-1/2 px-4 mb-8">
                    <Link
                      to={`/posts/${post._id}`}
                      className="block mb-6 overflow-hidden rounded-md"
                    >
                      <img className="w-full" src={post?.coverImgUrl} alt={post.title} />
                    </Link>
                    
                    <p className="mb-2 text-coolGray-500 font-medium">
                      {new Date(post?.createdAt).toDateString()}
                    </p>
                    <Link
                      className="inline-block mb-4 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:underline"
                      to={`/posts/${post._id}`}
                    >
                      {post?.title}
                    </Link>
                    <p className="mb-4 text-coolGray-500">
                      {truncatePost(post?.content)}
                    </p>
                       {/* like post button */}
                    <div className="flex  gap-4 items-center">
                      <span
                        className={`flex items-center text-base md:text-lg font-semibold ${likedPosts.includes(post._id)
                            ? "bg-red-600 text-gray-300"
                            : "red"
                          }  text-gray-800  rounded`}
                        onClick={() => handleLikeClick(post._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-6 h-6 mr-1"
                        >
                          <path
                            fillRule=""
                            d="M10 18a1 1 0 01-.656-.244C7.471 15.773 2 11.273 2 6.157A4.455 4.455 0 016.455 2c1.455 0 2.843.735 3.672 1.843A4.454 4.454 0 0113.09 2c2.457 0 4.455 1.998 4.455 4.455 0 5.116-5.47 9.616-7.344 11.6A1 1 0 0110 18zm-1-16C6.14 2 3 5.14 3 9c0 4.411 4.337 8.22 6 9 1.663-.78 6-4.589 6-9 0-3.86-3.14-7-7-7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {likedPosts.includes(post._id)
                          ? "1 Reactions"
                          : " Reactions"}
                      </span>
                      <div className="flex">
                         <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 ml-1 mt-2 text-gray-400 hover:text-gray-600"
                      >
                        <path
                          d="M21 2H3a1 1 0 00-1 1v14a1 1 0 001 1h5.937l2.041 2.775A1 1 0 0012.836 22H21a1 1 0 001-1V3a1 1 0 00-1-1zM12 17.618L8.764 15H4V4h16v11H12.118zM12 12a1 1 0 00-1 1v1a1 1 0 001 1h6.764L12 17.618z"
                        />
                      </svg>
                      Comments
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        {/* Pagination buttons */}
        <div className="flex justify-center items-center my-4 space-x-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
