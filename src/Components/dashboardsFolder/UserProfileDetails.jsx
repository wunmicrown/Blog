import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/Api';
 import { MdEmail, MdOutlineMedicalServices, MdVerifiedUser } from 'react-icons/md';

const UserProfileDetails = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tokenMatch, setTokenMatch] = useState(false);

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
                setTokenMatch(true);
                setUser(user); // Initialize image source

            } catch (error) {
                console.log('Error message:', error);
                console.log(error.response);
                setTokenMatch(false);
                navigate('/login');

            }
        }
        userDetails();
    }, []);

    return (
        <div className='h-screen bg-green-50'>
            <div className="pt-20 relative">
                {user && (
                    <div className='  '>
                        <div className='flex justify-center'>
                            <img className='w-24 h-24 rounded-full' src={user.profilePic ||
                                "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"} alt="Profile Pic" />

                        </div>
                        <div className='bg-[#5b5c5b] mx-auto text-white  h-60 text-center pt-4 '>
                            {user.username}
                            <div className=' flex justify-end mr-4'>
                                <button className='bg-green-500 texte-white p-2 rounded-lg hover:bg-green-600'>
                                    Edit profile
                                </button>
                            </div>
                                <div className=' flex gap-8 justify-center'>
                                   <p className='flex gap-2'>< MdVerifiedUser size={30}/> EmailVerified {user.isEmailVerified? ":Verified":null}</p>
                                    <p className='flex gap-2'><MdEmail size={30}/>{user.email}</p>
                                </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
}

export default UserProfileDetails;
