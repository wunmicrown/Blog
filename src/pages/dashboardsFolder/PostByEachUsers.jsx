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
                console.log(data.posts);
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
        </>
    );
}

export default PostByEachUsers;
