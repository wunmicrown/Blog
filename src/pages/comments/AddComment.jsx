import React, { useCallback, useEffect, useState } from "react";
import CommentsList from "./CommentLists";
import axios from "axios";
import { API_URL } from "../constants/Api";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import { FaHome } from "react-icons/fa";

const AddComment = ({ postId }) => {
  const URL = `${API_URL}/api/v1`;
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ message: "" });
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data: user } = await axios.get(`${URL}/users/getUser`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setUser(user);
      } catch (error) {
        console.log('Error message:', error);
        console.log(error.response);
      }
    };
    fetchUserDetails();
  }, [URL]);

  const fetchComments = useCallback(async () => {
    try {
      setFetching(true); 
      const { data } = await axios.get(`${URL}/comment/get-comments/${postId}`, {
        params: { page, limit: 25 }
      }); 
      setComments(prevComments => [...prevComments, ...data.comments]);
      setFetching(data.currentPage < data.totalPages);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setFetching(false);
    }
  }, [URL, postId, page]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${URL}/comment/create-comment`,
        { postId, content: formData.message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([response.data.commentCreated, ...comments]);
      toast.success("Comment created successfully!");
      setFormData({ message: "" });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScroll = () => {
    // Check if already fetching or no more to load
    if (fetching) return;
  
    // Calculate if the user has scrolled to the bottom
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const reachedBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
  
    if (reachedBottom) {
      // Increment page number
      setPage(prevPage => prevPage + 1);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="bg-white rounded shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-green-600">Comments</h3>
          <div className="mt-5">
            <hr className="mt-5 border-gray-300" />
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                <div className="flex-none">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <div className="border rounded-lg shadow-sm">
                    <div className="p-3 border-b bg-gray-50">
                      <h4 className="text-sm font-medium text-green-600">
                        Add a comment
                      </h4>
                    </div>
                    <div className="p-3">
                      <label htmlFor="comment" className="sr-only">Comment</label>
                      <textarea
                        id="comment"
                        rows={3}
                        className="block w-full mt-1 border-green-50 rounded-md shadow-sm form-textarea focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:outline-none appearance-none"
                        placeholder="Your comment"
                        value={formData.message}
                        onChange={handleChange}
                        name="message"
                      />
                    </div>
                    <div className="flex items-center justify-end px-3 py-2 rounded-b-lg bg-gray-50">
                      <button
                        type="submit"
                        className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-green-500 focus:ring-opacity-50"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <CommentsList comments={comments || []} />
        {/* Show indicator when fetching comments */}
        {fetching ? (  
          <div className="flex justify-center items-center my-4">
            <div className="w-8 h-8 border-4 border-green-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : null}
        {/* Display "Go back up" at the end of comments */}
        {comments.length > 0 && !fetching && (
          <div className="text-center my-4">
            <div className="text-gray-500 cursor-pointer flex justify-center gap-1" onClick={() => window.scrollTo(800, 800)}>
              <p className="text-sm font-medium">No more post</p>
              <FaHome size={20}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
  
};

export default AddComment;




// import React, { useEffect, useState } from "react";
// import CommentsList from "./CommentLists";
// import axios from "axios";
// import { API_URL } from "../constants/Api";
// import { toast } from "react-toastify";

// const AddComment = ({ postId }) => {
//   const URL = `${API_URL}/api/v1`
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data: user } = await axios.get(`${URL}/users/getUser`, {
//           headers: {
//             "Authorization": `Bearer ${token}`
//           }
//         });
//         setUser(user);

//       } catch (error) {
//         console.log('Error message:', error);
//         console.log(error.response);
//       }
//     }
//     fetchUserDetails();
//   }, [])
//   const [formData, setFormData] = useState({
//     message: "",
//   });
//   const [comments, setComments] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       // let authorAvatar = null;
//       // if (user && user.profilePic) {
//       //   authorAvatar = user.profilePic;
//       // }
//       // console.log("authorAvatar",authorAvatar);
//       const response = await axios.post(
//         `${URL}/comment/create-comment`,
//         {
//           postId,
//           content: formData.message,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       // Update comments state with the newly added comment
//       setComments([...comments, response.data.commentCreated]);

//       toast.success("Comment created successfully!");

//       // Clear form data
//       setFormData({ message: "" });
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     }
//   };
 
 
//   useEffect(() => {
//     // Fetch comments for the post when component mounts
//     const fetchComments = async () => {
//       try {
//         const {data} = await axios.get(`${URL}/comment/get-comments/${postId}`);
//         console.log("Get comments",data);
//         setComments(data.comments);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };
//     fetchComments();
//   }, [postId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
  




//   return (
//     <>
//       <div className="bg-white rounded shadow">
//         <div className="px-4 py-5 sm:p-6">
//           <h3 className="text-lg font-medium leading-6 text-green-600">Comments</h3>
//           <div className="mt-5">
//             <hr className="mt-5 border-gray-300" />
//             <form className="mt-4" onSubmit={handleSubmit}>
//               <div className="flex space-x-4">
//                 <div className="flex-none">
//                   <img
//                     src="https://via.placeholder.com/50"
//                     alt="avatar"
//                     className="w-12 h-12 rounded-full"
//                   />
//                 </div>
//                 <div className="flex-grow">
//                   <div className="border rounded-lg shadow-sm">
//                     <div className="p-3 border-b bg-gray-50">
//                       <h4 className="text-sm font-medium text-green-600">
//                         Add a comment
//                       </h4>
//                     </div>
//                     <div className="p-3">
//                       <label htmlFor="comment" className="sr-only">
//                         Comment
//                       </label>
//                       <textarea
//                         id="comment"
//                         rows={3}
//                         className="block w-full mt-1 border-green-50 rounded-md shadow-sm form-textarea focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:outline-none appearance-none"
//                         placeholder="Your comment"
//                         value={formData.message}
//                         onChange={handleChange}
//                         name="message"
//                       />
//                     </div>
//                     <div className="flex items-center justify-end px-3 py-2 rounded-b-lg bg-gray-50">
//                       <button
//                         type="submit"
//                         className="
//                         px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-green-500 focus:ring-opacity-50
//                         "
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//         {/* comment lists */}
//         <CommentsList comments={comments || []} />
//       </div>
//     </>
//   );
// };

// export default AddComment;
