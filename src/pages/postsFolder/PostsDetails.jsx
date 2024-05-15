import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PostStats from './PostStats';
import AddComment from '../comments/AddComment';
import Loading from '../loading/Loading';
import { API_URL } from '../constants/Api';
import calculateReadingtime from '../../utils/calculateReadingtime';

const PostsDetails = () => {
    const URL = `${API_URL}/api/v1/posts`;
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const readingTime = calculateReadingtime(post?.post?.content);
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data: user } = await axios.get(`${API_URL}/api/v1/users/getUser`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setUser(user);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
        fetchUserDetails();
    }, []);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                setLoading(true);
                if (!postId) {
                    throw new Error('postId is undefined');
                }
                const token = localStorage.getItem('token');
                const response = await axios.get(`${URL}/${postId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setPost(response.data);
                setLoading(false);
                setLikes(response.data.post.likes.length);
                setDislikes(response.data.post.dislikes.length);
            } catch (error) {
                console.error('Error fetching post details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [postId, URL]);

    const handleLikePost = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated.');
                return;
            }
            const response = await axios.put(`${URL}/posts/likes/${postId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                // Update likes count based on the response data
                setLikes(response.data.likes.length);
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    const handleDislikePost = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated.');
                return;
            }
            const response = await axios.put(`${URL}/posts/dislikes/${postId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                // Update dislikes count based on the response data
                setDislikes(response.data.dislikes.length);
            }
        } catch (error) {
            console.error('Error disliking post:', error);
        }
    };








    if (loading) {
        return <div><Loading /></div>;
    }

    if (error || !post) {
        return <div>Error: Unable to fetch post details</div>;
    }
   
    return (
        <>
            {error ? (
                <ErrorMsg message={error?.message} />
            ) : (
                <section
                    className="py-16 bg-white md:py-24" >
                    <div className="container px-4 mx-auto">
                        <div className="mx-auto mb-12 text-center md:max-w-2xl">
                            <img
                                className="w-full h-60 mx-auto mb-4"
                                src={post?.post?.coverImgUrl}
                                alt="post image"
                            />
                            <Link
                                to={''}
                                className="flex items-center justify-start mx-2 text-left"
                            >
                                <div className="px-2 flex justify-between w-full ">
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        alt="author image"
                                        src={
                                            post?.post?.author?.profilePic ||
                                            "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
                                        }
                                    />
                                    <div className='flex justify-between w-full'>
                                        <div className="w-auto px-2">
                                            <h4 className="text-base font-bold md:text-lg text-coolGray-800">
                                                {post?.post?.author?.username}
                                            </h4>
                                            <span className="mx-1 text-green-500">•</span>
                                            <p className="inline-block font-medium text-green-500 hover:text-green-600">
                                                posted on {new Date(post?.post?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-1g text-gray-500 font-bold"><span className='text-1xl text-'>{readingTime}</span> min read</p>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm">
                                {post?.post?.category?.name}
                            </div>
                            <div className="flex items-center justify-center">

                            </div>
                            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-darkCoolGray-900">
                                {post?.post?.title}
                            </h2>
                            <div className=' ml-6 flex items-center mb-6 gap-8 text-sm md:text-base font-small text-coolGray-500 mt-2'>
                                <div className='hover:bg-[#3e5b50] hover:border-1 pl-4 pr-4 rounded-sm py-1 hover:border-[#019b65] hover:text-white hover:cursor-pointer'><span className='text-green-300'>#</span>{post?.post?.tags}</div>
                            </div>

                        </div>
                    </div>


                    <div>
                    </div>

                    <div className="container px-4 mx-auto">
                        <div className="mx-auto md:max-w-3xl">

                            <div className="  text-lg font-medium  md:text-xl text-coolGray-500 border-coolGray-100">
                                <div dangerouslySetInnerHTML={{ __html: (post?.post?.content) }}></div>
                            </div>
                            {/* Posts stats */}
                            <PostStats
                                likes={likes}
                                dislikes={dislikes}
                                commentsCount={post.post.comments.length} // Update with actual comment count from the post object
                                postId={postId}
                                handleLike={handleLikePost} // Pass like handler function
                                handleDislike={handleDislikePost} // Pass dislike handler function
                            />

                            <div className='mt-8 mb-16'>
                                <hr />

                            </div>
                            <h3 className="mb-4 text-2xl font-semibold md:text-3xl text-coolGray-800">
                                Add a comment
                            </h3>

                            {/* Comment form */}
                            <AddComment postId={postId} comments={post?.post?.comments} />

                        </div>
                    </div>

                </section>
            )}

        </>
    );
}

export default PostsDetails