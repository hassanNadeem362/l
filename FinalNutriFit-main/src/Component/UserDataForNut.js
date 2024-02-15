import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams hook
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { HeartFill } from "react-bootstrap-icons";
import axios from "axios";
import { Image } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UserFavfood from "./UserFavfood";

const UserDataForNut = ({ data }) => {
  const [favorites, setFavorites] = useState([]);
  const [addedFoods, setAddedFoods] = useState([]);
  const [FavOfUser, setFavOfUser] = useState([]);
  const history = useNavigate(); // Create a history object
  const [favoriteFoods, setFavoriteFoods] = useState([]);

  console.log("🚀 ~ UserChoice ~ data:", data);

  const role = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  let user = Cookies.get("userInfo");
  const userInfo = user ? JSON.parse(user) : null;

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

      {/* <PageWrapper>
        <SectionWrapper>
          <h3>Favorites</h3>
          <Wrapper>
            <Splide
              options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "5rem",
              }}
            >
              {data.favoriteFoods && data.favoriteFoods.map((food) => (
                <SplideSlide key={food._id}>
                  <Card>
                    {food.image && (
                      <div className="mb-3">
                        <Image
                          src={`data:${
                            food.image.contentType
                          };base64,${arrayBufferToBase64(
                            food.image.data.data
                          )}`}
                          alt={food.foodName}
                          fluid
                          onClick={() => handleCardClick(food._id)}
                        />
                      </div>
                    )}
                    <div className="info">
                      <h3>{food.foodName}</h3>
                      <p>{food.description}</p>
                      <div
                        className="favorite-icon"
                        onClick={() => handleToggleFavorites(food._id)}
                      >
                        <HeartFill
                          color={
                            FavOfUser && FavOfUser.includes(food._id)
                              ? "red"
                              : "black"
                          }
                          size={20}
                        />
                      </div>
                    </div>
                  </Card>
                </SplideSlide>
              ))}
            </Splide>
          </Wrapper>
        </SectionWrapper>
      </PageWrapper> */}

      <UserFavfood userId={data._id} />
    </>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const SectionWrapper = styled.div`
  margin-bottom: 4rem;
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
    height: 70%;
    object-fit: cover;
    object-position: center;
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
    .favorite-icon {
      cursor: pointer;
      margin-top: 0.5rem;
    }
  }
`;

const PageWrapper = styled.div`
  margin: 0% 20%;
`;

export default UserDataForNut;
