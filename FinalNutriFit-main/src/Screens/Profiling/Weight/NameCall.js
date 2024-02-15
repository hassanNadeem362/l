import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const NameCall = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const name = location?.state?.name || "";
  let user = Cookies.get("userInfo");

  const userInfo = user ? JSON.parse(user) : null;

  const handleHealthGoalSelect = async (selectedGoal) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id,
          healthGoal: selectedGoal,
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");

        // Navigate to the desired routes based on the selected health goal
        setTimeout(() => {
          switch (selectedGoal) {
            case "Gain Weight":
              navigate("/Msg1");
              break;
            case "Weight Loss":
              navigate("/Msg1");
              break;
            case "Maintain Weight":
              navigate("/Msg1");
              break;
            case "Increase Stamina":
              navigate("");
              break;
            default:
              break;
          }
        }, 2000);
      } else {
        toast.error("Failed to update user information");
        // Handle error logic here if needed
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("An error occurred while updating user information");
      // Handle error logic here if needed
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-green-400 p-8 text-center text-3xl text-white font-bold">
        { name }
      </div>
      <div className="mt-6 ml-96 mr-96 rounded-xl p-14 drop-shadow-2xl border-2">
        <div className="">
          <h1 className="mt-2 text-center font-bold text-3xl mb-2">
            Welcome, {name}
          </h1>
          <p className="text-center">
            {" "}
            Now you have to select your health goal <br />
          </p>
          <br />
          <div className="">
            <div className="flex flex-col space-y-4">
              <button
                className="bg-white hover:bg-green-400 text-black text-xl p-3 rounded-sm border-green-700 border-2"
                onClick={() => handleHealthGoalSelect("Gain Weight")}
              >
                Gain Weight
              </button>
              <button
                className="bg-white hover:bg-green-400 text-black text-xl p-3 rounded-sm border-green-700 border-2"
                onClick={() => handleHealthGoalSelect("Weight Loss")}
              >
                Weight Loss
              </button>
              <button
                className="bg-white hover:bg-green-400 text-black text-xl p-3 rounded-sm border-green-700 border-2"
                onClick={() => handleHealthGoalSelect("Maintain Weight")}
              >
                Maintain Weight
              </button>
              <button
                className="bg-white hover:bg-green-400 text-black text-xl p-3 rounded-sm border-green-700 border-2"
                onClick={() => handleHealthGoalSelect("Increase Stamina")}
              >
                Increase Stamina
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-500  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
            to={"/Name"}
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NameCall;
