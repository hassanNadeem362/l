import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "../../Component/toastr/toaster.tsx";
import { ToastContainer } from "react-toastify";

const BodyComposition = () => {
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(4);
  const [input4Value, setInput4Value] = useState("");
  const [isFieldSelected, setIsFieldSelected] = useState(false);

  useEffect(() => {
    setIsFieldSelected(input4Value !== "");
  }, [input4Value]);
  const navigate = useNavigate();

  let user = Cookies.get("userInfo");

  const userInfo = user ? JSON.parse(user) : null;
  const handleNext = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id,
          currentBody: input4Value,
          // Add other fields as needed
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/GoalBody"), 2000);
      } else {
        toast.error("Failed to update user information");
        // Handle error logic here if needed
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("Failed to update user information");
      // Handle error logic here if needed
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-green-400 p-4 text-center text-2xl text-white font-bold">
        Body Composition
      </div>

      <div className="  mt-8 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-blue-500 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        <h1 className="mt-8 text-center font-bold text-2xl mb-3">
          Current Body Type
        </h1>
        <p className="text-center mb-5">
          Please indicate your current body type from the options below
        </p>

        <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
          <label>
            <input
              type="radio"
              name="bodyType"
              value="Lean Body"
              checked={input4Value === "Lean Body"}
              onChange={(e) => setInput4Value(e.target.value)}
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Lean Body
          </label>
        </div>

        <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
          <label>
            <input
              type="radio"
              name="bodyType"
              value="Average Body"
              checked={input4Value === "Average Body"}
              onChange={(e) => setInput4Value(e.target.value)}
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Average Body
          </label>
        </div>

        <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
          <label>
            <input
              type="radio"
              name="bodyType"
              value="Over Weight Body"
              checked={input4Value === "Over Weight Body"}
              onChange={(e) => setInput4Value(e.target.value)}
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Over Weight Body
          </label>
        </div>

        <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
          <label>
            <input
              type="radio"
              name="bodyType"
              value="Under Weight Body"
              checked={input4Value === "Under Weight Body"}
              onChange={(e) => setInput4Value(e.target.value)}
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Under Weight Body
          </label>
        </div>

        <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
          <label>
            <input
              type="radio"
              name="bodyType"
              value="Athletic"
              checked={input4Value === "Athletic"}
              onChange={(e) => setInput4Value(e.target.value)}
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Athletic
          </label>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
            to={"/WeeklyGoal"}
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

export default BodyComposition;
