import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/Api';
import { MdEmail, MdVerifiedUser } from 'react-icons/md';
import calculateReadingtime from '../../utils/calculateReadingtime';
import AdminDashboard from '../Admin/AdminDashboard';

const UserDashboard = () => {
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
                console.log('Error message:', error);
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
                                                to={''}
                                            >
                                                <button className='bg-green-500 text-white p-2 rounded-lg hover:bg-green-600'>
                                                    Follow
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
                            {/* <Static user={user} userStats={userStats} /> */}
                            {user && userStats !== null && (
                                <div className='mx-auto w-full max-w-screen-lg mt-16 px-4 text-center'>
                                    <div key={userStats._id} className='flex-row md:grid-cols-2 gap-4 grid lg:grid-cols-3 grid-cols-2'>
                                        <div className='bg-[#5b5c5b] text-white pl-4 pr-6 pt-6 pb-6 rounded-lg'>
                                            <strong className=' text-xl bg-[#82888a] pl-1 pr-1 rounded-lg'>{userStats.totalComments}</strong>
                                            <p className='text-sm whitespace-nowrap'>Total post comments</p>
                                        </div>
                                        <div className='bg-[#5b5c5b] text-white pl-4 pr-6 pt-6 pb-6 rounded-lg'>
                                            <strong className=' text-xl bg-[#82888a] pl-1 pr-1 rounded-lg'>{userStats.totalPostLikes}</strong>
                                            <p className='text-sm whitespace-nowrap'>Total post likes</p>
                                        </div>
                                        <Link to={`/${userStats.authorUsername}/posts`}>
                                            <div className='bg-[#5b5c5b] text-white pl-4 pr-6 pt-6 pb-6 rounded-lg mb-20'>
                                                <strong className=' text-xl bg-[#82888a] pl-1 pr-1 rounded-lg'>{userStats.totalPosts}</strong>
                                                <p className='text-sm whitespace-nowrap font-bold'>Published Posts</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-8">
                            {/* {user && (
                                <div className='mx-auto w-full max-w-screen-sm'>
                                    <div className=' mx-auto text-white h-auto text-center pt-4 max-w-screen-sm px-4 rounded-lg'>

                                        <div className='flex flex-col lg:flex-row lg:gap-7 lg:justify-center md:justify-center md:gap-7 md:flex-row mt-4 md:mt-8 xl:flex-row'>
                                            {latestPosts.length > 0 ? (
                                                <div className='mx-auto w-full max-w-screen-sm mb-20'>

                                                    <div className=' mx-auto text-white h-auto text-start pt-4 max-w-screen-sm px-4 rounded-lg'>
                                                        {latestPosts.map(post => (
                                                            <div key={post.id} className="mb-6 bg-[#5b5c5b] rounded-lg p-4 overflow-y-auto">
                                                                <div className='flex justify-start'>
                                                                    <img className='w-14 h-14 rounded-full' src={post && post.authorProfilePic ? user.authorProfilePic : "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"} alt="Profile Pic" />
                                                                    <div className=' mt-0'>
                                                                        <Link
                                                                            className="inline-block py-1 px-3 text-xs leading-5 text-green-500 hover:text-green-600 font-medium uppercase bg-green-100 hover:bg-green-200 rounded-full shadow-sm"
                                                                            to={`/user/${post.authorId}`}
                                                                        >
                                                                            {post?.authorUsername}
                                                                        </Link>
                                                                        <p className="mb-2 text-gray-300 text-sm font-small hover:text-white mt-2 ml-3">
                                                                            {new Date(post?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <Link
                                                                        className="inline-block mb-4 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:translate-x-1 transition-all duration-300 ease-in-out hover:text-green-300 ml-16"
                                                                        to={`/posts/${post.id}`}
                                                                    >
                                                                        {post?.title}
                                                                    </Link>
                                                                </div>
                                                                <div className="mb-4">
                                                                    {post.tags.map((tag, index) => (
                                                                        <button key={index} className="hover:bg-[#3f6155] hover:border-1 pl-4 pr-4 rounded-sm py-1 hover:border-[#749f8f] hover:text-white hover:cursor-pointer ml-12">
                                                                            <span className='text-green-300'>#</span> {tag}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                                <div className='flex justify-between '>
                                                                    <Link to={`/posts/${post.id}`}>
                                                                        <div className='flex hover:bg-gray-500 rounded-lg p-1'>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24" role="img" aria-labelledby="aes0polvpupav775nujwlpzankc902lu"
                                                                                className="text-white fill-current">
                                                                                <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                                                                                </path>
                                                                            </svg>
                                                                            <span className="inline-block text-white">Add&nbsp;Comment</span>
                                                                        </div>
                                                                    </Link>
                                                                    <div className='flex justify-end lg:justify-end xl:justify-end md:justify-end'>
                                                                        <p className="text-lg text-gray-300 ">{!isNaN(readingTime) ? <span>{readingTime} min read</span> : null}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

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
                            )} */}
                        </div>
                    </div>
              
            </div>
        </>
    );
}

export default UserDashboard;