import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "../../../Component/toastr/toaster.tsx";

const Name = () => {
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();

  const [name, setName] = useState("");
  const [isNameSelected, setIsNameSelected] = useState(false);

  useEffect(() => {
    setIsNameSelected(name !== "");
  }, [name]);
  const navigate = useNavigate();
  let user = Cookies.get("userInfo");

  const userInfo = user ? JSON.parse(user) : null;
  const handleNext = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/user-update",
        {
          id: userInfo?._id,
          fullName: name,
        }
      );

      if (response.status === 200) {
        toast.success("Move on to the next");
        setTimeout(() => navigate("/NameCall", { state: { name } }), 2000);

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

  return (
    <div>
      <ToastContainer />
      <div className="bg-green-400 p-8 text-center text-3xl text-white font-bold">
        Name
      </div>
      <div className="mt-6 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">
        {/* <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-blue-500 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div> */}
        <div className="">
          <h1 className="text-center font-bold text-2xl mb-4 ">
            What's Your Name
          </h1>
          <p className="text-center mt-2">
            We’re glad you’re here.
            <br />
            Let’s find out a bit about you.
          </p>
          <div className="flex justify-center mt-5">
            <input
              required
              style={{ width: "280px", height: "40px", padding: "10px" }}
              type="text"
              className=" mt-4 border-green-600 border-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
        </div>
        <br />
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
            to={"/name"}
          >
            Back
          </Link>
          {isNameSelected ? (
            <button
              className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
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

export default Name;
