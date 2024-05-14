import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/Api';
import Loading from '../loading/Loading';
import { Transition } from '@headlessui/react'
import UserPosts from '../UserPosts';
import Posts from '../postsFolder/Posts';


const PostByEachUsers = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [tokenMatch, setTokenMatch] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showConfirmation, setShowConfirmation] = useState(false);
    
     const openConfirmationModal = () => {
        setShowConfirmation(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmation(false);
    };

    useEffect(() => {
        const userDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data: user } = await axios.get(`${API_URL}/api/v1/users/getUser`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setTokenMatch(true);
                setUser(user);
            } catch (error) {
                console.log('Error message:', error.response);
                setTokenMatch(false);
                navigate('/login');
            }
        }
        userDetails();
    }, []);

    const deletePostHandler = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated.');
                return;
            }
            const response = await axios.delete(`${URL}/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                navigate('/profile');
                toast.error("post delete successfully")
                setShowConfirmation(false);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    useEffect(() => {
        const fetchPostDetails = async (categoryName) => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get(`${API_URL}/api/v1/posts/user-Stats`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                     params: { category_id: categoryName },
                });
                setPosts(data.posts);
                console.log("data",data.posts);
            } catch (error) {
                console.error('Error fetching post details:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPostDetails();
        }
    }, [user]);

    
      //! Get the creator of the post
const creator = posts && posts.length > 0 && posts[0].authorId && posts[0].authorId.toString();
// console.log("creator", creator)
const loginUser = user?._id?.toString();
// console.log(loginUser)

const isCreator = creator === loginUser;
console.log("isCreator", isCreator);

  

    if (loading) {
        return <div><Loading/></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {user && (
                <div className=''>
                    <div className=' container relative z-20 px-4 mx-auto pt-20'>
                    <div className="md:max-w-5xl mx-auto mb-10 md:mb-16 text-center">
              <span className="inline-block py-px px-2 mb-6 pl-3 pr-3 mt-10 text-md leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                Posts
              </span>
              </div>

                        <div className=''>
                            {posts && posts.length > 0 ? (
                                <div key={posts._id} className='-mt-10'>
                                    {/* <Posts posts={posts} /> */}
            <UserPosts posts={posts} isCreator={isCreator} openConfirmationModal={openConfirmationModal} />
                                </div>
                                
                            ) : (
                                <div className='mb-20 bg-[#5b5c5b] rounded-lg p-4 overflow-y-auto'>
                                    <div className='flex justify-center'>
                                        <img src={'https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png'} alt="" />
                                    </div>
                                    <div>
                                        <p className=' font-semibold'>
                                            This is where you can manage your posts, but you haven't written anything yet.
                                        </p>
                                        <Link to={'/create-post'}>
                                            <button className='p-2 rounded-md mt-4 bg-green-400 text-white '>
                                                write your first post
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Modal */}
            <Transition
                show={showConfirmation}
                as={Fragment}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <p className="mb-4">Are you sure you want to delete this article?</p>
                        <div className="flex justify-end">
                            <button
                                className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={deletePostHandler} // Call deletePostHandler to delete the post
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                                onClick={closeConfirmationModal} // Close modal without deleting
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
}

export default PostByEachUsers;
