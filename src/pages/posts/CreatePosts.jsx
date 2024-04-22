import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { Card, CardBody, Form, Input, Container, Button } from 'reactstrap';
import axios from 'axios';
import { API_URL } from "../constants/Api";
import { MdFileUpload, MdCancel } from "react-icons/md";

const CreatePosts = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tags, setTags] = useState('');
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: null,
    tags: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data: user } = await axios.get(`${API_URL}/api/v1/users/getUser`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
    loadAllCategoriesFromBackend();
  }, []);

  const loadAllCategoriesFromBackend = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fieldChanged = (event) => {
    if (event.target.name === 'category') {
      setPost({ ...post, category: event.target.value });
    } else {
      setPost({ ...post, [event.target.name]: event.target.value });
    }
  }

  const contentFieldChanged = (newContent) => {
    setPost({ ...post, content: newContent });
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  const handleTagChange = (event) => {
    setTags(event.target.value);
  }

  const addTag = () => {
    if (tags.trim() !== '' && post.tags.length < 5) {
      setPost({ ...post, tags: [...post.tags, tags] });
      setTags('');
    } else {
      toast.error("Only 5 selections allowed");
    }
  }


  const removeTag = (index) => {
    const updatedTags = post.tags.filter((tag, i) => i !== index);
    setPost({ ...post, tags: updatedTags });
  }

  const createPost = async (event) => {
    event.preventDefault();

    if (post.title.trim() === '') {
      toast.error("Post title is required !!");
      return;
    }

    if (post.content.trim() === '') {
      toast.error("Post content is required !!");
      return;
    }

    if (!post.category) {
      toast.error("Select some category !!");
      return;
    }

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('category', post.category);
    formData.append('userId', user._id);
    if (image) {
      formData.append('image', image);
    }
    formData.append('tags', post.tags.join(','));

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/v1/posts/create`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
      toast.success("Post Created !!");
      setPost({ title: '', content: '', category: null, tags: [] });
      setImage(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error("Post not created due to some error !!");
    }
  }

  const handleEditClick = () => {
    // Navigate to edit page or perform edit action here
    console.log("Edit button clicked");
  }

  const handlePreviewClick = () => {
    // Navigate to preview page or show preview modal here
    console.log("Preview button clicked");
  }

  return (
    <div className="  bg-green-50 overflow-x-hidden">
      <div className="wrapper min-h-screen">

        <Card className=" p-4 shadow-sm border-0 bg-[#3d3d3e] w-full lg:w-[90%] xl:w-[80%] mx-auto">
          <CardBody>
            <div className=" text-white mt-20 gap-4 flex justify-end mr-16">
              <button onClick={handleEditClick} className="p-4 rounded-sm hover:text-green-400 font-semibold  hover:cursor-pointer">
                Edit
              </button>
              <button onClick={handlePreviewClick} className="p-4 rounded-sm hover:text-green-400 font-semibold  hover:cursor-pointer">
                Preview
              </button>
            </div>
            <Form onSubmit={createPost}>
              <div className=" lg:pt-10 sm:pt-10 md:pt-10 flex justify-end mr-16">
                <label htmlFor="image" className=" p-4 relative cursor-pointer border-4 border-gray-200 text-[#D6D6D7] bg-[#171717] rounded-md ">
                  <input id="image" type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Selected Image" className="w-full h-70 rounded-md" />
                  ) : (
                    <div className="flex items-center">
                      <MdFileUpload size={24} className="mr-2" />
                      <span className="font-bold ">Add a cover image</span>
                    </div>
                  )}
                </label>
              </div>
              <div className="my-3 mt-8 ml-4 lg:ml-16 p-4 lg:p-8">
                <label htmlFor="title" className="text-gray-200 font-xl text-lg mb-4">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="New post title here..."
                  className="bg-transparent font-medium placeholder-gray-200 hover:placeholder-green-500 focus:border-green-500 appearance-none border-2 w-full py-3 px-3 rounded text-gray-200 leading-tight focus:outline-none"
                  name="title"
                  onChange={fieldChanged}
                  value={post.title}
                  style={{ wordBreak: 'break-all' }}
                />
              </div>
              <div className="my-3 ml-4 lg:ml-16 p-4">
                <label htmlFor="title" className="text-gray-200 font-xl text-lg mb-4">Tags</label>
                <div className="flex">
                  <input
                    type="text"
                    id="tags"
                    placeholder="Add up to 5 tags..."
                    className="bg-transparent font-medium placeholder-gray-200 hover:placeholder-green-500 focus:border-green-500 appearance-none border-2 w-full py-3 px-3 rounded text-gray-200 leading-tight focus:outline-none"
                    name="tags"
                    onChange={handleTagChange}
                    value={tags}
                  />
                  <button type="button" onClick={addTag} className="flex items-center bg-green-500 text-white px-2 py-1 mt-2 rounded-md ml-2">
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M19 10a1 1 0 01-1 1h-7v7a1 1 0 11-2 0v-7H2a1 1 0 110-2h7V2a1 1 0 112 0v7h7a1 1 0 011 1z" clipRule="evenodd" />
                    </svg>
                    <span>Add</span>
                  </button>

                </div>
              </div>
              {post.tags.length > 0 && (
                <div className="ml-4 lg:ml-16 px-4 lg:px-8">
                  <div className="flex flex-wrap">
                    {post.tags.map((tag, index) => (
                      <button key={index} className="bg-[#2a2929] mb-5 p-4 shadow-lg text-white px-2 py-1 mt-2 rounded-md mr-2 flex items-center">
                        #{tag}

                        <MdCancel size={24} className="ml-1 hover:text-red-600" onClick={() => removeTag(index)} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className=" ml-4 lg:ml-16 px-4 lg:px-8">
                <Input
                  type="select"
                  placeholder="Enter here"
                  className="rounded border-4 border-gray-200 text-[#D6D6D7] focus:outline-none cursor-pointer w-full lg:w-56 bg-[#171717] p-2"
                  name="category"
                  onChange={fieldChanged}
                  value={post.category || ''}
                  style={{ appearance: 'none' }}
                >
                  <option key="0" className="cursor-pointer">Select category</option>
                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category._id}
                      className="cursor-pointer"
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </Input>
              </div>
              <div className="my-8 px-4 lg:px-8 ">
                <h2 htmlFor="content" className="text-gray-200 font-bold flex justify-center py-4">Content</h2>
                <JoditEditor
                  className="rounded p-4 lg:p-8 h-96 lg:h-auto"
                  ref={editor}
                  value={post.content}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={contentFieldChanged}
                />
              </div>

              <Container className="text-start text-white pb-8 ml-4 lg:ml-16">
                <Button type="submit" className="rounded-lg bg-green-500 font-medium text-lg hover:bg-green-300 p-2">Publish</Button>
                <Button className="rounded-sm ms-2 text-gray-200 p-2 font-medium hover:rounded-lg hover:bg-green-400 hover:text-white">Save draft</Button>
              </Container>
            </Form>

          </CardBody>
        </Card>
      </div>
    </div>

  );
}

export default CreatePosts;
