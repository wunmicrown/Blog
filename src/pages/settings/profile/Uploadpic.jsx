import React, { useState, useRef, useEffect } from "react";
import { AiOutlineCamera, AiOutlineEdit } from 'react-icons/ai';
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../components/constants/Api";

const Uploadpic = () => {
    const fileInputRef = useRef(null);
    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        const userDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data: user } = await axios.get(`${API_URL}/users/getUser`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log("user", user);
                setUser(user); // Initialize image source

            } catch (error) {
                console.log('Error message:', error);
                console.log(error.response);
                navigate('/login');

            }
        }
        userDetails();
    }, [])
    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setUser(prevData => ({
            ...prevData,
            oldProfilePic: prevData.profilePic,
            profilePic: URL.createObjectURL(file)
        }));
    };

    const cancelUpload = () => {
        setSelectedFile(null);
        setUser(prevData => ({
            ...prevData,
            profilePic: prevData.oldProfilePic
        }));
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(`${API_URL}/users/create/uploads`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("data", data);

            setUser(prevData => ({
                ...prevData,
                oldProfilePic: user.profilePic,
                profilePic: data.user.profilePic
            }));

            toast.success('Profile picture updated successfully!');
            setSelectedFile(null);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            toast.error('Error uploading profile picture.');
        }
    };

    return (
        <>
            <div className="w-full flex pt-8 shadow-xl  font-serif mt-10">
                <div className="flex flex-col mx-auto space-y-4">
                    <h2 className="text-green-500 font-bold">Profile image</h2>
                    <div className="max-w-xs rounded-full flex flex-col items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <div>
                            <div className="flex items-center justify-center h-48 w-48 rounded-full">
                                {user && user.profilePic ? (
                                    <img
                                        className="h-full w-full rounded-full"
                                        src={user.profilePic}
                                        alt="User"
                                    />
                                ) : (
                                    <img
                                        className="h-full w-full rounded-full"
                                        src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
                                        alt="Default"
                                    />
                                )}
                            </div>

                            <div className="flex justify-center py-1">
                                {selectedFile ?
                                    <span>
                                        <button onClick={cancelUpload} className=" bg-red-600 text-white p-2 text-lg rounded">
                                            Cancel...
                                        </button>
                                        <button className=" text-white bg-green-600 p-2 text-lg rounded" onClick={handleUpload}>
                                            Save...
                                        </button>
                                    </span>
                                    :
                                    <button className=" text-gray-600 " onClick={handleEditClick}>
                                        <AiOutlineCamera size={30} />
                                    </button>
                                }
                            </div>
                            <div className=" text-gray-300 mt-10">
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleFileChange}
                                className="mb-4 w-32 focus:bg-slate-500 rounded outline-none"
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </div>
                
            </div>

        </>
    );
};

export default Uploadpic;
