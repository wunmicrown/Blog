import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/Api';

const useCommentsCount = (postId, URL, initialCommentsCount) => {
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount || 0);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/comment/get-comments/${postId}`);
        setCommentsCount(data.totalComments);
      } catch (error) {
        console.error("Error fetching comments count:", error);
      }
    };
    fetchCommentsCount();

  }, [postId, URL]);

  return commentsCount;
};

export default useCommentsCount;
