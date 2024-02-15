import React, { useEffect, useState } from "react";
import Search from "../Component/Search";
import Category from '../Component/Category';
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Typewriter from "typewriter-effect";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AddedFoods from "../Component/AddedFoods";
import Home from "../pages/Home";
import Pages from "../pages/Pages";

const FeaturesScreen = () => {
  const navigate=useNavigate()
  const role=  localStorage.getItem("userRole");
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
      <div>
        <div>
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
            </div>
          </nav>
        </div>
        <div className="bg-cover bg-green-100 flex flex-row justify-around p-8">
          <div className="mt-48">
            {" "}
            <h1 className="text-5xl font-bold">
              <Typewriter
                options={{
                  strings: ["Check Our <br/> Recipes!"],
                  autoStart: true,
                  loop: true,
                  delay: 200,
                }}
              />
            </h1>
            <br />
            <p className=" text-xl ">
              Part of the secret of a success in life
              <br /> is to eat what you like and <br />
              let the food fight it out inside.
            </p>
          </div>

          <div className="mt-10">
            <img
              className="rounded-lg drop-shadow-md"
              height={500}
              width={550}
              src={require("../Data/reciipe-removebg-preview.png")}
            />
          </div>
        </div>
      </div>

      <AddedFoods />

      <Search />
      <Home />
    </>
  );
};

export default FeaturesScreen;
