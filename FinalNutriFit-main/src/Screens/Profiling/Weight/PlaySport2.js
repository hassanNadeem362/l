// PlaySport2.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "../../../Component/toastr/toaster.tsx";
import { ToastContainer } from "react-toastify";

const PlaySport2 = ({ onNext }) => {
  const [playsSport, setPlaysSport] = useState("");
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(10);
  const navigate = useNavigate();

  const handleNext = async () => {
    // Make an API call to update the 'isExercise' field
    let user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;

    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id, // Replace with your user ID logic
          isExercise: playsSport === "yes",
          // Add other fields as needed
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/dqs"), 2000);

        onNext({ playsSport });

        // You can add additional logic here if needed
      } else {
        toast.error("Failed to update user information");
        // Handle error logic here if needed
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      // Handle error logic here if needed
    }
  };

  // Check if the playsSport option is filled
  const isSportOptionSelected = playsSport !== "";

  return (
    <div>
      <ToastContainer />
      <div className="bg-green-500 p-8 text-center text-2xl text-white font-bold">
        Playing Sports
      </div>

      <div className="border-2  mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">
            Do You Play Any Kind of Sport?
          </h1>
          <p className=" text-center mb-5">
            We are keen to learn about your involvement in sports activities to
            provide you with more personalized support
          </p>
          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                value="yes"
                checked={playsSport === "yes"}
                onChange={() => setPlaysSport("yes")}
              />
              Yes
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                value="no"
                checked={playsSport === "no"}
                onChange={() => setPlaysSport("no")}
              />
              No
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1"
            to={"/workout-frequency2"}
          >
            Back
          </Link>
          {isSportOptionSelected ? (
            <button
              className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <span className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaySport2;
