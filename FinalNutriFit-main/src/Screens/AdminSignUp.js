import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "../Component/toastr/toaster.tsx";
import Cookies from "js-cookie";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

const AdminSignUP = () => {
  const [nutritionist, setNutritionist] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "nutritionist", // Set default role to Nutritionist
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "document") {
      setNutritionist({
        ...nutritionist,
        [e.target.id]: e.target.files[0], // Update state with file object
      });
    } else {
      setNutritionist({
        ...nutritionist,
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
              [e.target.id]: "Enter a valid 10-digit phone number.",
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
    navigate("/Login");

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "password"];
    let isValid = true;

    const newValidationErrors = {};

    requiredFields.forEach((field) => {
      if (!nutritionist[field]) {
        newValidationErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)
          } is required.`;
        isValid = false;
      }
    });

    if (!isValid) {
      setValidationErrors(newValidationErrors);
      return;
    }

    //   try {
    //     const { password, ...formDataWithoutPassword } = nutritionist;
    //     const formData = new FormData();
    //     Object.entries(nutritionist).forEach(([key, value]) => {
    //       if (key === "document") {
    //         // Append the file to FormData
    //         formData.append(key, value);
    //       } else {
    //         formData.append(key, value);
    //       }
    //     });

    //     console.log("formData:", formData);

    //     const response = await axios.post(
    //       "http://localhost:5000/api/auth/regNutritionist",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );

    //     if (response.data.status === 200) {
    //       toast.success(response.data.statusMessage);
    //       Cookies.set("userInfo", JSON.stringify(response.data.data));
    //       setTimeout(() => {
    //         navigate("/NutritionistDashboard");
    //       }, 3000);
    //     } else if (response.data.status === 422) {
    //       toast.warning(response.data.statusMessage);
    //     } else {
    //       toast.error(response.data.statusMessage);
    //     }
    //   } catch (err) {
    //     setError(err.message);
    //   }
    // };
    
    try {
      const { password, ...formDataWithoutPassword } = nutritionist;
      const formData = new FormData();
    
      // Iterate over the nutritionist object
      for (const [key, value] of Object.entries(nutritionist)) {
        // Check if the value is not undefined or null
        if (value !== undefined && value !== null) {
          // Append the file to FormData if the key is 'document'
          if (key === "document") {
            formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        }
      }
    
      console.log("formData:", formData);
    
      const response = await axios.post(
        "http://localhost:5000/api/auth/regNutritionist",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === 200) {
              toast.success(response.data.statusMessage);
              Cookies.set("userInfo", JSON.stringify(response.data.data));
              setTimeout(() => {
                navigate("/NutritionistDashboard");
              }, 3000);
            } else if (response.data.status === 422) {
              toast.warning(response.data.statusMessage);
            } else {
              toast.error(response.data.statusMessage);
            }
    
      // Rest of your code...
    } catch (err) {
      setError(err.message);
    }
  };
    

  return (
    <div className="flex flex-row">
      {/* ... (unchanged) ... */}
      <div className="w-full max-w-lg mr-3">
        <form
          className="shadow-md rounded px-8 pt-6 pb-8 bg-origin-border p-4 border-4 border-dashed"
          style={{ backgroundColor: "#f25333" }}
          encType="multipart/form-data"
        >
          <h1 className="text-4xl font-extrabold text-white mt-5 text-center mb-5">
            Nutritionist Registration
          </h1>

          <div className="mb-4">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline opacity-50"
              required
              autoComplete="off"
              id="name"
              type="name"
              placeholder="Name"
              onChange={handleChange}
            />
            {validationErrors.name && (
              <p className="text-black text-sm mt-1">
                {validationErrors.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline opacity-50"
              required
              autoComplete="off"
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {validationErrors.email && (
              <p className="text-black text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="phone"
            >
              phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline opacity-50"
              required
              autoComplete="off"
              id="phone"
              type="number"
              placeholder="phone"
              onChange={handleChange}
            />
            {validationErrors.phone && (
              <p className="text-black text-sm mt-1">
                {validationErrors.phone}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline opacity-50"
              required
              autoComplete="off"
              id="password"
              type="password"
              placeholder="******"
              
              onChange={handleChange}
            />
            {validationErrors.password && (
              <p className="text-black text-sm mt-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          {/* Document */}
          <div className="mb-4">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="file"
            >
              Document
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline opacity-50"
              required
              autoComplete="off"
              id="document"
              type="file"
              placeholder=""
              onChange={handleChange}
            />
          </div>

          <h1 className="mt-5 text-center font-bold text-2xl mb-10">
            Select Your Role
          </h1>

          <div className="text-2xl ml-5 mb-5 bg-slate-300 rounded-lg p-2 hover:bg-sky-700 ">
            <label>
              <input
                type="radio"
                value="nutritionist"
                checked={nutritionist.role === "nutritionist"}
                onChange={(e) =>
                  handleChange({
                    target: { id: "role", value: e.target.value },
                  })
                }
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                }}
              />
              Nutritionist
            </label>
          </div>

          <div className="flex justify-center mt-10">
            <button
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>

          <br />
          <hr />
          <hr />
          <br />

          <div className="flex justify-between text-white text-3xl">
            <FacebookIcon style={{ fontSize: 50 }} />
            <WhatsAppIcon style={{ fontSize: 50 }} />
            <InstagramIcon style={{ fontSize: 50 }} />
          </div>

          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUP;
