import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row, Col } from "react-bootstrap";
import { FaUser } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { IoBody } from "react-icons/io5";
import { GiChoice } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

const UserChoice = () => {
  const user = Cookies.get("userInfo");
  const userInfo = user ? JSON.parse(user) : null;
  const [data, setData] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});


    const role = localStorage.getItem("userRole");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = userInfo?._id;
        const response = await axios.get(
          `http://localhost:5000/api/auth/${userId}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once after the initial render

  const handleEditClick = (data) => {
    setEditedData(data);
    setEditModalOpen(true);
  };

  const handleSaveEditModal = async () => {
    try {
      // Make API call to update data in the database using editedData
      const userId = userInfo?._id;
      await axios.put(`http://localhost:5000/api/auth/${userId}`, editedData);

      // Close the modal after successful save
      setEditModalOpen(false);

      // Fetch updated data
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error logic here
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
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
    <>
      <div className="w-3/5 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm flex gap-7">
        <button
          onClick={handleProfileClick}
          className="text-black text-xl p-1 rounded-xl shadow-lg"
        >
          🏠 Home
        </button>

        <Link
          to={"/updateUserInfo"}
          className="text-black text-xl p-1 rounded-xl shadow-lg"
        >
          ✎ Edit
        </Link>
      </div>

      <h1 className="text-center mb-4 text-3xl font-semibold underline">
        User Preferences
      </h1>

      <table className="w-4/5 mx-auto bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left border-r">User Information</th>
            <th className="py-3 px-6 text-left border-r">Health and Fitness</th>
            <th className="py-3 px-6 text-left border-r">Body Information</th>
            <th className="py-3 px-6 text-left">Other Preferences</th>
          </tr>
        </thead>
        <tbody>
          <tr className="transition-all hover:bg-gray-100">
            <td className="py-4 px-6 border-r border-b">
              <div className="mb-2">
                <strong className="text-blue-600">Name:</strong> {data.fullName}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Email:</strong> {data.email}
              </div>
              <div>
                <strong className="text-blue-600">Phone:</strong> {data.phone}
              </div>
              <div>
                <strong className="text-blue-600">Gender:</strong> {data.gender}
              </div>
              <div>
                <strong className="text-blue-600">Current Weight:</strong>{" "}
                {data.currentWeight}
              </div>
              <div>
                <strong className="text-blue-600">Desired Weight:</strong>{" "}
                {data.desiredWeight}
              </div>
              <div>
                <strong className="text-blue-600">Height:</strong> {data.height}
              </div>
              <div>
                <strong className="text-blue-600">Date of Birth:</strong>{" "}
                {data.dateOfBirth}
              </div>
            </td>
            <td className="py-4 px-6 border-r border-b">
              <div className="mb-2">
                <strong className="text-blue-600">Health Goal:</strong>{" "}
                {data.healthGoal}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Exercise Preference:</strong>{" "}
                {data.exercisePref}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Dietary Preferences:</strong>{" "}
                {data.dietaryPreferences}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Protein Consumption:</strong>{" "}
                {data.proteinConsumption && data.proteinConsumption.join(", ")}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Fats Consumption:</strong>{" "}
                {data.fatsConsumption && data.fatsConsumption.join(", ")}
              </div>
            </td>
            <td className="py-4 px-6 border-r border-b">
              <div className="mb-2">
                <strong className="text-blue-600">Current Body:</strong>{" "}
                {data.currentBody}
              </div>

              <div className="mb-2">
                <strong className="text-blue-600">Desired Body:</strong>{" "}
                {data.desiredBody}
              </div>
              <div>
                <strong className="text-blue-600">EBWO:</strong> {data.ebwo}
              </div>
            </td>
            <td className="py-4 px-6 border-r border-b">
              <div className="mb-2">
                <strong className="text-blue-600">Daily Activity Level:</strong>{" "}
                {data.dailyActivityLevel}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Daily Meal Choices:</strong>{" "}
                {data.dailyMealChoices}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Employment Status:</strong>{" "}
                {data.employmentStatus}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Food Allergies:</strong>{" "}
                {data.foodAllergies && data.foodAllergies.join(", ")}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">
                  Physical Schedule Activity:
                </strong>{" "}
                {data.physicalScheduleActivity}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Sleep Time:</strong>{" "}
                {data.sleepTime}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">Wake Up Time:</strong>{" "}
                {data.wakeUpTime}
              </div>
            </td>
            <td className="py-4 px-6 border-r border-b">
              {/* Add more fields here based on your data */}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserChoice;
