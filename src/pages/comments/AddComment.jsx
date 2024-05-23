import React, { useCallback, useEffect, useState } from "react";
import CommentsList from "./CommentLists";
import axios from "axios";
import { API_URL } from "../constants/Api";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";

const AddComment = ({ postId }) => {
  const URL = `${API_URL}/api/v1`;
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ message: "" });
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

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
      setComments(data.comments);
      setTotalPages(data.totalPages);
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

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
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
        {/* Pagination controls */}
        <div className="flex justify-between items-center my-4">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            Previous
          </button>
          {/* <span className="text-gray-500">Page {page} of {totalPages}</span> */}
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 text-white bg-green-400 rounded hover:bg-green-700 focus:outline-none focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AddComment;
