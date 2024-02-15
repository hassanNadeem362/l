import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../../Component/toastr/toaster.tsx";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
// ------------------------------------------------1

const Height = () => {
  let user = Cookies.get("userInfo");

  const userInfo = user ? JSON.parse(user) : null;
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(2);

  const [name, setName] = useState("");
  const [isNameSelected, setIsNameSelected] = useState(false);
  const [heightFeet, setHeightFeet] = useState("");
  const [inches, setInches] = useState("");
  const [heightCentimeters, setHeightCentimeters] = useState("");
  const [isHeightSelected, setIsHeightSelected] = useState(false);
  const [isCentimeters, setIsCentimeters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsNameSelected(name !== "");
  }, [name]);

  useEffect(() => {
    setIsHeightSelected(
      (heightFeet !== "" && inches !== "") || heightCentimeters !== ""
    );
  }, [heightFeet, inches, heightCentimeters]);

  const handleBlur = () => {
    if (inches > 12) {
      setInches("11.9");
      alert("You cannot exceed 12 inches");
    }
  };

  const handleNext = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id,
          heightFeet: isCentimeters ? null : heightFeet,
          inches: isCentimeters ? null : inches,
        }
      );

      if (response.data.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/HeightWeight"), 2000);
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

  const handleUnitChange = () => {
    setIsCentimeters(!isCentimeters);
  };
  return (
    <div>
      <ToastContainer />
      <div className="bg-green-500 p-8 text-center text-3xl text-white font-bold">
        Height
      </div>
      <div className=" mt-2 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div>
          <h1 className=" text-center font-bold text-2xl mt-4">
            How tall are you?
          </h1>
          <div className="">
            <h3 className=" mt-2 mb-5 text-center">
              {" "}
              You can provide your height in Feet & inches or Centimeters ,
              Whichever you find more convenient{" "}
            </h3>

            <div className="mt-10 flex justify-center">
              <input
                required
                style={{ width: "70px", height: "30px", marginRight: "10px" }}
                type="number"
                className="mr-2 border-2 p-2"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                placeholder="Feet"
              />

              <span className="text-lg">feet</span>

              <input
                required
                style={{ width: "70px", height: "30px", marginRight: "10px" }}
                type="number"
                className="mr-2 border-2  ml-3 p-1"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                onBlur={handleBlur}
                placeholder="inches"
              />

              <span className="text-lg">inches</span>
            </div>

            {/* <button
              className="text-blue-500 ml-24 underline cursor-pointer mt-5 "
              onClick={handleUnitChange}
            >
              {isCentimeters ? 'Change units to feet' : 'Change units to centimeters'}
            </button> */}
          </div>
        </div>
        <br />
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
            to={"/Gender"}
          >
            Back
          </Link>
          {isHeightSelected ? (
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

export default Height;
