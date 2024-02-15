import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { toast } from "../../Component/toastr/toaster.tsx";

const ActivityLevel = ({ onNext }) => {
  const totalSteps = 21; // Total number of steps/screens
  const [currentStep, setCurrentStep] = useState(17);
  const [activityLevel, setActivityLevel] = useState("");

  const [isFieldSelected, setIsFieldSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFieldSelected(activityLevel !== "");
  }, [activityLevel]);

  const handleNext = async () => {
    // Make an API call to update the 'dailyActivityLevel' field
    let user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;

    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id, // Replace with your user ID logic
          dailyActivityLevel: activityLevel,
          // Add other fields as needed
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/sqs"), 2000);

        onNext({ activityLevel });

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

  return (
    <div>
      <ToastContainer />
      <div className="bg-green-400 p-4 text-center text-2xl text-white font-bold">
        Daily Activity Level{" "}
      </div>

      <div className=" mt-6 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2 ">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        <h1 className="mt-2 text-center font-bold text-2xl mb-5">
          Daily Activity Level
        </h1>
        <p className="text-center mb-5">
          What best describes your daily activity level? Please select the
          option that aligns with your daily activity
        </p>

        <div>
          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                name="activityLevel"
                value="Sedentary"
                checked={activityLevel === "Sedentary"}
                onChange={(e) => setActivityLevel(e.target.value)}
              />
              Sedentary
            </label>
          </div>
          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                name="activityLevel"
                value="Light Active"
                checked={activityLevel === "Light Active"}
                onChange={(e) => setActivityLevel(e.target.value)}
              />
              Light Active
            </label>
          </div>
          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                name="activityLevel"
                value="Moderately Active"
                checked={activityLevel === "Moderately Active"}
                onChange={(e) => setActivityLevel(e.target.value)}
              />
              Moderately Active
            </label>
          </div>
          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                name="activityLevel"
                value="Very Active"
                checked={activityLevel === "Very Active"}
                onChange={(e) => setActivityLevel(e.target.value)}
              />
              Very Active
            </label>
          </div>
          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                name="activityLevel"
                value="Extremely Active"
                checked={activityLevel === "Extremely Active"}
                onChange={(e) => setActivityLevel(e.target.value)}
              />
              Extremely Active
            </label>
          </div>
        </div>
        <br />

        <div className="flex justify-around mt-5 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
            to={"/daily-meal"}
          >
            Back
          </Link>
          {isFieldSelected ? (
            <button
              className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <span className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm opacity-50 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLevel;
