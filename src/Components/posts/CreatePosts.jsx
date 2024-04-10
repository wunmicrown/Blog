import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { Card, CardBody, Form, Input, Container, Button } from 'reactstrap';
import axios from 'axios';
import { API_URL } from "../constants/Api";

const CreatePosts = () => {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState('');
  const [image, setImage] = useState('');
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data: user } = await axios.get(`${API_URL}/users/getUser`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setUser(user);
        // console.log("User", user);
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error
      }
    };

    fetchData();
    loadAllCategoriesFromBackend();
  }, []);

  const loadAllCategoriesFromBackend = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      // console.log("Categories Res", response.data);
      setCategories(response.data.categories); // Access categories array from response
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle error
    }
  };

  const fieldChanged = (event) => {
    if (event.target.name === 'category') {
      setPost({ ...post, category: event.target.value });
    } else {
      setPost({ ...post, [event.target.name]: event.target.value });
    }
  }

  const contentFieldChanged = (data) => {
    setPost({ ...post, 'content': data });
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

    // Create a new FormData object
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
      const response = await axios.post(`${API_URL}/posts/create`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
      console.log("Post", response.data);
      toast.success("Post Created !!");
      setPost({ title: '', content: '', category: null });
      setImage(null); // Reset image state to null

    } catch (error) {
      console.error('Error creating post:', error);
      toast.error("Post not created due to some error !!");
    }
  }



  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  }

  return (
    <div className="wrapper h-screen">
      <Card className="shadow-sm border-0 mt-2 bg-[#F5F5F6]">
        <CardBody>
          <Form onSubmit={createPost}>

            <div className="pt-28 ml-16">
              <label htmlFor="image" className="relative cursor-pointer  border-4 border-gray-200 text-[#D6D6D7] bg-[#504d4d] rounded-md p-2">
                <input id="image" type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                {image ? (
                  <span className="">{image.name}</span>
                ) : (
                  <span className="font-bold ">Add a cover image</span>
                )}
              </label>
            </div>

            <div className="my-3 mt-10 ml-16">
              <input
                type="text"
                id="title"
                placeholder="New post title here..."
                className="outline-none bg-transparent text-gray-700 font-extrabold text-2xl py-2 px-3 "
                name="title"
                onChange={fieldChanged}
                value={post.title}
              />
            </div>

            <div className="my-3 ml-16">
              <Input
                type="select"
                placeholder="Enter here"
                className="rounded-0 border-4 border-gray-200 text-[#D6D6D7] bg-[#504d4d] rounded-md p-2"
                name="category"
                onChange={fieldChanged}
                value={post.category || ''}
              >
                <option
                  key="0"
                // disabled value={0}
                >
                  --Select category--
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}> {/* Use category._id as value */}
                    {category.categoryName}
                  </option>
                ))}

              </Input>

            </div>
            <div className="my-3">
              <JoditEditor
                className="rounded p-8"
                ref={editor}
                value={post.content}
                onChange={(newContent) => contentFieldChanged(newContent)}
              />
            </div>

            <Container className="text-start text-white ml-10 pb-8">
              <Button type="submit" className="rounded-lg bg-green-500 font-medium text-lg hover:bg-green-300 p-2">Publish</Button>
              <Button className="rounded-sm ms-2 text-gray-600 p-2 font-medium hover:rounded-lg hover:bg-green-400 hover:text-white">Save draft</Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default CreatePosts;
