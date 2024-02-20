import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { FaInfo, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Cookies from "js-cookie";
import NutritionistDetails from "../Component/NutritionistDetails";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SuggestedFoods from "../Component/SuggestedFoods";
import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

const NutritionistDashboard = () => {
  const [nutritionists, setNutritionists] = useState([]);
  const [dash, setDash] = useState(null);
  const [nut, setNut] = useState(false);
  const [usersView, setUserView] = useState(false);

  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");

  const handleMoreClick = async (userId) => {
    try {
      // Navigate to the user details page using React Router
      navigate(`/user/${userId}`);
    } catch (error) {
      console.error("Error navigating to user details:", error);
      // Handle errors
    }
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/nutritionist/del/${userId}`,
        { params: { userId: userId } }
      );

      fetchNutritionists();
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle errors
    }
  };

  const fetchNutritionists = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/nutritionist/dashboard"
      );
      const nutritionistData = response.data.data.filter(
        (item) => item.role === "customer"
      );

      setNutritionists(nutritionistData);
    } catch (error) {
      console.error("Error fetching nutritionists:", error);
      // Handle errors
    }
  };
  useEffect(() => {
    fetchNutritionists();
  }, []);
  let user = Cookies.get("userInfo");
  const userInfo = user ? JSON.parse(user) : null;
  const userId = userInfo?._id;

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
      }
    };

    userId?.length ? fetchUserDetails() : "";
  }, [userId]);

  const dashboard = () => {
    setNut(true);
    setUserView(false);
  };

  const users = () => {
    setUserView(true);
    setNut(false);
  };
  const profile = () => {
    navigate("/update");
  };
  const chatBoad = () => {
    navigate("/chat")
  }
  const addFood = () => {
    navigate("/AddFoodNut");
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
      <div className="max-w-3xl flex gap-7 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-md shadow-lg">
        <button
          onClick={dashboard}
          className="text-white hover:text-gray-100 focus:outline-none"
        >
          🏠 Home
        </button>
        <button
          onClick={addFood}
          className="text-white hover:text-gray-100 focus:outline-none"
        >
          🍲 Add Food
        </button>
        <button
          onClick={users}
          className="text-white hover:text-gray-100 focus:outline-none"
        >
          👥 View Users
        </button>
        <button
          onClick={profile}
          className="text-white hover:text-gray-100 focus:outline-none"
        >
          🔄 Update Profile
        </button>
        <button
          onClick={chatBoad}
          className="text-white hover:text-gray-100 focus:outline-none"
        >
          <IconButton>
            <ChatIcon />
          </IconButton>
          Chat
        </button>
      </div>

      {!usersView && dash && (
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Nutritionist Dashboard
          </h1>
          <NutritionistDetails dash={dash} />
        </div>
      )}

      {usersView && !nut && (
        <div className="w-9/12 mx-auto mt-16">
          <div className="bg-gray-100 p-6 rounded-md shadow-lg">
            <Table
              responsive
              striped
              bordered
              hover
              variant="dark"
              className="table"
            >
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {nutritionists.map((nutritionist) => (
                  <tr key={nutritionist._id}>
                    <td>{nutritionist.name}</td>
                    <td>{nutritionist.email}</td>
                    <td>{nutritionist.contact}</td>
                    <td>{nutritionist.role}</td>
                    <td>
                      <Button
                        variant="info"
                        className="mr-2"
                        onClick={() => handleMoreClick(nutritionist._id)}
                      >
                        <FaInfo className="mr-1" /> More
                      </Button>
                      {/* <Button variant="danger" onClick={() => handleDeleteClick(nutritionist._id)}>
                  <FaTrash className="mr-1" /> Delete
                </Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      <div>{dash && <SuggestedFoods nutritionistId={dash._id} />}</div>
    </>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  height: 350px;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    border-radius: 2rem;
    width: 100%;
    height: 80%;
    object-fit: cover;
  }

  .info {
    padding: 1rem;
    h3 {
      color: black;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    p {
      color: black;
      font-size: 1rem;
    }
    .delete-icon {
      cursor: pointer;
      margin-top: 0.5rem;
      color: red;
    }
  }
`;

const PageWrapper = styled.div`
  margin: 0% 20%;
`;

export default NutritionistDashboard;
