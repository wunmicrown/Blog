import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/Api";
import useCommentsCount from "../comments/useCommentsCount";

const PostStats = ({ postId, initialLikes, initialDislikes, initialCommentsCount }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [dislikes, setDislikes] = useState(initialDislikes || 0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const commentsCount = useCommentsCount(postId, API_URL, initialCommentsCount);

  useEffect(() => {
    const liked = localStorage.getItem(`liked_${postId}`) === "true";
    const disliked = localStorage.getItem(`disliked_${postId}`) === "true";
    const savedLikes = localStorage.getItem(`likes_${postId}`);
    const savedDislikes = localStorage.getItem(`dislikes_${postId}`);

    setUserLiked(liked);
    setUserDisliked(disliked);

    if (savedLikes) {
      setLikes(Number(savedLikes));
    }

    if (savedDislikes) {
      setDislikes(Number(savedDislikes));
    }
  }, [postId]);

  const handleLikePost = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      const response = await axios.put(`${API_URL}/api/v1/posts/likes/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const newLikes = response.data.likes.length;
        const newDislikes = response.data.dislikes.length;

        setLikes(newLikes);
        setDislikes(newDislikes);
        setUserLiked(true);
        setUserDisliked(false);

        localStorage.setItem(`liked_${postId}`, "true");
        localStorage.setItem(`disliked_${postId}`, "false");
        localStorage.setItem(`likes_${postId}`, newLikes.toString());
        localStorage.setItem(`dislikes_${postId}`, newDislikes.toString());
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislikePost = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      const response = await axios.put(`${API_URL}/api/v1/posts/dislikes/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const newLikes = response.data.likes.length;
        const newDislikes = response.data.dislikes.length;

        setLikes(newLikes);
        setDislikes(newDislikes);
        setUserLiked(false);
        setUserDisliked(true);

        localStorage.setItem(`liked_${postId}`, "false");
        localStorage.setItem(`disliked_${postId}`, "true");
        localStorage.setItem(`likes_${postId}`, newLikes.toString());
        localStorage.setItem(`dislikes_${postId}`, newDislikes.toString());
      }
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-2 md:justify-start">
      <button
        className={`flex items-center gap-1 m-2 text-2xl ${userLiked ? "text-blue-500" : "text-gray-400"}`}
        onClick={handleLikePost}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          />
        </svg>
        {likes}
      </button>
      <button
        className={`flex items-center gap-1 m-2 text-2xl ${userDisliked ? "text-red-500" : "text-gray-400"}`}
        onClick={handleDislikePost}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.367 13.5c-.806 0-1.533.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672v1.632a.75.75 0 01-.75.75A2.25 2.25 0 017.5 19.5c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H4.372c-1.026 0-1.945-.694-2.054-1.715A11.953 11.953 0 011.75 11.5c0-2.66.862-5.147 2.649-7.521.388-.482.987-.729 1.605-.729h5.373c.483 0 .964.078 1.423.23l3.114 1.04c.459.153.94.23 1.423.23h3.866M9.75 15h-2.25M18.096 5.25c-.083-.205-.173-.405-.27-.602-.197-.4.078-.898.523-.898h.908c.889 0 1.713.518 1.972 1.368a12 12 0 01.521 3.507c0 1.553-.295 3.036-.831 4.398-.36.898-1.14 1.351-1.973 1.351h-1.053c-.472 0-.745-.556-.5-.96a8.958 8.958 0 011.302-4.665c0-1.194-.232-2.333-.654-3.375z"
          />
        </svg>
        {dislikes}
      </button>
      <div
        className="flex items-center gap-1 m-2 text-2xl text-gray-400">
        {/* Comment icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          >

          </path>
        </svg>
        {commentsCount}comment
      </div>
    </div>
  );
};

export default PostStats;
