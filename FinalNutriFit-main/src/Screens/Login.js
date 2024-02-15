import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PersonIcon from "@mui/icons-material/Person";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useUserAuth } from "../context/UserAuthContext";
import { Form, Alert } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { toast } from "../Component/toastr/toaster.tsx";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const Login = () => {
  const { logIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log("object", response);
      if (response.data.status === 200) {
        toast.success(response.data.statusMessage);
        Cookies.set("userInfo", JSON.stringify(response.data.data));

        setTimeout(() => {
          const userRole = response?.data?.data?.role;
          // In your login component after successful login
          localStorage.setItem("userRole", userRole);

          console.log("User Role:", userRole);

          if (userRole === "customer") {
            navigate("/Dashboard");
          } else if (userRole === "admin") {
            navigate("/AdminDashboard");
          } else if (userRole === "nutritionist") {
            navigate("/NutritionistDashboard");
          } else {
            // Handle unknown role or future roles
            console.error("Unknown user role:", userRole);
          }
        }, 3000);
      } else {
        toast.error(response.data.statusMessage);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const handleForgotPassword = () => {
    // Redirect to the "Forgot Password" page
    navigate("/ForgotPassword");
  };
  return (
    <div>
      <nav class="bg-green-300 p-5">
        <div class="max-w-7xl mx-auto flex flex-row justify-between  items-center space-x-4">
          <Link to={"/"} class="text-black text-3xl font-bold ">
            <LocalDiningIcon fontSize="20px" /> NutriFit
          </Link>{" "}
          <div className="space-x-4 ml-4 ">
            <Link
              to={"/Features"}
              class="text-black text-xl px-3 py-1 navbar-link"
            >
              Diets
            </Link>

            <Link
              to={"/Blogs"}
              class="text-black text-xl px-3 py-1 navbar-link"
            >
              Blogs
            </Link>
            <Link
              to={"/AboutUs"}
              class="text-black text-xl px-3 py-1 navbar-link"
            >
              About Us
            </Link>
          </div>
          <div class="space-x-4">
            {/* <Link to={"/Login"} class="text-black text-xl p-1 rounded-xl">
                <PersonIcon /> Login
              </Link> */}
            <Link
              to={"/UserSignUp"}
              class="text-black text-xl px-3 py-1 navbar-link"
            >
              <AccountBoxIcon /> SignUp
            </Link>
          </div>
        </div>
      </nav>
      <ToastContainer />
      <div className="flex justify-center  w-full mt-10">
        <div class="w-full max-w-lg">
          {error && <Alert variant="danger">{error}</Alert>}
          <form class=" shadow-md rounded px-8 pt-6 pb-8 bg-green-400 bg-origin-border p-4">
            <h1 className="text-4xl font-extrabold text-black mt-5   text-center mb-5">
              Login
            </h1>
            <div class="mb-4 mt-8">
              <label
                class="block text-black text-lg font-bold mb-2"
                for="email"
              >
                Email
              </label>

              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline "
                id="name"
                required
                autoComplete="off"
                type="name"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div class="mb-4 mt-10">
              <label
                class="block text-black text-lg font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
                autoComplete="off"
                id="password"
                type="password"
                placeholder="******"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div class="flex justify-center mt-10">
              <button
                class="bg-black  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>

            <div>
              <br />
              <br />
              <hr />
              <hr />
              <br />
              <div className="flex justify-between text-white">
                <Link to={"/UserSignUp"}>
                  <PersonIcon /> Register as User
                </Link>

                <Link to={"/NutritionistSignUp"}>
                  <AddBusinessIcon /> Register as Nutritionist
                </Link>
              </div>
            </div>
            <br />
            <hr />
            <hr />
            <br />
            <div className="flex justify-center mt-5">
              <button
                className="text-black text-lg hover:underline focus:outline-none"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
            <div className="flex justify-between text-black text-3xl">
              <FacebookIcon style={{ fontSize: 50 }} />
              <WhatsAppIcon style={{ fontSize: 50 }} />
              <InstagramIcon style={{ fontSize: 50 }} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
