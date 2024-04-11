import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { loginSchema } from "../validationSchema/loginSchema";
import { API_URL } from "../constants/Api";
import { toast } from "react-toastify";
import { FaBlog } from "react-icons/fa";

const Login = () => {
  const URL = `${API_URL}/api/v1/users/login`;
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(URL, values);

        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to dashboard if email is verified
        if (data.user?.isEmailVerified) {

          toast.success('Login successful');
          // return navigate('/post/redirect?redirectTo=create-post');
          return navigate('/create-post');

        }
        // Redirect to verify email page if email is not verified
        toast.warning('Please verify your email before accessing the dashboard');
        navigate('/verifyEmail');

      }
      catch (error) {
        console.error('Login failed:', error);
        if (error.response && error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred while logging in');
        }
      }
    },

  });


  return (
    <>
      <div className="pt-20 h-screen">
        <div className="max-w-md mx-auto shadow-lg p-5 rounded text-gray-500">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FaBlog className=" text-green-500 h-16 mx-auto w-full mt-8 mb-8" />
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                Email Address
              </label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <AiOutlineUser className="mr-2" />
                <input
                  name="email"
                  type="text"
                  onChange={handleChange}
                  value={values.email}
                  autoComplete="username"
                  className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-300 rounded-lg focus:ring focus:ring-green-200"
                  placeholder="Email Address"
                />
              </div>
              <span className="text-red-500">{errors.email}</span>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-500">
                Password
              </label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <AiOutlineLock className="mr-2" />
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-300 rounded-lg focus:ring focus:ring-green-200"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>
              <span className="text-red-500">{errors.password}</span>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 outline-none focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 focus:ring-offset-green-100"
            >
              Login
            </button>
            <div className="flex justify-between">
              <div>
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </div>
              <Link to="/forgot-password" className="text-green-500">Forgot password?</Link>
            </div>
            <div className="flex">
              <p>Don't have an account <span>
                <Link to='/register' className=" text-green-500">Register</Link></span></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
