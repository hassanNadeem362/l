import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "../Component/toastr/toaster.tsx";
import { ToastContainer } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import LocalDiningIcon from "@mui/icons-material/LocalDining";




const calculateCalories = (caloriesPer100g, selectedQuantity) => {
  const calculatedCalories = (caloriesPer100g / 100) * selectedQuantity;
  return calculatedCalories.toFixed(0);
};

function Food() {
  let user = Cookies.get("userInfo");

  const userInfo = user ? JSON.parse(user) : null;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [userFoodHistory, setUserFoodHistory] = useState([]);
  const [quantity, setQuantity] = useState(100);


  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    getUserFoodHistory();
  }, []);

  const getUserFoodHistory = async () => {
    try {
      const userId = userInfo?._id;
      const response = await axios.get(
        `http://localhost:5000/api/food/${userId}`
      );
      if (response.data.status === 200) {
        setUserFoodHistory(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user food history:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const apiKey = "azB8eBn0QLn+GM2WXJprPQ==e0QQfFnyEKgJf1HP"; // Replace 'your_api_key' with your actual API key

      const response = await axios.get(
        `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
        {
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );

      const data = response.data;
      if (data.length === 0) {
        // Show a toast notification when no search matches are found
        toast.info("No matches found for the given query.");
      }

      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddToBreakfast = async (food, selectedQuantity) => {
    try {
      const userId = userInfo?._id;
      const mealtime = "breakFast";

      const calculatedCalories = calculateCalories(
        food.calories,
        selectedQuantity
      );

      const requestBody = {
        userId,
        foodName: food.name.toUpperCase(),
        quantity: selectedQuantity,
        mealtime,
        calories: calculatedCalories,
      };

      const response = await axios.post(
        "http://localhost:5000/api/food/add",
        requestBody
      );
      if (response.data.status === 200) {
        toast.success(response.data.statusMessage);
        // Update the user's food history after successfully adding food
        setUserFoodHistory([...userFoodHistory, response.data.data]);
        getUserFoodHistory();
      }

      console.log("Food added successfully:", response.data);
    } catch (error) {
      console.error("Error adding food:", error);
    }
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

    const handleSignOut = () => {
      Cookies.remove("userInfo");
      localStorage.removeItem("userRole");
      navigate("/Login");
    };

  return (
    <>
      <nav class="bg-green-300 p-5">
        <div class="max-w-7xl mx-auto flex flex-row justify-between  items-center space-x-4">
          <Link to={"/"} class="text-black text-3xl font-bold ">
            <LocalDiningIcon fontSize="20px" /> NutriFit
          </Link>{" "}
          <div className="space-x-4 ml-4 ">
            <Link
              to={"/Features"}
              class="text-black text-xl px-3 py-1 navbar-link"
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

      <div className="max-w-md flex gap-7 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm">
        <button
          onClick={handleProfileClick}
          className="text-black text-xl p-1 rounded-xl"
        >
          🏠 Home
        </button>
      </div>


      
      <div className="max-w-3xl mx-auto p-8">
        <ToastContainer />
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold">
            Food Search and Breakfast Planner
          </h1>
        </header>
        <div className="mb-4">
          <label className="block mb-2 text-lg">Search for food:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="p-2 border rounded w-full font-semibold"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <ul>
            {results.map((food) => (
              <li key={food.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg">{food.name}</p>
                    <p className="text-gray-500">
                      {calculateCalories(food.calories, quantity)} calories
                    </p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <label className="text-lg">Quantity:</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="p-2 border rounded w-20 text-center"
                    />
                    <span className="ml-2">gm</span>
                    <button
                      onClick={() => handleAddToBreakfast(food, quantity)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Add Food
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Food History</h2>
          <ul>
            {userFoodHistory
              .sort((a, b) => new Date(b?.timestamp) - new Date(a?.timestamp))
              .map((food) => (
                <li key={food?._id} className="mb-4">
                  {food && (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg">{food.foodName}</p>
                        <p className="text-gray-500">
                          {food.calories} calories
                        </p>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <p className="text-lg">Quantity: {food.quantity} gm</p>
                        <p className="text-lg">Mealtime: {food.mealtime}</p>
                        <p className="text-lg">
                          Time: {new Date(food.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
        <div className="mt-8">
          <Link to="/dashboard" className="text-blue-500">
            Go back to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}

export default Food;
