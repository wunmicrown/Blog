import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants/Api';
import Loading from '../loading/Loading';

const PostsDetails = () => {
    const URL = `${API_URL}/posts`;
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data: user } = await axios.get(`${API_URL}/users/getUser`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setUser(user); // Initialize image source

            } catch (error) {
                console.log('Error message:', error);
                console.log(error.response);
            }
        }
        fetchUserDetails();
    }, [])

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
                console.log('API Response:', response.data);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post details:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [postId, URL]);
    // useEffect(() => {
    //     const categoryDetails = async () => {
    //         try {
    //             setLoading(true);
    //             if (!categoryId) { // Check if categoryId is undefined or null
    //                 throw new Error('categoryId is undefined');
    //             }
    //             const response = await axios.get(`${API_URL}/categories/$${categoryId}`); // Fix URL interpolation
    //             console.log('categoryId Response:', response.data);
    //             setCategoryId(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching category details:', error);
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };
    
    //     categoryDetails();
    // }, [categoryId]);
    

    //! Get the creator of the post
    const creator = post?.post?.author?._id?.toString();
    const loginUser = user?.user?._id?.toString(); // Access user state here

    const isCreator = creator === loginUser;

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
                    className="py-16 bg-white md:py-24"
                    style={{
                        backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center top",
                    }}
                >
                    <div className="container px-4 mx-auto">
                        <div className="mx-auto mb-12 text-center md:max-w-2xl">
                            <img
                                className="w-full mx-auto mb-4"
                                src={post?.post?.coverImgUrl}
                                alt="post image"
                            />
                            <Link
                                //    {/* to={`/user-public-profile/${post?.post?.author?._id}` */} 
                                to={''}
                                className="flex items-center justify-start mx-2 text-left"
                            >
                                <div className="w-auto px-2 flex">
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        alt="author image"
                                        src={
                                            post?.post?.author?.profilePic ||
                                            "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
                                        }
                                    />
                                    <div className="w-auto px-2">
                                        <h4 className="text-base font-bold md:text-lg text-coolGray-800">
                                            {post?.post?.author?.username}
                                        </h4>
                                        <span className="mx-1 text-green-500">•</span>
                                        <p className="inline-block font-medium text-green-500">
                                            {new Date(post?.post?.createdAt).toDateString()}
                                        </p>
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

                            
                        </div>
                    </div>


                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        {/* Posts stats */}
                        {/* <PostStats
                  views={post?.post?.postViews}
                  likes={post?.post?.likes.length}
                  dislikes={post?.post?.dislikes.length}
                  postViews={post?.post?.postViews}
                  totalComments={post?.post?.comments?.length}
                  createdAt={post?.post?.createdAt}
                  readingTime={calculateReadingtime(post?.post?.content)}
                  postId={postId}
                  claps={post?.post?.claps}
                /> */}
                    </div>
                    <div className="container px-4 mx-auto">
                        <div className="mx-auto md:max-w-3xl">
                            <p className="pb-10 mb-8 text-lg font-medium border-b md:text-xl text-coolGray-500 border-coolGray-100">
                                {post?.post?.content}
                            </p>
                            {/* delete and update icons */}
                            {isCreator && (
                                <div className="flex justify-end mb-4">
                                    {/* edit */}
                                    <Link
                                        to={`/posts/${post?.post?._id}/update`}
                                        className="p-2 mr-2 text-gray-500 hover:text-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                            />
                                        </svg>
                                    </Link>
                                    {/* delete */}
                                    <button
                                        onClick={deletePostHandler}
                                        className="p-2 text-gray-500 hover:text-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            <h3 className="mb-4 text-2xl font-semibold md:text-3xl text-coolGray-800">
                                Add a comment
                            </h3>

                            {/* Comment form */}
                            {/* <AddComment postId={postId} comments={post?.post?.comments} /> */}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default PostsDetails
