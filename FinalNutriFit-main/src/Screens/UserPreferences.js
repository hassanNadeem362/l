import React from 'react'
import UserChoice from "../Component/UserForm.js";
import { Link, useNavigate } from 'react-router-dom';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Cookies from "js-cookie";
import {  useState } from "react";




const UserPreferences = () => {


      const [totalCalories, setTotalCalories] = useState(0);

        let user = Cookies.get("userInfo");


      const navigate = useNavigate();


    const handleAddFood = () => {
      setTotalCalories((prevTotalCalories) => prevTotalCalories + 100);
      navigate("/food");
    };


     const handleAddExercise = () => {
       navigate("/AddExercise");
     };

     const handleSignOut = () => {
       Cookies.remove("userInfo");
       navigate("/UserSignUp");
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

      <div className="max-w-3xl flex gap-7 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm">
        <Link to={"/Dashboard"} className="text-white">
          Home
        </Link>
        <button onClick={handleAddFood} className=" text-white">
          Food
        </button>
        <button onClick={handleAddExercise} className=" text-white">
          Exercise
        </button>
        <Link to={"/UserPreferences"} className="text-white">
          User Preferences
        </Link>
      </div>

      <div className="mx-auto mt-20">
        <UserChoice />
      </div>
    </>
  );
}

export default UserPreferences