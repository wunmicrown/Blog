import { useState, useEffect } from 'react';
import axios from 'axios';

const useCommentsCount = (postId, URL,initialCommentsCount) => {
    const [commentsCount, setCommentsCount] = useState(initialCommentsCount || 0);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const { data } = await axios.get(`${URL}/comment/get-comments/${postId}`);
        setCommentsCount(data.commentsCount);
      } catch (error) {
        console.error("Error fetching comments count:", error);
      }
    };

    fetchCommentsCount();

    // Cleanup function
    return () => {
      // Cleanup logic if needed
    };
  }, [postId, URL]);

  return commentsCount;
};

export default useCommentsCount;
