import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SuggestedFoods from "../Component/SuggestedFoods";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox"; // Import AccountBoxIcon

import Cookies from "js-cookie"; // Import Cookies if not imported already

const NutDet = () => {
  const [dash, setDash] = useState({});
  console.log("🚀 ~ UserDetailsPage ~ dash:", dash);
  const { userId } = useParams();

  const navigate = useNavigate();
  console.log("🚀 ~ UserDetailsPage ~ userId:", userId);
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/nutritionist/${userId}/nutritionDash`);
        const userData = response.data.data;
        console.log(userData);
        setDash(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle errors
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

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
    <>
      <nav className="bg-green-300 p-5">
        <div className="max-w-7xl mx-auto flex flex-row justify-between  items-center space-x-4">
          <Link to={"/"} className="text-black text-3xl font-bold ">
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
              <div className="space-x-4">
                <Link
                  to={"/Login"}
                  className="text-black text-xl px-3 py-1 navbar-link"
                >
                  <PersonIcon /> Login
                </Link>
                <Link
                  to={"/UserSignUp"}
                  className="text-black text-xl px-3 py-1 navbar-link"
                >
                  <AccountBoxIcon /> SignUp
                </Link>
              </div>
            ) : (
              <div className="space-x-4">
                <button onClick={handleSignOut} className="text-black text-xl px-3 py-1 navbar-link">
                  <PersonIcon /> SignOut
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="w-3/5 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm">
        <button onClick={handleProfileClick} className="text-black text-xl p-1 rounded-xl">
          🏠 Home
        </button>
      </div>

      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Nutritionist Details</h2>
        <table className="table-auto w-2/3 mx-auto">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Name</td>
              <td className="border px-4 py-2">{dash?.name}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Email</td>
              <td className="border px-4 py-2">{dash?.email}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">ID</td>
              <td className="border px-4 py-2">{dash?._id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Phone</td>
              <td className="border px-4 py-2">{dash?.phone}</td>
            </tr>
            <tr>
  <td className="border px-4 py-2 font-semibold">Document</td>
  <td className="border px-4 py-2">
    {dash && dash.document && (
      <a
        href={`data:${dash.document.contentType};base64,${btoa(
          new Uint8Array(dash.document.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )}`}
        download="document"
      >
        Download Document
      </a>
    )}
  </td>
</tr>

          </tbody>
        </table>
        <SuggestedFoods nutritionistId={userId} />
      </div>
    </>
  );
};

export default NutDet;
