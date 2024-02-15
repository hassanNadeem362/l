import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "../../../Component/toastr/toaster.tsx";
import { ToastContainer } from "react-toastify";

const HealthyFats = ({ onNext }) => {
  const [healthyFatSources, setHealthyFatSources] = useState([]);
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(15);

  const handleToggleSource = (source) => {
    if (healthyFatSources.includes(source)) {
      setHealthyFatSources(healthyFatSources.filter((item) => item !== source));
    } else {
      setHealthyFatSources([...healthyFatSources, source]);
    }
  };
  const navigate = useNavigate();

  const handleNext = async () => {
    // Make an API call to update the 'healthyFatSources' field
    let user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;

    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id, // Replace with your user ID logic
          fatsConsumption: healthyFatSources,
          // Add other fields as needed
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/daily-meal"), 2000);

        onNext({ healthyFatSources });

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

  // Check if at least one checkbox is selected
  const isAtLeastOneCheckboxSelected = healthyFatSources.length > 0;

  return (
    <div>
      <ToastContainer />

      <div className="bg-green-500 p-8 text-center text-2xl text-white font-bold">
        Healthy Fat Sources
      </div>

      <div className="border-2  mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-10">
            Healthy Fats Consumption
          </h1>
          <p className="text-center mb-6">
            What sources of healthy fats do you include in your diet? Please
            select one or more options:
          </p>
          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="checkbox"
                value="Avocado"
                checked={healthyFatSources.includes("Avocado")}
                onChange={() => handleToggleSource("Avocado")}
              />
              Avocado
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="checkbox"
                value="Nuts"
                checked={healthyFatSources.includes("Nuts")}
                onChange={() => handleToggleSource("Nuts")}
              />
              Nuts
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="checkbox"
                value="Seeds"
                checked={healthyFatSources.includes("Seeds")}
                onChange={() => handleToggleSource("Seeds")}
              />
              Seeds
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="checkbox"
                value="OliveOil"
                checked={healthyFatSources.includes("OliveOil")}
                onChange={() => handleToggleSource("OliveOil")}
              />
              Olive oil
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="checkbox"
                value="None"
                checked={healthyFatSources.includes("None")}
                onChange={() => handleToggleSource("None")}
              />
              None
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1"
            to={"/protein"}
          >
            Back
          </Link>
          {isAtLeastOneCheckboxSelected ? (
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

export default HealthyFats;
