import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import toaster, { toast } from "../Component/toastr/toaster.tsx";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgotPassword",
        {
          email,
        }
      );
      console.log(
        "🚀 ~ handleForgotPassword ~ response:",
        response.data.message
      );

      if (response.data.message) {
        toast.success(response.data.message);
      } else {
        toast.error("Wrong Email");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-md">
          <form className="shadow-md rounded px-8 pt-6 pb-8 bg-green-400 bg-origin-border p-4">
            <h1 className="text-4xl font-extrabold text-black mt-5 text-center mb-5">
              Forgot Password
            </h1>
            <div className="mb-4 mt-8">
              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                required
                autoComplete="off"
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleForgotPassword}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Link
          to="/Login"
          className="text-black text-lg hover:underline focus:outline-none"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
