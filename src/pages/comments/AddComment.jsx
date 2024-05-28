import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentLists";

const AddComment = ({ postId }) => {
  const URL = `${API_URL}/api/v1`;
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ message: "" });
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingMessage, setEditingMessage] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data: user } = await axios.get(`${URL}/users/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(user);
      } catch (error) {
        console.log("Error message:", error);
        console.log(error.response);
      }
    };
    fetchUserDetails();
  }, [URL]);

  const fetchComments = useCallback(async () => {
    try {
      setFetching(true);
      const { data } = await axios.get(`${URL}/comment/get-comments/${postId}`, {
        params: { page, limit: 25 },
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
      const token = localStorage.getItem("token");
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
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleEditChange = (e) => {
    setEditingMessage(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${URL}/comment/update-comment/${editingCommentId}`,
        { content: editingMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === editingCommentId ? { ...comment, content: editingMessage } : comment
        )
      );
      toast.success("Comment updated successfully!");
      setEditingCommentId(null);
      setEditingMessage("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleEdit = (commentId, currentMessage) => {
    setEditingCommentId(commentId);
    setEditingMessage(currentMessage);
    // Prevent scrolling
    document.body.style.overflow = "hidden";
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingMessage("");
    // Restore scrolling
    document.body.style.overflow = "auto";
  };

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${URL}/comment/delete-comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteConfirmation = (commentId) => {
    setDeleteCommentId(commentId);
    // Prevent scrolling
    document.body.style.overflow = "hidden";
  };

  const handleDeleteCancel = () => {
    setDeleteCommentId(null);
    // Restore scrolling
    document.body.style.overflow = "auto";
  };

  const handleDeleteConfirm = () => {
    if (deleteCommentId) {
      handleDelete(deleteCommentId);
      handleDeleteCancel();
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
        <CommentsList
          comments={comments || []}
          onEdit={handleEdit}
          onDelete={handleDeleteConfirmation}
          userId={user?.username}
        // authorId={postAuthorId} 
        />
        {fetching && (
          <div className="flex justify-center items-center my-4">
            <div className="w-8 h-8 border-4 border-green-500 border-dotted rounded-full animate-spin"></div>
          </div>
        )}
        <div className="flex justify-between items-center my-6 px-2 pb-4">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {editingCommentId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-medium text-green-600 mb-4">Edit Comment</h2>
            <form onSubmit={handleEditSubmit}>
              <textarea
                className="w-full border border-gray-300 p-2 rounded mb-4"
                rows="4"
                value={editingMessage}
                onChange={handleEditChange}
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={handleEditCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteCommentId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-medium text-green-600 mb-4">Confirm Delete</h2>
            <p className=" font-mono text-lg font-semibold">Are you sure you want to delete this comment?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddComment;
