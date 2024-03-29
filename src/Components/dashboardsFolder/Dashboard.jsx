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
  // const [user, setUser] = useState();
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [errorCategories, setErrorCategories] = useState(null);

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
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    


    fetchPostsByCategory();
  }, [
    page,
    category
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const { data } = await axios.get(`${API_URL}/categories`);
        console.log("Categories", data);
        setCategories(data.categories);
        setLoadingCategories(false);
      } catch (error) {
        setErrorCategories(error);
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);
  // useEffect(() => {
  //   const userDetails = async () => {
  //     try {
  //       const { data } = await axios.get(`${API_URL}/users/getUser`);
  //       console.log("Users", data);
  //       setUser(data.user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   userDetails();
  // },);
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
            <div className="flex flex-wrap justify-center mb-4">
              {categories.map(category => (
                <button
                  key={category._id}
                  onClick={() => setCategory(category._id)}
                  className="mx-2 my-2 px-4 py-2 text-white bg-gradient-to-r from-green-500 to-blue-500 rounded"
                >
                  {category.categoryName}
                </button>
              ))}
            </div>

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
                posts.map((post) => {
                  return (
                    <div key={post._id} className="w-full md:w-1/2 px-4 mb-8">
                      <Link
                        to={``}
                        className="block mb-6 overflow-hidden rounded-md"
                      >
                        <img className="w-full" src={post?.coverImgUrl} />

                      </Link>
                   
                      <p className="mb-2 text-coolGray-500 font-medium">
                        {new Date(post?.createdAt).toDateString()}
                      </p>
                      <Link
                        className="inline-block mb-4 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:underline"
                        to={``}
                      >
                        {post?.title}
                      </Link>
                      <p className="mb-4 text-coolGray-500">
                        {truncatePost(post?.content)}
                      </p>
                      <Link
                        className="inline-flex items-center text-base md:text-lg text-green-500 hover:text-green-600 font-semibold"
                      // to={`/posts/${post?._id}`}
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
