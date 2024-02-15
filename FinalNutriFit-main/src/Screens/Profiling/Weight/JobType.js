import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "../../../Component/toastr/toaster.tsx";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const JobType = ({ onNext }) => {
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(19);

  const navigate = useNavigate();
  const [employmentStatus, setEmploymentStatus] = useState("");

  let user = Cookies.get("userInfo");
  const userInfo = user ? JSON.parse(user) : null;

  const handleNext = async () => {
    try {
      // Make an API call to update 'employmentStatus'
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id, // Replace with your user ID logic
          employmentStatus,
          // Add other fields as needed
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/physicalSchedule"), 2000);
        // API call successful, move to the next route
        onNext({ employmentStatus });
      } else {
        // Handle error logic here if needed
        toast.error("Failed to update employment status");
      }
    } catch (error) {
      // Handle error logic here if needed
      console.error("Error updating employment status:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-green-400 p-8 text-center text-3xl text-white font-bold">
        Employment Status
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
            What is your current employment status?
          </h1>
          <p className="text-center mb-10">
            To help us understand your occupation and provide you with the best
            support
          </p>
          <div className="text-lg ml-5 mb-5 bg-white rounded-lg p-3 hover:bg-green-400 border-2 border-green-600">
            <label>
              <input
                type="radio"
                name="employmentStatus"
                value="Office Job"
                checked={employmentStatus === "Office Job"}
                onChange={() => setEmploymentStatus("Office Job")}
              />
              Office Job
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 bg-white rounded-lg p-3 hover:bg-green-400 border-2 border-green-600">
            <label>
              <input
                type="radio"
                name="employmentStatus"
                value="Self Employed"
                checked={employmentStatus === "Self Employed"}
                onChange={() => setEmploymentStatus("Self Employed")}
              />
              Self Employed
            </label>
          </div>
        </div>
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1"
            to={"/sleep-time"}
          >
            Back
          </Link>
          {employmentStatus ? (
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

export default JobType;
