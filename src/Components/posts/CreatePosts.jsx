import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { Card, CardBody, Form, Label, Input, Container, Button } from 'reactstrap';
import axios from 'axios';
import { API_URL } from "../constants/Api";

const CreatePosts = () => {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);
  const [post, setPost] = useState({
    title: '',
    content: '',
    categoryId: null // Set initial state to null
  });
  const [image, setImage] = useState(null);

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
      console.log("Categories Res", response.data);
      setCategories(response.data.categories); // Access categories array from response
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle error
    }
  };

  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
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

    if (!post.categoryId) {
      toast.error("Select some category !!");
      return;
    }

    post['userId'] = user.id;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/posts/create`, post, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log("Posst", response.data);
      toast.success("Post Created !!");
      setPost({ title: '', content: '', category: null });
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
      <Card className="shadow-sm border-0 mt-2 ">
        <CardBody>
          <h3>What's going on in your mind?</h3>
          <Form onSubmit={createPost}>

            <div className="mt-20">
              <Label for="image">Select Post banner</Label>
              <Input id="image" type="file" onChange={handleFileChange} />
            </div>
            <div className="my-3 mt-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0 bg-lime-200 text-gray-400"
                name="title"
                onChange={fieldChanged}
                value={post.title}
              />
            </div>
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryId"
                onChange={fieldChanged}
                value={post.categoryId || ''}
              >
                <option key="0" disabled value={0}>--Select category--</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </Input>

            </div>
            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                className="rounded bg-red-800"
                ref={editor}
                value={post.content}
                onChange={(newContent) => contentFieldChanged(newContent)}
              />
            </div>

            <Container className="text-center text-white">
              <Button type="submit" className="rounded-0 bg-green-500">Create Post</Button>
              <Button className="rounded-0 ms-2 bg-red-500">Reset Content</Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default CreatePosts;
