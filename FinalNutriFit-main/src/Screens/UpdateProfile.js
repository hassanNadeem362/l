import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";
import { ToastContainer } from "react-toastify";
import { toast } from "../Component/toastr/toaster.tsx";


const UpdateProfile = () => {
  const [fieldsToUpdate, setFieldsToUpdate] = useState({
    id: "",

    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
  };


  const role = localStorage.getItem("userRole");

  useEffect(() => {
    // Retrieve user information from cookies
    const user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;

    // Set initial state based on user information
    if (userInfo) {
      setFieldsToUpdate({
        name: userInfo.name,
        email: userInfo.email,
        id: userInfo._id,

        phone: userInfo.phone,
      });
    }
  }, []);

  const handleUpdateProfile = async () => {
    const user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/update`,
        fieldsToUpdate,
        
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
          
        }
        
      );

      // Update the user information in cookies after successful update
      Cookies.set("userInfo", JSON.stringify(response.data.data));


      toast.success("Profile updated successfully");
      // Handle success or show a notification to the user
      // console.log("Profile updated successfully");
    } catch (error) {
      // Handle errors, show a notification, or redirect the user
      console.error("Error updating profile:", error);
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setFieldsToUpdate((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };


  const handleChange = (e) => {
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
            email: "Enter a valid email address.",
          });
        }
        break;
      case "password":
        if (!passwordRegex.test(e.target.value)) {
          setValidationErrors({
            ...validationErrors,
            password:
              "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
          });
        }
        break;
      case "phone":
        if (!phoneRegex.test(e.target.value)) {
          setValidationErrors({
            ...validationErrors,
            phone: "Enter a valid 11-digit phone number.",
          });
        }
        break;
      default:
        break;
    }
  
    // Return validation errors for use in the form
    return validationErrors;
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

  return (
    // <div>
    //   <h2>Update Profile</h2>
    //   <div>
    //     <label>Name:</label>
    //     <input
    //       type="text"
    //       value={fieldsToUpdate.name}
    //       onChange={(e) => handleFieldChange("name", e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label>Email:</label>
    //     <input
    //       type="email"
    //       value={fieldsToUpdate.email}
    //       onChange={(e) => handleFieldChange("email", e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input
    //       type="password"
    //       value={fieldsToUpdate.password}
    //       onChange={(e) => handleFieldChange("password", e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label>Phone:</label>
    //     <input
    //       type="tel"
    //       value={fieldsToUpdate.phone}
    //       onChange={(e) => handleFieldChange("phone", e.target.value)}
    //     />
    //   </div>
    //   <button onClick={handleUpdateProfile}>Update Profile</button>
    // </div>

    <>
      <nav className="bg-green-300 p-5">
        <div className="max-w-7xl mx-auto flex flex-row justify-between  items-center space-x-4">
          <Link to={"/"} class="text-black text-3xl font-bold ">
            <LocalDiningIcon fontSize="20px" /> NutriFit
          </Link>{" "}
          <div className="space-x-4 ml-4 ">
            <Link
              to={"/Features"}
              className="text-black text-xl px-3 py-1 navbar-link"
            >
              Diets
            </Link>

            <Link
              to={"/Blogs"}
              className="text-black text-xl px-3 py-1 navbar-link"
            >
              Blogs
            </Link>
            <Link
              to={"/AboutUs"}
              className="text-black text-xl px-3 py-1 navbar-link"
            >
              About Us
            </Link>
          </div>
          <div className="space-x-4">
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
        </div>
      </nav>
      <ToastContainer />
      <div className="max-w-md flex gap-7 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm">
        <button
          onClick={handleProfileClick}
          className="text-black text-xl p-1 rounded-xl"
        >
          🏠 Home
        </button>
      </div>

      <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
        <h2 className="text-2xl mb-4">🚀 Update Profile</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            👤 Name:
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border rounded-md w-full"
            value={fieldsToUpdate.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            📧 Email:
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border rounded-md w-full"
            value={fieldsToUpdate.email}
            onChange={(e) => {
              handleFieldChange("email", e.target.value);
              const errors = handleChange(e);
              setValidationErrors(errors);
            }
            }
          />
        </div> */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            📧 Email:
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 p-2 border rounded-md w-full ${
              validationErrors.email ? "border-red-500" : ""
            }`}
            value={fieldsToUpdate.email}
            onChange={(e) => {
              handleFieldChange("email", e.target.value);
              handleChange(e);
            }}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            🔐 Password:
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 p-2 border rounded-md w-full ${
              validationErrors.password ? "border-red-500" : ""
            }`}
            value={fieldsToUpdate.password}
            onChange={(e) => {
              handleFieldChange("password", e.target.value);
              handleChange(e);
            }}
          />
          {validationErrors.password && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.password}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            📱 Phone:
          </label>
          <input
            type="tel"
            id="phone"
            className="mt-1 p-2 border rounded-md w-full"
            value={fieldsToUpdate.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700"
          onClick={handleUpdateProfile}
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default UpdateProfile;