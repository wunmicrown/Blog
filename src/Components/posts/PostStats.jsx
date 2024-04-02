import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/Api";

const PostStats = ({ postId, initialLikes, initialDislikes }) => {
  const [likes, setLikes] = useState(
    initialLikes || parseInt(localStorage.getItem("likes")) || 0
  );
  const [dislikes, setDislikes] = useState(
    initialDislikes || parseInt(localStorage.getItem("dislikes")) || 0
  );
  const URL = `${API_URL}`;

  useEffect(() => {
    localStorage.setItem("likes", likes);
    localStorage.setItem("dislikes", dislikes);
  }, [likes, dislikes]);

  const likePostHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      const response = await axios.put(
        `${URL}/posts/likes/${postId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Like", response);
      if (response.status === 200) {
        setLikes(likes + 1, "Reactions");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const dislikePostHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      const response = await axios.put(
        `${URL}/posts/dislikes/${postId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Dislike", response);
      if (response.status === 200) {
        setDislikes(dislikes + 1);
      }
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-start gap-2 p-2 md:justify-start">
        {/* like post button */}
        <button
          onClick={likePostHandler}
          className="flex items-center gap-1 m-2 text-2xl text-gray-400"
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

          {likes}
        </button>

        {/* dislikes */}
        {/* <button
          onClick={dislikePostHandler}
          className="flex items-center gap-1 m-2 text-2xl text-gray-400"
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
              d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08H18.75M12 9V6"
            />
          </svg>

          {dislikes}
        </button> */}
      </div>
    </>
  );
};

export default PostStats;
