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

      <div className="mt-16">
        <UserDataForNut data={dash} />
      </div>
      {/* </div> */}
    </>
  );
};

export default UserDetailsPage;
