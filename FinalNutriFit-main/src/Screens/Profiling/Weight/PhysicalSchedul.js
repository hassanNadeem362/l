import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "../../../Component/toastr/toaster.tsx";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const PhysicalSchedule = ({ onNext }) => {
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(21);
  const [activityTime, setActivityTime] = useState("");
  const navigate = useNavigate();

  let user = Cookies.get("userInfo");
  const userInfo = user ? JSON.parse(user) : null;

  const handleNext = async () => {
    try {
      // Make an API call to update 'physicalScheduleActivity'
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id, // Replace with your user ID logic
          physicalScheduleActivity: activityTime,
          // Add other fields as needed
        }
      );

      if (response.status === 200) {
        toast.success("Welcome to the dashboard");
        setTimeout(() => navigate("/Dashboard"), 2000);
        // API call successful, move to the next route
        onNext({ physicalScheduleActivity: activityTime });
      } else {
        // Handle error logic here if needed
        toast.error("Failed to update physical schedule activity");
      }
    } catch (error) {
      // Handle error logic here if needed
      console.error("Error updating physical schedule activity:", error);
    }
  };

  // Check if activityTime is empty to enable/disable the Next button
  const isNextDisabled = activityTime === "";

  return (
    <div>
      <ToastContainer />
      <div className="bg-green-500 p-8 text-center text-2xl text-white font-bold">
        Activity Time
      </div>

      <div className="border-2 mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">
            Time you spend with some activity (Like walking, speaking, doing
            some physical activity)
          </h1>
          <p className="text-center mb-5">
            Specify the amount of time you usually spend engaging in moderate
            physical activities such as walking, speaking, or performing light
            physical tasks
          </p>
          <div className="mt-5">
            <h1 className="text-2xl text-center font-bold">Select Hours </h1>
            <select
              style={{ width: "200px", height: "30px" }}
              className="bg-white ml-60 mt-4"
              value={activityTime}
              onChange={(e) => setActivityTime(e.target.value)}
            >
              <option value="">Select Hours</option>
              <option value="3Hours">3 Hours</option>
              <option value="4Hours">4 Hours</option>
              <option value="5Hours">5 Hours</option>
              <option value="6Hours">6 Hours</option>
              <option value="7Hours">7 Hours</option>
              <option value="8Hours">8 Hours</option>
            </select>
          </div>
        </div>

        <div className="flex justify-around mt-20 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1"
            to={"/JobType"}
          >
            Back
          </Link>
          <button
            className={`bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 ${
              isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhysicalSchedule;
