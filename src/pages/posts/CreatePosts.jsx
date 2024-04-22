import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { Card, CardBody, Form, Input, Container, Button } from 'reactstrap';
import axios from 'axios';
import { API_URL } from "../constants/Api";
import { MdFileUpload } from "react-icons/md";

const CreatePosts = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: null
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
    // Update the content field in the post state with the new content
    setPost({ ...post, content: newContent });
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
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

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/v1/posts/create`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
      toast.success("Post Created !!");
      setPost({ title: '', content: '', category: null });
      setImage(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error("Post not created due to some error !!");
    }
  }

  return (
    <div className="  bg-green-50 overflow-x-hidden">
      <div className="wrapper min-h-screen">
        <Card className=" p-4 shadow-sm border-0 mt-2 bg-[#3d3d3e] w-full lg:w-[90%] xl:w-[80%] mx-auto">
          <CardBody>
            <Form onSubmit={createPost}>
              <div className=" lg:pt-24 sm:pt-24 md:pt-24 pt-24 flex justify-end  mr-16">
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
              <div className="ml-4 lg:ml-16 px-4 lg:px-8">
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
