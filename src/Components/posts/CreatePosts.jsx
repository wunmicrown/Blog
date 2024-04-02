import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants/Api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(''); // Add state for category
  const navigate = useNavigate();
  const URL = `${API_URL}/posts/create`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      const response = await axios.post(URL, { title, content, category }, { // Include category in request body
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Create Posts", response);

      if (response.status === 201) {
        console.log('Post created successfully');
        navigate('/posts');
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
    <div className='mt-20 flex justify-center h-screen'>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            className='bg-green-200'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            className='bg-gray-200'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div> {/* Add a field for selecting or inputting the category */}
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='bg-green-500 text-white'>Create Post</button>
      </form>
    </div>
    </>
  );
};

export default CreatePost;
