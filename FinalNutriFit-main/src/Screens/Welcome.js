import React, { useState, useEffect } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Link, useNavigate } from "react-router-dom";
import Cardd from "../Component/Cardd";
import Typewriter from "typewriter-effect";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { height } from "@mui/system";
import styled from "@emotion/styled";
import Exercises from "./Exercises";
import ScrollWrapper from "./ScrollWrapper";
import Recipe from "./Recipe";
import Popular from "../Component/popular";
import Veggie from "../Component/veggie";
import Cookies from "js-cookie";
import { MdDashboardCustomize } from "react-icons/md";



const API_KEY = "f0d80579f3204d7297bc576470ecbc62";
const url = "https://newsapi.org/v2/everything?q=";

const Welcome = () => {
  const [exerciseArticles, setExerciseArticles] = useState([]);
  useEffect(() => {
    fetchNews("Exercise", 3); // Fetch 3 exercise articles
  }, []);
  async function fetchNews(query, count) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    const selectedArticles = data.articles.slice(0, count);
    setExerciseArticles(selectedArticles);
  }
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  const handleProfileClick = () => {
  if (role === "admin") {
    // Redirect to admin dashboard
    navigate("/AdminDashboard");
  } else if (role === "nutritionist") {
    // Redirect to nutritionist dashboard
    navigate("/NutritionistDashboard");
  } else if (role === "customer"){
    // Handle other roles or scenarios as needed
    // Redirect to a default dashboard or show an error message
    navigate("/Dashboard");
  }
}

  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
  };

  

  return (
    <div className="bg-gray-100">
      <div>
        
        
        
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



      </div>
      <div class=" bg-cover h-2/5 bg-green-100 flex flex-row justify-around p-8">
        <div className="mt-52">
          {" "}
          <h1 className="text-5xl font-bold">
            <Typewriter
              options={{
                strings: [
                  "Be Healthy <br/> for life!",
                  "Be Healthy <br/> for life!",
                ],
                autoStart: true,
                loop: true,
                delay: 200,
              }}
            />
          </h1>
          <br />
          <p className="font-semibold text-xl ">
            Your weight loss, diet, and <br /> nutrition assistant
          </p>
        </div>

        <div className="mt-10">
          <img
            className="rounded-lg drop-shadow-md hover:-translate-x-5 transition-all"
            height={350}
            width={350}
            src={require("../Data/Home-removebg-preview.png")}
          />
        </div>
      </div>
      {/* <hr className='mt-1' style={{ background: 'black', height: '3px', }} /> */}
      {/* -------------------------------------------Block------------------------------------------------- */}
      <PageWrapper>
        <div className=" mt-14 mb-14">
          <h1 className="text-center text-3xl font-bold">
            {" "}
            What Would You Get{" "}
          </h1>
        </div>
        <div className="mt-8 pt-2 pb-2">
          <div className="flex justify-around mt-32 mb-20">
            {/* <img
              className="rounded-lg drop-shadow-2xl-[red]"
              src={require("../Data/first.png")}
              height={"400px"}
              width={"400px"}
            /> */}
            <video
              autoPlay
              loop
              muted
              playsInline
              src={require("../assets/videos/Personlized_Meal_plan.mp4")}
              height={"400px"}
              width={"400px"}
            ></video>
            <div className="text-2xl w-2/5">
              {" "}
              <p className="text-[1.5rem]">
                <strong>Personlized Meal plan</strong>
              </p>{" "}
              <br />{" "}
              <p className="text-[1.2rem]">
                Сontains ingredients, step-by-step preparation, extra recipes to
                swap and nutritional value
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-20">
          <div className="mt-15 mb-20 w-2/5">
            <h1 className="text-[1.5rem] mt-16">
              <strong>Fat-burning workouts</strong> <br />{" "}
              <p className="text-[1.2rem]">
                Tell us about yourself so that we can create a personalized meal
                plan tailored to your needs, preferences, and goals.
              </p>
            </h1>
          </div>
          <img
            className="rounded-lg shadow-lg hover:-translate-y-5 transition-all"
            src={require("../Data/second.png")}
            height={"350px"}
            width={"350px"}
          />
        </div>
        <br />
        <br />
        <br />
        {/* -------------------------------------------Block------------------------------------------------- */}
        <div className="flex justify-around mt-20">
          <img
            className="rounded-lg shadow-lg hover:-translate-y-5 transition-all"
            src={require("../Data/third.png")}
            height={"350px"}
            width={"350px"}
          />
          <div className="w-2/5">
            <h1 className="text-[1.5rem]">
              <strong>Professional support</strong> <br />
              <br />{" "}
              <p className="text-[1.2rem]">
                Don’t hesitate to ask your question. We are here to help you
                solve any kind of difficulty 24/7.{" "}
              </p>
            </h1>
          </div>
        </div>

        <div className="flex justify-around mt-20">
          <div className="mt-10 mb-20 w-2/5">
            <h1 className="text-[1.5rem] mt-16">
              <strong>Healthy lifestyle basics</strong> <br />
              <br />{" "}
              <p className="text-[1.2rem]">
                Educate yourself on how to develop a healthier lifestyle. Know
                more about eating, sleep, stress etc{" "}
              </p>
            </h1>
          </div>
          <img
            className="rounded-lg shadow-lg hover:-translate-y-5 transition-all"
            src={require("../Data/Home-removebg-preview.png")}
            height={"300px"}
            width={"300px"}
          />
        </div>
      </PageWrapper>
      <hr className="mt-10"></hr>
      <br />
      <div className="mt-10">
        <Popular />
        <div className="mt-5 hover:-translate-y-2 transition-all absolute right-0 mr-60">
          <Link className="p-2 rounded-md bg-white" to={"/Features"}>
            View All Picks
          </Link>
        </div>
      </div>
      {/* -------------------------------------------Recipie------------------------------------------------- */}
      {/* <hr />
      <hr />
      <hr />
      <br />
      <br />
      <br />
      <br /> <br /> */}
      <div className="bg-green-300 p-20 mt-40 ml-40 mr-40 rounded-2xl mb-10 flex justify-around">
        <p className="font-semibold text-[1.1rem]">
          NutriFit inspires with fun & result!
          <br />
          Get your personal meal plan, daily motivation and
          <br />
          learning program
          <br />
          Start your journey now
          <br />
          {/* <div className="mt-5 hover:-translate-y-2 transition-all">
            <Link className="p-2 rounded-md bg-white" to={"/UserSignUp"}>
              Join Now
            </Link>
          </div> */}
          {!role ? (
            <div class="mt-5 hover:-translate-y-2 transition-all">
              <Link to={"/UserSignUp"} class="p-2 rounded-md bg-white">
                Join Now
              </Link>
            </div>
          ) : (
            <div class="mt-5 hover:-translate-y-2 transition-all">
              <Link to={"/"} class="p-2 rounded-md bg-white">
                <button>Already In</button>
              </Link>
            </div>
          )}
        </p>

        <img
          className="rounded-lg bg-slate-400 shadow-lg hover:-translate-y-5 transition-all"
          src={require("../Data/asset 30.png")}
          height={"150px"}
          width={"150px"}
        />
      </div>
      <div className="bg-green-300 text-black py-8">
        <div className="flex justify-evenly">
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
    </div>
  );
};

export default Welcome;

const PageWrapper = styled.div`
  margin: 0% 10%;
`;



const title = "Recepie";
const description =
  "Creating a delightful recipe involves a harmonious blend of flavors, textures, and techniques.";
const imageUrl =
  "https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg";

const title2 = "Exersise";
const description2 =
  "Creating a delightful recipe involves a harmonious blend of flavors, textures, and techniques";
const imageUrl4 =
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80";
const imageUrl2 =
  "https:/images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXhlcmNpc2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80";
const imageUrl5 =
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";
const imageUrl6 =
  "https://plus.unsplash.com/premium_photo-1664297947327-6e03f98b4eb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";
const imageUrl3 =
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";
