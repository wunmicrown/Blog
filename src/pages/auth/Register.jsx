import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { API_URL } from "../constants/Api";
import { registerSchema } from "../validationSchema/registerSchema";
import { toast } from "react-toastify";
import { FaBlog } from "react-icons/fa";
import Loading from "../loading/Loading";
import { useState } from "react";

const SignUp = () => {
  const URL = `${API_URL}/api/v1/users/register`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(URL, values);
      localStorage.setItem('userDetails', JSON.stringify(data.user));
      toast.success("User registered successfully. Verification OTP sent to email.");
      navigate("/verify-email");
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.error || "Sign up failed. Please try again later.";
      toast.error(`Sign up failed: ${errorMessage}`);
      console.log(errorMessage);
    }
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <>
      <section>
        <main className="pt-20 pb-5">
          <div className="max-w-md mx-auto shadow-lg p-6 rounded">
            <FaBlog className="text-green-500 h-16 mx-auto w-full mt-4 mb-4" />

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-500">
                  Name
                  <span className="inline-block text-[#ef4444] text-xl ml-2">*</span>
                  <div className="text-red-500">{errors.name}</div>
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineUser className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    autoComplete="off"
                    placeholder="name"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-500">
                  Username
                  <span className="inline-block text-[#ef4444] text-xl ml-2">*</span>
                  <div className="text-red-500">{errors.username}</div>
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineUser className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    autoComplete="off"
                    placeholder="username"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                  Email Address
                  <span className="inline-block text-[#ef4444] text-xl ml-2">*</span>
                  <div className="text-red-500">{errors.email}</div>
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineMail className="mr-2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Email Address"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-500">
                  Password
                  <span className="inline-block text-[#ef4444] text-xl ml-2">*</span>
                  <div className="text-red-500">{errors.password}</div>
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineLock className="mr-2 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Password"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
              </div>
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="w-full bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-600 outline-none focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 focus:ring-offset-green-100"
                  type="submit"
                  disabled={loading}
                >
                  Sign Up
                </button>
              )}
              <div className="text-center mt-4 mb-8">
                <p className="text-gray-500">Already have an account?</p>
                <Link to="/login" className="text-black hover:underline hover:text-green-800">Login here</Link>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  );
};

export default SignUp;
