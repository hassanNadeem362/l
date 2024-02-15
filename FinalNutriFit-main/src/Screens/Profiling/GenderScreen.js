import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "../../Component/toastr/toaster.tsx";

const GenderScreen = () => {
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(1);

  const [gender, setGender] = useState("male");
  const [selectedDate, setSelectedDate] = useState("");
  const [isGenderSelected, setIsGenderSelected] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsGenderSelected(gender !== "");
  }, [gender]);

  useEffect(() => {
    setIsDateSelected(selectedDate !== "");
  }, [selectedDate]);

  const handleNext = async () => {
    let user = Cookies.get("userInfo");

    const userInfo = user ? JSON.parse(user) : null;
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id,
          gender: gender,
          dateOfBirth: selectedDate,
          // Add other fields as needed
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/Height"), 2000);
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
      <div className="bg-green-400 p-8 text-center text-3xl text-white font-bold">
        Gender
      </div>
      <div className="mt-6 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-blue-500 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="">
          <h1 className="mt-2 text-center font-bold text-3xl mb-10">
            Select Your Gender
          </h1>
          <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              Male
            </label>
          </div>
          <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              Female
            </label>
          </div>
          <br />
          <div className="mt-5">
            <h1 className="text-xl font-bold">When you were born:</h1>
            <input
              required
              style={{ width: "180px", height: "30px" }}
              type="date"
              className=" ml-36 mt-4"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        <br />
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
            to={"/Msg1"}
          >
            Back
          </Link>
          {isGenderSelected && isDateSelected ? (
            <Link
              className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
              to={"/Height"}
              onClick={handleNext}
            >
              Next
            </Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm opacity-50 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenderScreen;
