import React, { useEffect, useState } from "react";
import Exercise from "./Profiling/2/Ex-yes/Exercise";
import FacebookIcon from "@mui/icons-material/Facebook";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import { green, red } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Typewriter from "typewriter-effect";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "../Component/toastr/toaster.tsx";
import UserChoice from "../Component/UserForm.js";
import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

const Dashboard = () => {
  const [dash, setDash] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [caloriesTaken, setCaloriesTaken] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [dynamicProgress, setDynamicProgress] = useState(0);
  const [calories, setCalories] = useState(0);
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");
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

  let user = Cookies.get("userInfo");
  const userInfo = user ? JSON.parse(user) : null;
  useEffect(() => {
    if (!userInfo?._id) navigate("/Login");
  }, []);
  const resetCaloriesAtMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const timeUntilMidnight = midnight - now;
    setTimeout(() => {
      setCaloriesTaken(0);
      setCaloriesBurned(0);
    }, timeUntilMidnight);
  };

  const resetCaloriesAfterOneMinute = () => {
    setTimeout(() => {
      setCaloriesTaken(0);
      setCaloriesBurned(0);
    }, 60 * 1000); // 60 seconds * 1000 milliseconds = 1 minute
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = userInfo?._id;
        const response = await axios.get(
          `http://localhost:5000/api/auth/${userId}`
        );

        const {
          gender,
          currentWeight,
          height,
          dateOfBirth,
          dailyActivityLevel,
        } = response.data.data;

        // Convert height from feet to centimeters
        const heightInCm = parseFloat(height) * 30.48;

        // Calculate age based on date of birth
        const birthDate = new Date(dateOfBirth);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        // Convert weight and height to numbers
        const numericWeight = parseFloat(currentWeight);
        const numericHeight = heightInCm;

        const bmr =
          gender === "female"
            ? 10 * numericWeight + 6.25 * numericHeight - 5 * age - 161
            : 10 * numericWeight + 6.25 * numericHeight - 5 * age + 5;

        let activityMultiplier = 0;

        switch (dailyActivityLevel) {
          case "Sedentary":
            activityMultiplier = 1.2;
            break;
          case "Light Active":
            activityMultiplier = 1.375;
            break;
          case "Moderately Active":
            activityMultiplier = 1.55;
            break;
          case "Extremely Active":
            activityMultiplier = 1.725;
            break;
          case "Very Active":
            activityMultiplier = 1.9;
            break;
          default:
            activityMultiplier = 0;
        }
        const calories = bmr * activityMultiplier;
        setCalories(calories.toFixed(0));

        // Further calculations or set state as needed...
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = userInfo?._id;

        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}/dashboard`
        );
        setDash(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dash) {
      setTotalCalories(dash.netCalories.toFixed(0));
      setCaloriesTaken(dash.totalCaloriesGained.toFixed(0));
      setCaloriesBurned(dash.totalCaloriesBurned.toFixed(0));
    }
  }, [dash]);

  const handleAddExercise = () => {
    navigate("/AddExercise");
  };

  const handleAddFood = () => {
    setTotalCalories((prevTotalCalories) => prevTotalCalories + 100);
    navigate("/food");
  };

  const netCalories = caloriesTaken - caloriesBurned;

  // Calculate the percentage completion
  const percentageCompletion = (netCalories / calories) * 100;
  console.log("🚀 ~ Dashboard ~ percentageCompletion:", percentageCompletion);

  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
  };

  // useEffect(() => {
  //   resetCaloriesAfterOneMinute(); // Reset calories after 1 minute for testing
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(
      resetCaloriesAtMidnight,
      24 * 60 * 60 * 1000
    );

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(resetCaloriesAfterOneMinute, 2 * 60 * 1000); // Run every 2 minutes for testing

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const dynamicProgressValue =
      calories > 0 ? (caloriesTaken / calories) * 100 : 0;
    setDynamicProgress(dynamicProgressValue);
  }, [calories, caloriesTaken]);

  return (
    <>
      <div>
        <nav class="bg-green-300 p-5">
          <div class="max-w-7xl mx-auto flex flex-row justify-between  items-center space-x-4">
            <Link to={"/"} class="text-black text-3xl font-bold ">
              <LocalDiningIcon fontSize="20px" /> NutriFit
            </Link>{" "}
            <div className="space-x-4 ml-4 ">
              <Link
                to={"/Features"}
                class="text-black text-xl px-3 py-1 ml-10 navbar-link"
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
      </div>

      <div className="max-w-3xl flex gap-7 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm">
        <Link to={"/Dashboard"} className="text-white">
          🏠 Home
        </Link>
        <button onClick={handleAddFood} className=" text-white">
          🥗 Food
        </button>
        <button onClick={handleAddExercise} className=" text-white">
          🏋️‍♂️ Exercise
        </button>
        <Link to={"/UserPreferences"} className="text-white">
          👤 User Preferences
        </Link>
        <Link to={"/update"} className="text-white">
          🔄 Update Profile
        </Link>
        <Link to={"/chat"} className="text-white">
          <ChatIcon />
          Chat
        </Link>
      </div>
      <div className="max-w-3xl mx-auto p-8 rounded-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Your Daily Summary</h1>
        </header>
        <section className="flex items-center justify-between mb-8 mt-20 mx-auto">
          <div className="w-1/4 bg-gray-200 p-4 rounded">
            <p className="text-center">Upload Your Photo</p>
          </div>
          <div className="flex-grow mx-4">
            <p className="mb-2">Total Calories:</p>
            <p className="text-2xl font-semibold">{calories}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleAddExercise}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Exercise
            </button>
            <button
              onClick={handleAddFood}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Food
            </button>
          </div>
        </section>
        <div className="flex justify-between mx-auto">
          <h4 className="p-2 rounded-md shadow-lg bg-green-400">
            Calories Goal : <strong> {calories} </strong>{" "}
          </h4>{" "}
          <span className="p-2">=</span>
          <div className="flex shadow-lg rounded-md">
            <h4 className="p-2 rounded-md shadow-lg bg-gray-200">
              Calories Gained: <strong> {caloriesTaken} </strong>{" "}
            </h4>
            <span className="p-2">-</span>
            <h4 className="p-2 rounded-md shadow-lg bg-gray-200">
              Calories Burned: <strong> {caloriesBurned} </strong>{" "}
            </h4>
          </div>
          <span className="p-2">=</span>
          <h4 className="p-2 rounded-md shadow-lg bg-gray-200">
            Net Calories: <strong> {caloriesTaken - caloriesBurned} </strong>{" "}
          </h4>
        </div>
        <section className="text-center flex justify-between mt-16 mx-auto">
          <p className="mb-2">
            Gained Weight: 0 Kg <MonitorWeightIcon style={{ fontSize: 50 }} />
          </p>

          <div className="w-3/4 bg-gray-200 h-8 rounded-full overflow-hidden mb-4">
            <div
              className={`bg-green-500 h-full rounded-md`}
              style={{ width: `${percentageCompletion}%` }}
            ></div>
            <span className="ml-2">{`${percentageCompletion.toFixed(
              2
            )}%`}</span>
          </div>
        </section>
        {/* <UserChoice /> */}
      </div>
    </>
  );
};

export default Dashboard;
