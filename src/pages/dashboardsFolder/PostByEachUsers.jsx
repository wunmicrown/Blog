import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/Api';
import calculateReadingtime from '../../utils/calculateReadingtime';
import Posts from '../postsFolder/Posts';

const PostByEachUsers = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [tokenMatch, setTokenMatch] = useState(false);
    const [error, setError] = useState(null);
    const [readingTime, setReadingTime] = useState(0);
     //! Get the creator of the post
     const creator = Posts?.Posts?.author?._id?.toString();
     const loginUser = user?._id?.toString(); 
     const isCreator = creator === loginUser;

     const openConfirmationModal = () => {
        setShowConfirmation(true);
    };
    const [loading, setLoading] = useState(true);

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
                setReadingTime(calculateReadingtime(data.posts?.map(post => post.content).join(' ')));
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {user && (
                <div className=''>
                    <div className=' container relative z-10 px-4 mx-auto pt-20'>
                    <div className="md:max-w-5xl mx-auto mb-10 md:mb-16 text-center">
              <span className="inline-block py-px px-2 mb-6 pl-3 pr-3 mt-10 text-md leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                Posts
              </span>
              </div>
                        <div className=''>
                            {posts && posts.length > 0 ? (
                                <div key={posts._id} className='-mt-10'>
                                    <Posts posts={posts} />
                                    {/* delete and update icons */}
                            {isCreator && (
                            <div className="flex justify-end mb-4">
                                {/* edit */}
                                <Link
                                    to={`/update-post/${post?.post?._id}/edit`}
                                    // to={'/create-post'}
                                    className="p-2 mr-2 text-gray-500 hover:text-gray-700"
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
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                    </svg>
                                </Link>
                                {/* delete */}
                                <button
                                    // onClick={deletePostHandler}
                                    onClick={openConfirmationModal}
                                    className="p-2 text-gray-500 hover:text-gray-700"
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
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                             )}
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
        </>
    );
}

export default PostByEachUsers;
