import React, { useEffect, useState } from "react";
import CommentsList from "./CommentLists";
import axios from "axios";
import { API_URL } from "../constants/Api";
import { toast } from "react-toastify";

const AddComment = ({ postId }) => {
  const URL = `${API_URL}/api/v1`
  const [user, setUser] = useState(null);
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
    }
    fetchUserDetails();
  }, [])
  const [formData, setFormData] = useState({
    message: "",
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the post when component mounts
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${URL}/comment/get-comments/${postId}`);
        // console.log(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      let authorAvatar = null;
      if (user && user.profilePic) {
        authorAvatar = user.profilePic;
      }
      const response = await axios.post(
        `${URL}/comment/create-comment`,
        {
          postId,
          content: formData.message,
          authorAvatar: authorAvatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update comments state with the newly added comment
      setComments([...comments, response.data.commentCreated]);

      toast.success("Comment created successfully!");

      // Clear form data
      setFormData({ message: "" });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };




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
                      <label htmlFor="comment" className="sr-only">
                        Comment
                      </label>
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
                        className="
                        px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-green-500 focus:ring-opacity-50
                        "
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
        {/* comment lists */}
        <CommentsList comments={comments || []} />
      </div>
    </>
  );
};

export default AddComment;
