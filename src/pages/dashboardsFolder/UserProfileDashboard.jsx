import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/Api';
import { MdEmail, MdVerifiedUser } from 'react-icons/md';
import Posts from '../postsFolder/Posts';
import calculateReadingtime from '../../utils/calculateReadingtime';

const UserProfileDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tokenMatch, setTokenMatch] = useState(false);
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const readingTime = posts && posts.latestPosts ? calculateReadingtime(posts.latestPosts.map(post => post.content).join(' ')) : 0;


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
                setIsAdmin(user && user.userType === 'Admin');
            } catch (error) {
                console.log('Error message:', error);
                console.log(error.response);
                setTokenMatch(false);
                navigate('/login');
            }
        }
        userDetails();
    }, []);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/api/v1/posts`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching post details:', error);
                setError(error);
            }
        };

        if (user) {
            fetchPostDetails();
        }
    }, [user]);

    return (
        <>
            <div className=' bg-green-50 h-auto'>
                {isAdmin ? (
                    <div className="pt-20 border flex text-center lg:mt-0">
                        {/* Render admin-specific information */}
                        <p className=" flex items-center">Admin Only Information</p>
                    </div>
                ) : (
                    <div className="mt-2 lg:mt-0">
                        <div className="pt-20 relative">
                            {user && (
                                <div className='mx-auto w-full max-w-screen-lg'>
                                    <div className='flex md:justify-center lg:justify-center sm:justify-start xl:justify-center  '>
                                        <img className='w-24 h-24 rounded-full' src={user.profilePic ||
                                            "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"} alt="Profile Pic" />
                                    </div>
                                    <div className='bg-[#5b5c5b] mx-auto w-full text-white h-auto text-center pt-4 p-20 max-w-screen-lg px-4 rounded-lg'>
                                        <p className='pt-8 font-bold text-xl flex md:justify-center lg:justify-center sm:justify-start xl:justify-center'>{user.username}</p>
                                        <div className='flex justify-end lg:justify-end xl:justify-end md:justify-end'>
                                            <Link
                                                to={'/settings/profile'}
                                            >
                                                <button className='bg-green-500 text-white p-2 rounded-lg hover:bg-green-600'>
                                                    Edit profile
                                                </button>
                                            </Link>
                                        </div>
                                        <div className='flex flex-col lg:flex-row lg:gap-7 lg:justify-center md:justify-center md:gap-7 md:flex-row mt-4 md:mt-8 xl:flex-row'>
                                            <div className='flex items-center'>
                                                <MdVerifiedUser size={30} />
                                                <p className='ml-2'>EmailVerified {user.isEmailVerified ? ": Verified" : null}</p>
                                            </div>
                                            <div className='flex items-center mt-2 lg:mt-0'>
                                                <MdEmail size={30} />
                                                <p className='ml-2 cursor-pointer hover:text-green-400'>{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-8">
                            {user && (
                                <div className='mx-auto w-full max-w-screen-sm'>
                                    <div className='bg-[#5b5c5b] mx-auto text-white h-auto text-center pt-4 max-w-screen-sm px-4 rounded-lg'>
                                        <div className='flex justify-start'>
                                            <img className='w-14 h-14 rounded-full' src={user && user.profilePic ? user.profilePic : "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"} alt="Profile Pic"
                                            />
                                            <p className='ml-2 font-semibold text-small flex md:justify-center lg:justify-center sm:justify-start xl:justify-center'>{user.username}</p>
                                        </div>
                                        <div className='flex flex-col lg:flex-row lg:gap-7 lg:justify-center md:justify-center md:gap-7 md:flex-row mt-4 md:mt-8 xl:flex-row'>
                                            {posts && posts.latestPosts && posts.latestPosts.length > 0 ? (
                                                <div className='mx-auto w-full max-w-screen-sm'>
                                                    <div className='bg-[#5b5c5b] mx-auto text-white h-auto text-center pt-4 max-w-screen-sm px-4 rounded-lg'>
                                                        <Posts posts={posts.latestPosts} />
                                                        <div className='flex justify-end lg:justify-end xl:justify-end md:justify-end'>
                                                            <p className="text-lg text-yellow-500 font-bold">{!isNaN(readingTime) ? <span>{readingTime} Min</span> : null}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='mb-20'>
                                                    <div className='flex justify-center'>
                                                        <img src={'https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png'} alt="" />
                                                    </div>
                                                    <div>
                                                        <p>
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
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default UserProfileDashboard;
