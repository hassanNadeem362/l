import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { toast } from "../../../Component/toastr/toaster.tsx";
// ---------------------------------------3
const WeeklyGoal = () => {
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(3);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isFieldSelected, setIsFieldSelected] = useState(false);
  const [weeklyGoalWeightGain, setWeeklyGoalWeightGain] = useState("");

  // const userInfo = user ? JSON.parse(user) : null;

  const handleNext = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id,
          weeklyGoalWeightGain,
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/BodyComposition"), 2000);
        // You can add additional logic here if needed
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

  const handleBack = () => {};

  useEffect(
    (e) => {
      setIsFieldSelected(inputValue != "");
    },
    [inputValue]
  );

  return (
    <div>
      <div className="bg-green-400 p-4 text-center text-2xl text-white font-bold">
        Weekly Goal
      </div>
      <div className="mt-6 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div className="">
          <h1 className="mt-2 text-center font-bold text-3xl mb-4">
            What's your weekly goal?
          </h1>
          <div className="flex flex-col space-y-4">
            <p className="mt-1 text-center mb-5">
              Let’s break down your overall health goal into a weekly one you
              can maintain. Slow-and-steady is best!
            </p>
            <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
              <label>
                <input
                  required
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                  type="radio"
                  value="0.5"
                  checked={inputValue === "0.5"}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                0.5 Per Week
              </label>
            </div>
            <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
              <label>
                <input
                  required
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                  type="radio"
                  value="1"
                  checked={inputValue === "1"}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                1 Per Week
              </label>
            </div>

            <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
              <label>
                <input
                  required
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                  type="radio"
                  value="1.5"
                  checked={inputValue === "1.5"}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                1.5 Per Week
              </label>
            </div>

            <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
              <label htmlFor="option-2">
                <input
                  required
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                  type="radio"
                  value="2"
                  checked={inputValue === "2"}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                2 Per Week
              </label>
            </div>
            {/* <button
              className={`bg-white text-black text-xl p-3 rounded-sm border-green-700 border-2 ${selectedOption === 0.5 ? 'bg-green-400' : 'hover:bg-green-400'}`}
              onClick={() => setSelectedOption(0.5)}
            >
              0.5  per week
            </button>
            <button
              className={`bg-white text-black text-xl p-3 rounded-sm border-green-700 border-2 ${selectedOption === 1 ? 'bg-green-400' : 'hover:bg-green-400'}`}
              onClick={() => setSelectedOption(1)}
            >
              1 per week (Recommended)
            </button>
            <button
              className={`bg-white text-black text-xl p-3 rounded-sm border-green-700 border-2 ${selectedOption === 1.5 ? 'bg-green-400' : 'hover:bg-green-400'}`}
              onClick={() => setSelectedOption(1.5)}
            >
              1.5 per week
            </button>
            <button
              className={`bg-white text-black text-xl p-3 rounded-sm border-green-700 border-2 ${selectedOption === 2 ? 'bg-green-400' : 'hover:bg-green-400'}`}
              onClick={() => setSelectedOption(2)}
            >
               2 per week
            </button> */}
          </div>
        </div>
        <br />
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
            to={"/HeightWeight"}
          >
            Back
          </Link>
          {isFieldSelected ? (
            <Link
              className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
              to={"/BodyComposition"}
              onClick={handleNext}
            >
              Next
            </Link>
          ) : (
            <span className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm opacity-50 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
        {/* <div className="flex justify-between mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
            to={"/HeightWeight"}
            onClick={handleBack}
          >
            Back
          </Link>
          {selectedOption !== null ? (
            <Link
              className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
              to={"/BodyComposition"} // Replace with the next screen's path
              onClick={handleNext}
            >
              Next
            </Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm opacity-50 cursor-not-allowed">
              Next
            </span>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default WeeklyGoal;
