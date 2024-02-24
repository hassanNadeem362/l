import React, { useEffect, useState } from "react";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import { Link, useNavigate } from "react-router-dom";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "js-cookie";
import axios from "axios";
import ChatIcon from '@mui/icons-material/Chat';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from "@mui/material";
import Avacado from "../assets/Food_Recommended_Images/avocado.jpg";
import nutbutter from "../assets/Food_Recommended_Images/nutbutter.jpg"
import greenLeafvegetable from "../assets/Food_Recommended_Images/green-leafy-vegetables.jpg"
import yugurt from "../assets/Food_Recommended_Images/yugurt.jpg"

const Dashboard = () => {
  const [dash, setDash] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [caloriesTaken, setCaloriesTaken] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [dynamicProgress, setDynamicProgress] = useState(0);
  const [calories, setCalories] = useState(0);
  const [fruitData, setFruitData] = useState({});

  const selectFood = [
    {
      type: "gain",
      preference:"pescatarian",
      img: Avacado,
      fruit: "Avacado",
      desc: "Rich in healthy fats, avocados are calorie-dense and versatile. They can be added to salads, sandwiches, or blended into smoothies",
      grams: 100,
      usesOne: "Guacamole, salads",
      usesTwo: "sandwiches, smoothies",
      usesThree: "toast, sushi",
      usesFour: "soups, dressings",
      usesFive: "baking, skincare"
    },
    {
      type: "gain",
      preference:"pescatarian",
      img: nutbutter,
      fruit: "Nuts and Nut Butters",
      desc: "Almonds, cashews, peanuts, and their respective nut butters are packed with calories and healthy fats. They make for excellent snacks or additions to meals",
      grams: 28,
      usesOne: "fats, protein",
      usesTwo: "ideal for snacking",
      usesThree: "adding flavor and texture to dishes",
      usesFour: "smoothies, salads",
      usesFive: "baking, skincare"
    },
    {
      type: "loss",
      img: greenLeafvegetable,
      fruit: "Green-leaf",
      desc: "Foods like spinach, kale, and Swiss chard are low in calories but high in fiber, vitamins, and minerals",
      grams: 28,
      usesOne: "Guacamole, salads",
      usesTwo: "sandwiches, smoothies",
      usesThree: "toast, sushi",
      usesFour: "soups, dressings",
      usesFive: "baking, skincare"
    },
    {
      type: "loss",
      img: yugurt,
      fruit: "Yogurt",
      desc: " Greek yogurt is high in protein and can be a satisfying snack or addition to meals",
      usesOne: "Guacamole, salads",
      usesTwo: "sandwiches, smoothies",
      usesThree: "toast, sushi",
      usesFour: "soups, dressings",
      usesFive: "baking, skincare"
    },
  ]
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
  console.log("User Info"+userInfo);

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
        setFruitData(response.data.data);
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

  const filterFruits = selectFood.filter((fruits) => {
      const fruit = fruits.type === fruitData.healthGoal;
      return fruit;
  });
  

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
              onClick={handleAddFood}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Food
            </button>

            <button
              onClick={handleAddExercise}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Exercise
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
        <div className="FoodRecommendation">
          {
            filterFruits.map((value) => (
              <Grid container spacing={2} sx={{margin:"0 1rem 0 0"}}>
                <Grid item xs={6} md={6}>
                  <Card md={6}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                
                        sx={{height:"248px"}}
                        image={value.img}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {value.fruit}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "justify" }}>
                          {value.desc}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Card md={6}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="ul">
                          Weight {value.type}:
                        </Typography>
                        <Typography variant="li" color="text.secondary" component="li" sx={{ textAlign: "justify" }}>
                          <Typography variant="h6" component="span" sx={{ fontWeight: "600" }}>  250 grams </Typography> {value.fruit} provides <Typography variant="h6" component="span" sx={{ fontWeight: "600" }}> 500 Calories </Typography>  per day to gain weight <Typography variant="h6" component="span" sx={{ fontWeight: "600" }}>  0.5 kg </Typography>  per week.
                        </Typography>
                        <Typography variant="li" color="text.secondary" component="li" sx={{ textAlign: "justify" }}>
                          {value.fruit} contain <Typography variant="h6" component="span" sx={{ fontWeight: "600" }}>  160-200 calories </Typography>  per {value.grams} grams
                        </Typography>
                        <Typography gutterBottom variant="h5" component="ul">
                          Uses:
                        </Typography>
                        <Typography variant="li" color="text.secondary" component="li" >
                          {value.usesOne}
                        </Typography>
                        <Typography variant="li" color="text.secondary" component="li" >
                          {value.usesTwo}
                        </Typography>
                        <Typography variant="li" color="text.secondary" component="li" >
                          {value.usesThree}
                        </Typography>
                        <Typography variant="li" color="text.secondary" component="li" >
                          {value.usesFour}
                        </Typography>
                        <Typography variant="li" color="text.secondary" component="li" >
                          {value.usesFive}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            ))
          }

        </div>
      </div>



      <div className="bg-green-300 text-black py-8    w-full">
        <div className="flex justify-evenly ">
          <div className="">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>
          <div className=" ">
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <p>123 Main Street</p>
            <p>Cityville, State, 12345</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
