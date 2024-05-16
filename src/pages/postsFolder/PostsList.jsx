import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Api";
import Loading from "../loading/Loading";
import Category from "../category folder/Category";
import Posts from "./Posts";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [trendingPublishedPosts, setTrendingPublishedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchPostsByCategory = async (categoryName) => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/posts`, {
          params: { category_id: categoryName, status: 'published' },
        });
        console.log(data)
        const { latestPublishedPosts, trendingPublishedPosts} = data;
        setPosts(latestPublishedPosts);
        if (trendingPublishedPosts) {
          setTrendingPublishedPosts(trendingPublishedPosts);
        }
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    };

    fetchPostsByCategory();
  }, [page, category]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/categories`);
        setCategories(data.categories);
        setLoadingCategories(false);
        setError(null);
      } catch (error) {
        setError(error);
        setLoadingCategories(false);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    };

    fetchCategories();
  }, []);

  // const handleLikeClick = (postId) => {
  //   setLikedPosts((prevLikedPosts) => {
  //     if (prevLikedPosts.includes(postId)) {
  //       return prevLikedPosts.filter((id) => id !== postId);
  //     } else {
  //       return [...prevLikedPosts, postId];
  //     }
  //   });
  // };

  return (
    <>
      <Category />
      <div className="container relative z-10 px-4 mx-auto">
        <section className="relative bg-white">
          <div className="container px-4 mx-auto">
            <div className="md:max-w-5xl mx-auto mb-10 md:mb-16 text-center">
              <span className="inline-block py-px px-2 mb-6 mt-10 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                Blog
              </span>
              <h3 className="mb-0 text-1xl md:text-2xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                Read our Trending Articles
              </h3>
            </div>
            {loading ? (
              <Loading />
            ) : error ? (
              <div className="text-red-500 text-center">{error?.message}</div>
            ) : trendingPublishedPosts.length === 0 ? (
              <div className="text-center text-lg font-md text-gray-500 mb-6">No Trending Articles yet</div>
            ) : (
              <Posts posts={trendingPublishedPosts} />
            )}
          </div>

          <div>
            <div className="md:max-w-5xl mx-auto mb-8 md:mb-10 text-center">
              <h3 className="mb-0 text-1xl md:text-2xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                Read our Latest Articles
              </h3>
            </div>
            {loading ? (
              <div>
                {/* <Loading /> */}
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">{error?.message}</div>
            ) : posts.length === 0 ? (
              <div className="text-center text-lg font-sm text-gray-500">No Latest Articles yet</div>
            ) : (
              <Posts posts={posts} />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PostsList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { API_URL } from "../constants/Api";
// import Loading from "../loading/Loading";
// import Category from "../category folder/Category";
// import Posts from "./Posts";

// const PostsList = () => {
//   const [posts, setPosts] = useState([]);
//   const [trendingPosts, setTrendingPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [category, setCategory] = useState("");
//   const [page, setPage] = useState(1);
//   const [categories, setCategories] = useState([]);
//   const [likedPosts, setLikedPosts] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(false);

//   useEffect(() => {
//     const fetchPostsByCategory = async (categoryName) => {
//       setLoading(true);
//       try {
//         const { data } = await axios.get(`${API_URL}/api/v1/posts`, {
//           params: { category_id: categoryName },
//         });
//         const { latestPosts, trendingPosts } = data;
//         setPosts(latestPosts);
//         if (trendingPosts) {
//           setTrendingPosts(trendingPosts);
//         }
//         setLoading(false);
//         setError(null); 
//       } catch (error) {
//         setError(error);
//         setLoading(false); 
    
//         setTimeout(() => {
//           setError(null);
//         }, 5000);
//       }
//     };

//     fetchPostsByCategory();
//   }, [page, category]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoadingCategories(true);
//       try {
//         const { data } = await axios.get(`${API_URL}/api/v1/categories`);
//         setCategories(data.categories);
//         setLoadingCategories(false);
//         setError(null);
//       } catch (error) {
//         setError(error);
//         setLoadingCategories(false);
//         // Clear error after 5 seconds
//         setTimeout(() => {
//           setError(null);
//         }, 5000);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleLikeClick = (postId) => {
//     setLikedPosts((prevLikedPosts) => {
//       if (prevLikedPosts.includes(postId)) {
//         return prevLikedPosts.filter((id) => id !== postId);
//       } else {
//         return [...prevLikedPosts, postId];
//       }
//     });
//   };

//   return (
//     <>
//       <Category />
//       <div className="container relative z-10 px-4 mx-auto">
//         <section className="relative bg-white">
//           <div className="container px-4 mx-auto">
//             <div className="md:max-w-5xl mx-auto mb-10 md:mb-16 text-center">
//               <span className="inline-block py-px px-2 mb-6 mt-10 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
//                 Blog
//               </span>
//               {/* Trending Articles */}
//               <h3 className="mb-0 text-1xl md:text-2xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
//                 Read our Trending Articles
//               </h3>
//             </div>
//             {loading ? (
//               <Loading />
//             ) : error ? (
//               <div className="text-red-500 text-center">{error?.message}</div>
//             ) : trendingPosts.length === 0 ? (
//               <div className="text-center text-lg font-md text-gray-500 mb-6">No Trending Articles yet</div>
//             ) : (
//               <Posts posts={trendingPosts} />
//             )}
//           </div>

//           <div>
//             <div className="md:max-w-5xl mx-auto mb-8 md:mb-10 text-center">
//               {/* Latest Articles */}
//               <h3 className="mb-0 text-1xl md:text-2xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
//                 Read our Latest Articles
//               </h3>
//             </div>
//             {loading ? (
//               <div>
//                   {/* <Loading /> */}
//               </div>
//             ) : error ? (
//               <div className="text-red-500 text-center">{error?.message}</div>
//             ) : posts.length === 0 ? (
//               <div className="text-center text-lg font-sm text-gray-500 ">No Latest Articles yet</div>
//             ) : (
//               <Posts posts={posts} />
//             )}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default PostsList;
