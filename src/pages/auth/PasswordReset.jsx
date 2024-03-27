import { BsShieldLock } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../constants/Api";

const PasswordReset = () => {
  const URL = `${API_URL}/v1/auth/resetpassword`;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email");
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
    if (data.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }
    if (!data.termsAccepted) {
      setMessage('Please accept terms and conditions');
      return;
    }

    try {
      const res = await axios.post(URL, data);
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
    }
  };


  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-96">
        <div className="text-2xl font-bold mb-4 text-center text-blue-700">
          <BsShieldLock className="inline-block text-blue-500 text-4xl mr-2" />
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
            className="bg-white focus:border-blue-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="bg-white focus:border-blue-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <button onClick={handleSubmit} type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
          Reset Password
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default PasswordReset;
