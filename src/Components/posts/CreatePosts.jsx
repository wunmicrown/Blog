import { useState } from "react"
import { useEffect } from "react"
import JoditEditor from "jodit-react"
import { useRef } from "react"
import { toast } from "react-toastify"
const CreatePosts = () => {

    const editor = useRef(null)
    // const [content,setContent] =useState('')
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState(undefined)

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    const [image, setImage] = useState(null)


    useEffect(
        () => {

            setUser(getCurrentUserDetail())
            loadAllCategories().then((data) => {
                console.log(data)
                setCategories(data)
            }).catch(error => {
                console.log(error)
            })
        },
        []
    )

    //field changed function
    const fieldChanged = (event) => {
        // console.log(event)
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    const contentFieldChanaged = (data) => {

        setPost({ ...post, 'content': data })


    }


    //create post function
    const createPost = (event) => {

        event.preventDefault();

        // console.log(post)
        if (post.title.trim() === '') {
            toast.error("post  title is required !!")
            return;
        }

        if (post.content.trim() === '') {
            toast.error("post content is required !!")
            return
        }

        if (post.categoryId === '') {
            toast.error("select some category !!")
            return;
        }


        //submit the form one server
        post['userId'] = user.id
        doCreatePost(post).then(data => {


            uploadPostImage(image,data.postId).then(data=>{
                toast.success("Image Uploaded !!")
            }).catch(error=>{
                toast.error("Error in uploading image")
                console.log(error)
            })



            toast.success("Post Created !!")
            // console.log(post)
            setPost({
                title: '',
                content: '',
                categoryId: ''
            })
        }).catch((error) => {
            toast.error("Post not created due to some error !!")
            // console.log(error)
        })

    }

    //handling file chagne event
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }


    return (
        <div className="wrapper">
            <Card className="shadow-sm  border-0 mt-2">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>What going in your mind ?</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title" >Post title</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Enter here"
                                className="rounded-0"
                                name="title"
                                onChange={fieldChanged}
                            />
                        </div>

                        <div className="my-3">
                            <Label for="content" >Post Content</Label>
                            {/* <Input
                                type="textarea"
                                id="content"
                                placeholder="Enter here"
                                className="rounded-0"
                                style={{ height: '300px' }}
                            /> */}

                            <JoditEditor
                                ref={editor}
                                value={post.content}

                                onChange={(newContent) => contentFieldChanaged(newContent)}
                            />
                        </div>

                        {/* file field  */}

                        <div className="mt-3">
                            <Label for="image">Select Post banner</Label>
                            <Input id="image" type="file" onChange={handleFileChange} />
                        </div>




                        <div className="my-3">
                            <Label for="category" >Post Category</Label>
                            <Input
                                type="select"
                                id="category"
                                placeholder="Enter here"
                                className="rounded-0"
                                name="categoryId"
                                onChange={fieldChanged}
                                defaultValue={0}

                            >

                                <option disabled value={0} >--Select category--</option>

                                {

                                    categories.map((category) => (
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))

                                }



                            </Input>
                        </div>



                        <Container className="text-center">
                            <Button type="submit" className="rounded-0" color="primary">Create Post</Button>
                            <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                        </Container>


                    </Form>


                </CardBody>

            </Card>




        </div>
    )
}

export default CreatePosts

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL } from '../constants/Api';

// const CreatePost = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [category, setCategory] = useState(''); // Add state for category
//   const navigate = useNavigate();
//   const URL = `${API_URL}/posts/create`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error("User is not authenticated.");
//         return;
//       }

//       const response = await axios.post(URL, { title, content, category }, { // Include category in request body
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log("Create Posts", response);

//       if (response.status === 201) {
//         console.log('Post created successfully');
//         navigate('/posts');
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <>
//     <div className='mt-20 flex justify-center h-screen'>
//       <h2>Create a New Post</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             className='bg-green-200'
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Content:</label>
//           <textarea
//             className='bg-gray-200'
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <div> {/* Add a field for selecting or inputting the category */}
//           <label>Category:</label>
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className='bg-green-500 text-white'>Create Post</button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default CreatePost;
