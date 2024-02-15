// EatBeforeWorkout2.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "../../../Component/toastr/toaster.tsx";
import { ToastContainer } from "react-toastify";

const EatBeforeWorkout2 = ({ onNext }) => {
  const [carbOption, setCarbOption] = useState(""); // Default to empty
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(7);
  const navigate = useNavigate();

  const handleNext = async () => {
    let user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;

    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id,
          ebwo: carbOption,
          // Add other fields as needed
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/exercisetype2"), 2000);
      } else {
        toast.error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }

    // Ensure that onNext is a function before calling it
    if (typeof onNext === "function") {
      onNext({ carbOption });
    }
  };

  // Check if the carbOption is filled
  const isCarbOptionSelected = carbOption !== "";

  return (
    <div>
      <ToastContainer />
      <div className="bg-green-500 p-8 text-center text-3xl text-white font-bold">
        Carb Foods
      </div>

      <div className="border-2 mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-4">
            Your Pre-Exercise Eating Choices
          </h1>
          <p className="text-center mb-6">
            Please let us know what you typically consume before a workout or
            endurance activity
          </p>
          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400">
            <label>
              <input
                required
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                value="Low Carb Food"
                checked={carbOption === "Low Carb Food"}
                onChange={() => setCarbOption("Low Carb Food")}
              />
              Low carb foods (meat, eggs, seafood)
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400">
            <label>
              <input
                required
                style={{ width: "30px", height: "20px", marginRight: "8px" }}
                type="radio"
                value="High Carb Food"
                checked={carbOption === "High Carb Food"}
                onChange={() => setCarbOption("High Carb Food")}
              />
              High carb foods (quinoa, bananas, sweet potatoes)
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1"
            to={"/pwqs"}
          >
            Back
          </Link>
          {isCarbOptionSelected ? (
            <button
              className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EatBeforeWorkout2;
