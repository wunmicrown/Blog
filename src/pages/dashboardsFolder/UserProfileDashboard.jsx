import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/Api';
import { MdEmail, MdVerifiedUser } from 'react-icons/md';
import calculateReadingtime from '../../utils/calculateReadingtime';
import AdminDashboard from '../Admin/AdminDashboard';
import Static from './Static';

const UserProfileDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [tokenMatch, setTokenMatch] = useState(false);
    const [latestPosts, setLatestPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [readingTime, setReadingTime] = useState(0);

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
                const { data } = await axios.get(`${API_URL}/api/v1/posts/user-Stats`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setLatestPosts(data.latestPosts || []);
                setUserStats(data.userStats);
                setReadingTime(calculateReadingtime(data.latestPosts?.map(post => post.content).join(' ')));
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
            <div className=' bg-green-50 h-screen'>
                {isAdmin ? (
                    <div>
                        <AdminDashboard />
                    </div>
                ) : (
                    <div className="mt-2 lg:mt-0">
                        <div className="pt-20 relative">
                            {user && (
                                <div className='mx-auto w-full max-w-screen-lg px-4'>
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
                        <div className="">
                            <Static user={user} userStats={userStats} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default UserProfileDashboard;