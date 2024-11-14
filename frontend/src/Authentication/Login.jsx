import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import Axios
import { RecoilRoot, useRecoilState } from "recoil";
import { isLoggedInAtom } from "../atoms/checkLoggedIn";
import { flushSync } from "react-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  // const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // If the user is logged in, navigate to the homepage
      console.log("User logged in. Redirecting...", isLoggedIn);
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // Clear error if email is valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are empty
    if (!email || !password) {
      toast.error("Please fill in all the fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    // Check if the email is valid
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    // Call the API after validation using axios
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        {
          email,
          password,
        },
        // {
        //   withCredentials: true,
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );

      if (response.status === 200) {
        // Improved cookie setting
        document.cookie = `accessToken=${response.data.access_token}; 
          path=/; 
          secure; 
          sameSite=Strict`;

        document.cookie = `refreshToken=${response.data.refresh_token}; 
          path=/; 
          secure; 
          sameSite=Strict`;

        flushSync(() => {
          setIsLoggedIn(true);
        });

        toast.success("User found! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        toast.error("Email not found!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error("Email not found!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        // Other errors (e.g., network error)
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-[#1FAB89] 70% to-[#1FAB89]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#1FAB89] rounded-full flex items-center justify-center mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              className="w-8 h-8"
              strokeWidth="2"
            >
              <path d="M12 2L12 22M2 12L22 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAB89] focus:border-transparent"
                placeholder="Email"
                required
              />
            </div>
            {emailError && (
              <div className="text-red-500 text-sm mt-2">
                <p>{emailError}</p>
              </div>
            )}
          </div>

          <div>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAB89] focus:border-transparent"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-[#1FAB89] hover:text-[#158765] text-sm font-medium"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1FAB89] text-white py-2 rounded-lg hover:bg-[#158765] transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Sign In
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Google Sign-in */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

            {/* Facebook Sign-in */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#1FAB89] hover:text-[#158765] font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* ToastContainer */}
      <ToastContainer />
    </div>
  );
};

const LoginWrapper = () => {
  return (
    <div>
      <RecoilRoot>
        <LoginPage />
      </RecoilRoot>
    </div>
  );
};

export default LoginWrapper;

// export default LoginPage;
