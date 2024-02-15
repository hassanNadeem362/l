import React, { useEffect, useState } from "react";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import { LocalDining as LocalDiningIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import UserDataForNut from "../Component/UserDataForNut";
import { useParams } from "react-router-dom/dist/index";
import axios from "axios";
import Cookies from "js-cookie";

const UserDetailsPage = () => {
  const [dash, setDash] = useState({});
  console.log("🚀 ~ UserDetailsPage ~ dash:", dash);

  const { userId } = useParams();
  console.log("🚀 ~ UserDetailsPage ~ userId:", userId);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/nutritionist/${userId}/nutritionDash`
        );
        const userData = response.data.data;
        setDash(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle errors
      }
    };

    userId.length ? fetchUserDetails() : "";
  }, [userId]);

  const navigate = useNavigate();

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
              class="text-black text-xl px-3 py-1 navbar-link"
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
            <button
              onClick={handleSignOut}
              className="text-black text-xl px-3 py-1 navbar-link"
            >
              <AccountBoxIcon /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* <div className="max-w-3xl mx-auto p-8 bg-green-200 rounded-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Your Daily Summary</h1>
        </header>
        <section className="flex items-center justify-between mb-8 mt-20">
         
          <div className="flex-grow mx-4">
            <p className="mb-2">Total Calories:</p>
            <p className="text-2xl font-semibold">{}</p>
          </div>
        </section>
        <div className="flex justify-between">
          <h4 className="p-2 bg-red-400 rounded-md shadow-lg">
            Calories Goal : <strong> {} </strong>{" "}
          </h4>{" "}
          <span className="p-2">=</span>
          <div className="flex shadow-lg bg-white rounded-md">
            <h4 className="p-2 bg-blue-400 rounded-md shadow-lg">
              Calories Gained: <strong> {} </strong>{" "}
            </h4>
            <span className="p-2">-</span>
            <h4 className="p-2 bg-blue-400 rounded-md shadow-lg">
              Calories Burned: <strong> {} </strong>{" "}
            </h4>
          </div>
          <span className="p-2">=</span>
          <h4 className="p-2 bg-red-400 rounded-md shadow-lg">
            Net Calories: <strong> {} </strong>{" "}
          </h4>
        </div> */}
      <div className="mt-16">
        <UserDataForNut data={dash} />
      </div>
      {/* </div> */}
    </>
  );
};

export default UserDetailsPage;
