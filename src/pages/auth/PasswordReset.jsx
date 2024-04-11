    import { BsShieldLock } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../constants/Api";
import { FaBlog } from "react-icons/fa";
import Loading from "../loading/Loading";

const PasswordReset = () => {
    const URL = `${API_URL}/api/v1/users/reset-password`;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const email = params.get("email") || "";
    const [message, setMessage] = useState('');
    const [data, setData] = useState({
        email: email,
        newPassword: '',
        confirmPassword: '',
        termsAccepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.newPassword !== data.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        if (data.newPassword.length < 8) {
            setMessage('Password must be at least 8 characters long');
            return;
        }
        if (!data.termsAccepted) {
            setMessage('Please accept terms and conditions');
            return;
        }
            // Add email field to the data object
        data.email = email;

        try {
            setLoading(true);
            const res = await axios.post(URL, { ...data, email });
            console.log(res);
            if (res.status === 200) {
                setMessage(res.data.message);
                toast.success(res.data.message);
                navigate("/login");
            } else {
                // Handle other status codes if needed
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="p-8 rounded-lg shadow-lg w-96">
            <FaBlog className=" text-green-500 h-16 mx-auto w-full mb-10" />

                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md  transform transition-all duration-500 ease-in-out hover:scale-105 mb-4 text-center text-green-600  flex items-center justify-center animate-pulse">
                    <BsShieldLock className="inline-block text-green-500 text-4xl mr-2" />
                    Change Password
                </div>
                {message && <p className="text-red-500 text-center mb-4">{message}</p>}
                {/* <form onSubmit={handleSubmit}> */}
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        onChange={handleChange}
                        value={data.newPassword}
                        className="bg-white focus:border-green-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter new password"
                    />
                    {/* <span className="text-red-500">{errors.newPassword}</span> */}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={data.confirmPassword}
                        className="bg-white focus:border-green-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Confirm new password"
                    />
                    {/* <span className="text-red-500">{errors.confirmPassword}</span> */}
                </div>
                <div className="mb-4">
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        className="mr-2"
                        onChange={handleChange}
                        checked={data.termsAccepted}
                    />
                    <label htmlFor="termsAccepted" className="text-sm text-gray-400">I accept the Terms and Conditions</label>
                </div>
                {loading ? (
                        <Loading />
                    ) : (
                        <button
                        className="mb-4 mt-9 p-4 py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 flex items-center justify-center animate-pulse"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            Reset Password
                        </button>
                    )}
            
            </div>      
        </div>
    );
};

export default PasswordReset;
