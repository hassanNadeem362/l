import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { FaInfo, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "../styled/AdminDashboard.css"

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState("users");
  const [showchat, setShowChat] = useState(false);
  const [messageAll, setMessage] = useState([]);

  const role = localStorage.getItem("userRole");

//<<<<<<< HEAD
//=======
//>>>>>>> e7127aa84f91f591d5d309094f03dab01bcdc54e
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/nutritionist/dashboard"
      );

      const filteredData = response.data.data.filter(
        (item) =>
          (view === "users" && item.role === "customer") ||
          (view === "nutritionists" && item.role === "nutritionist")
      );

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAllMessages = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get("http://localhost:5000/api/message", config);
      setMessage(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchAllMessages();
  }, [view]);

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/nutritionist/del/${userId}`,
        { params: { userId: userId } }
      );

      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle errors
    }
  };

  const switchToNutritionistView = () => {
    setView("nutritionists");
  };

  const switchToUsersView = () => {
    setView("users");
  };
  const navigate = useNavigate();
  const profile = () => {
    navigate("/update");
  };
  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
  };

  
  const handleMoreClick = async (userId, role) => {
    console.log("🚀 ~ handleMoreClick ~ role:", role);

    try {
      // Navigate to the user details page using React Router
      if (role === "customer") {
        // Navigate to the user details page using React Router
        navigate(`/user/${userId}`);
      } else {
        navigate(`/nut/${userId}`);

        // Handle the case where the user is a nutritionist (optional)
        console.log("More details not available for nutritionists");
      }
    } catch (error) {
      console.error("Error navigating to user details:", error);
      // Handle errors
    }
  };

// <<<<<<< HEAD
// =======
  const ChatShow = () => {
    setShowChat(!showchat);
  }

// >>>>>>> e7127aa84f91f591d5d309094f03dab01bcdc54e
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
          onClick={switchToNutritionistView}
          className={`text-white ${view === "nutritionists" && "active-tab"}`}
        >
          👥 View Nutritionists
        </button>
        <button
          onClick={switchToUsersView}
          className={`text-white ${view === "users" && "active-tab"}`}
        >
          👥 View Users
        </button>
        <Link to="/AllFoodsForAdmin" className="text-white">
          🍎 Foods
        </Link>
        <button onClick={profile} className="text-white">
          🔄 Update Profile
        </button>
{/* <<<<<<< HEAD */}
        {/* ... (other buttons) */}
{/* ======= */}
        <IconButton onClick={ChatShow}>
          <ChatIcon />
        </IconButton>
{/* >>>>>>> e7127aa84f91f591d5d309094f03dab01bcdc54e */}
      </div>

      <div>
        <h1 className="mt-4 mb-4 text-center text-3xl font-semibold">
          Dashboard
        </h1>
      </div>

      <div className="w-9/12 mx-auto">
        <Table
          responsive
          striped
          bordered
          hover
          variant="dark"
          className="table"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <Button
                    variant="info"
                    className="mr-2"
                    onClick={() => handleMoreClick(item._id, item?.role)}
                  >
                    <FaInfo /> More
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {
          showchat && (<div className="ChatShow">

            {
              messageAll.map(e => (
                <div className="messageContainer">
                  <div className="me">
                    {e.sender.name}
                  </div>
                  <div className="receiver">
                   {e.content}
                  </div>
                </div>
              ))
            }
          </div>)
        }
      </div>
    </>
  );
};

export default AdminDashboard;
