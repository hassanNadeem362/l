import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "../Component/toastr/toaster.tsx";
import Cookies from "js-cookie";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";




const UserSignUP = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });


  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  

  // const handleChange = (e) => {
  //   if (e.target.id === "phone") {
  //     setUser({
  //       ...user,
  //       [e.target.id]: e,
  //     });
      
  //     setUser({
  //       ...user,
  //       [e.target.id]: e.target.value,
  //     });
  //   }

  //   // Clear validation error for the current field
  //   setValidationErrors({
  //     ...validationErrors,
  //     [e.target.id]: "",
  //   });

  //   // Additional Validations
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   const phoneRegex = /^\d{10}$/;

  //   switch (e.target.id) {
  //     case "email":
  //       if (!emailRegex.test(e.target.value)) {
  //         setValidationErrors({
  //           ...validationErrors,
  //           [e.target.id]: "Enter a valid email address.",
  //         });
  //       }
  //       break;
  //     case "password":
  //       if (!passwordRegex.test(e.target.value)) {
  //         setValidationErrors({
  //           ...validationErrors,
  //           [e.target.id]:
  //             "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
  //         });
  //       }
  //       break;
  //     case "phone":
  //       if (!phoneRegex.test(e.target.value)) {
  //         setValidationErrors({
  //           ...validationErrors,
  //           [e.target.id]: "Enter a valid 11-digit phone number.",
  //         });
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // };


  const handleChange = (e) => {
    if (e.target.id === "phone") {
      setUser({
        ...user,
        [e.target.id]: e.target.value,
      });

      // Clear validation error for the current field
      setValidationErrors({
        ...validationErrors,
        [e.target.id]: "",
      });
    } else {
      setUser({
        ...user,
        [e.target.id]: e.target.value,
      });

      // Clear validation error for the current field
      setValidationErrors({
        ...validationErrors,
        [e.target.id]: "",
      });

      // Additional Validations
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const phoneRegex = /^\d{10}$/;

      switch (e.target.id) {
        case "email":
          if (!emailRegex.test(e.target.value)) {
            setValidationErrors({
              ...validationErrors,
              [e.target.id]: "Enter a valid email address.",
            });
          }
          break;
        case "password":
          if (!passwordRegex.test(e.target.value)) {
            setValidationErrors({
              ...validationErrors,
              [e.target.id]:
                "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
            });
          }
          break;
        case "phone":
          if (!phoneRegex.test(e.target.value)) {
            setValidationErrors({
              ...validationErrors,
              [e.target.id]: "Enter a valid 11-digit phone number.",
            });
          }
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "password"];
    let isValid = true;

    const newValidationErrors = {};

    requiredFields.forEach((field) => {
      if (!user[field]) {
        newValidationErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
        isValid = false;
      }
    });

    if (!isValid) {
      setValidationErrors(newValidationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        user
      );
      if (response.data.status === 200) {
        toast.success(response.data.statusMessage);
        Cookies.set("userInfo", JSON.stringify(response.data.data));
        setTimeout(() => {
          navigate("/Name");
        }, 3000);
      } else if (response.data.status === 422) {
        // Unsuccessful registration
        toast.warning(response.data.statusMessage);
      } else {
        toast.error(response.data.statusMessage);
      }
    } catch (err) {
      setError(err.message);
    }
  };


   
   const handleProfileClick = () => {
     if (role === "admin") {
       // Redirect to admin dashboard
       navigate("/AdminDashboard");
     } else if (role === "nutritionist") {
       // Redirect to nutritionist dashboard
       navigate("/NutritionistDashboard");
     } else if (role === "customer") {
       // Handle other roles or scenarios as needed
       // Redirect to a default dashboard or show an error message
       navigate("/Dashboard");
     }
   };
   const handleSignOut = () => {
     Cookies.remove("userInfo");
     localStorage.removeItem("userRole");
     navigate("/Login");
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
          {!role ? (
            <div class="space-x-4">
              <Link
                to={"/Login"}
                class="text-black text-xl px-3 py-1 navbar-link"
              >
                <PersonIcon /> Login
              </Link>
              <Link
                to={"/UserSignUp"}
                class="text-black text-xl px-3 py-1 navbar-link"
              >
                <AccountBoxIcon /> SignUp
              </Link>
            </div>
          ) : (
            <div class="space-x-4">
              <button
                onClick={handleProfileClick}
                className="text-black text-xl px-3 py-1 navbar-link"
              >
                Dashboard
              </button>
              <Link
                to={"/Login"}
                class="text-black text-xl px-3 py-1 navbar-link"
              >
                <button onClick={handleSignOut}>
                  <PersonIcon /> SignOut
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <ToastContainer />
      <div className="flex justify-center w-full mt-3">
        <div className="w-full max-w-lg">
          <form className="shadow-md rounded px-8 pt-6 pb-8 p-4 bg-green-400">
            <h1 className="text-4xl text-black mt-5 text-center mb-5">
              User Registration
            </h1>
            <div className="mb-4">
              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                required
                autoComplete="off"
                placeholder="Name"
                value={user.name}
                onChange={handleChange}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.name}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                required
                autoComplete="off"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>
            {/* ... (unchanged) ... */}
            {/* <div className="mb-4">
              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="phone"
              >
                Contact
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="number"
                placeholder="Contact"
                value={user.phone}
                onChange={handleChange}
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.phone}
                </p>
              )}
            </div> */}

            <div className="mb-4">
              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="phone"
              >
                Contact
              </label>
              <PhoneInput
                country={"us"} // Set the default country or leave it empty for no default
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                value={user.phone}
                onChange={(phone) =>
                  handleChange({ target: { id: "phone", value: phone } })
                }
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.phone}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 font-semibold leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******"
                value={user.password}
                onChange={handleChange}
              />
              {validationErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.password}
                </p>
              )}
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="bg-black  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
            <br />
            <hr />
            <hr />
            <br />
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

export default UserSignUP;
