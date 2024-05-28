import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Api";
import Loading from "../loading/Loading";
import UserPosts from "../UserPosts";
import { Transition } from "@headlessui/react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DraftsList = () => {
    const [user, setUser] = useState(null);
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tokenMatch, setTokenMatch] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    const navigate = useNavigate();

    const openConfirmationModal = (postId) => {
        setPostIdToDelete(postId);
        setShowConfirmation(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmation(false);
        setPostIdToDelete(null);
    };

    useEffect(() => {
        const fetchDrafts = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${API_URL}/api/v1/posts`, {
                    params: { status: 'draft' },
                });
                setDrafts(data.draftPosts);
                setLoading(false);
                setError(null);
            } catch (error) {
                setError(error);
                setLoading(false);
                setTimeout(() => {
                    setError(null);
                }, 5000);
            }
        };

        fetchDrafts();
    }, []);

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
    }, [navigate]);

    useEffect(() => {
        if (showConfirmation) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showConfirmation]);

    const deletePostHandler = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated.');
                return;
            }
            const response = await axios.delete(`${API_URL}/api/v1/posts/${postIdToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDrafts(drafts.filter(post => post._id !== postIdToDelete));
                toast.success("Post deleted successfully");
                setShowConfirmation(false);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const creator = drafts.length > 0 && drafts[0].authorId.toString();
    const loginUser = user?._id?.toString();
    const isCreator = creator === loginUser;

    return (
        <>
            {user && (
                <div>
                    <div className="container relative z-10 px-4 mx-auto pt-24">
                        <section className="relative bg-white">
                            <div className="container px-4 mx-auto">
                                <div className="md:max-w-5xl mx-auto mb-6 md:mb-10 text-center">
                                    <span className="inline-block py-px px-2 pl-3 pr-3 mt-10 text-md leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                                        Unpublished Post
                                    </span>
                                </div>

                                {loading ? (
                                    <Loading />
                                ) : error ? (
                                    <div className="text-red-500 text-center">{error?.message}</div>
                                ) : drafts.length === 0 ? (
                                    <div className='mb-20 bg-[#5b5c5b] rounded-lg p-4 overflow-y-auto'>
                                        <div className='flex justify-center'>
                                            <img src={'https://media.dev.to/cdn-cgi/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png'} alt="" />
                                        </div>
                                        <div>
                                            <p className='font-semibold text-center text-white'>
                                                This is where you can manage your posts, but no draft yet.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <UserPosts posts={drafts} isCreator={isCreator} openConfirmationModal={openConfirmationModal} />
                                )}
                            </div>
                        </section>
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
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <p className="mb-4">Are you sure you want to delete this article?</p>
                        <div className="flex justify-end">
                            <button
                                className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={deletePostHandler}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                                onClick={closeConfirmationModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default DraftsList;
