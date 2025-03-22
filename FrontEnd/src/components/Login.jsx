import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const passwordRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const cookies = document.cookie.split(";");
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("token=")
      );

      if (tokenCookie) {
        // User is already logged in, redirect to home page
        navigate("/");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password: passwordRef.current.value,
        },
        {
          withCredentials: true, // Ensures cookies are sent
        }
      );

      if (response.data.success) {
        setMessage(response.data.message || "Login successful!");

        // Small delay to show success message before redirect
        setTimeout(() => {
          navigate("/"); // Redirect to home page
        }, 1000);
      } else {
        setMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#EFF5F5] p-4">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Login image */}
          <div className="w-full md:w-1/2 relative h-64 md:h-auto order-2 md:order-1">
            <img
              src="https://i.pinimg.com/474x/51/a4/be/51a4be1461a63d803c3694c90db735b6.jpg"
              alt="Login"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Login form */}
          <div className="w-full md:w-1/2 p-8 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-[#497174] mb-6">
              Welcome Back
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[#497174] font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-[#497174] font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md bg-[#EFF5F5] border-[#D6E4E5] focus:outline-none focus:ring-2 focus:ring-[#497174]"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2 h-4 w-4 accent-[#EB6440]"
                  />
                  <label htmlFor="remember" className="text-[#497174]">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-[#EB6440] font-medium hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#EB6440] text-white font-medium rounded-md hover:bg-opacity-90 transition duration-300 shadow-md flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                Sign In
              </button>

              <p className="text-center text-[#497174]">
                Don't have an account?{" "}
                <Link
                  to="/Register"
                  className="text-[#EB6440] font-medium hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </form>

            {message && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  message.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
