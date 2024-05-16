import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Api";
import Loading from "../loading/Loading";
import Posts from "./Posts";
import { Link } from "react-router-dom";

const DraftsList = () => {


    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrafts = async (categoryName) => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${API_URL}/api/v1/posts`, {
                    params: { category_id: categoryName, status: 'published' },
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

    return (
        <>
            <div>
                <div className="container relative z-10 px-4 mx-auto pt-24">
                    <section className="relative bg-white">
                        <div className="container px-4 mx-auto">
                        <div className="md:max-w-5xl mx-auto  mb-6 md:mb-10  text-center">
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
                                        <p className=' font-semibold text-center text-white'>
                                            This is where you can manage your posts, but no draft yet.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <Posts posts={drafts} />
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default DraftsList;
