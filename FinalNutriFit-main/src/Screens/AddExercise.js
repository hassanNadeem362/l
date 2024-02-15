import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LocalDiningIcon from "@mui/icons-material/LocalDining";




function ExerciseComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [exerciseResults, setExerciseResults] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [calBurned, setCalBurned] = useState(0);

  const [exerciseFormData, setExerciseFormData] = useState({
    exerciseName: "",
    duration: "",
    caloriesBurned: 0.0,
  });

  const [durationError, setDurationError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [calorieRange, setCalorieRange] = useState({ min: 0, max: 0 });

  // New state variable to store search results
  const [savedExerciseResults, setSavedExerciseResults] = useState([]);



    const navigate = useNavigate();
    const role = localStorage.getItem("userRole");



  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchExercise();
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    if (!isValidForm()) {
      console.log(
        "Please fill in all required fields before closing the form."
      );
      // If the form is not valid, restore the saved search results
      setExerciseResults(savedExerciseResults);
      setSearchPerformed(true);
      setSelectedExercise(null);
    } else {
      try {
        setDurationError("");
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error while adding exercise:", error);
        // You might want to handle the error appropriately here
      }
    }
  };

  const isValidForm = () => {
    return !durationError && exerciseFormData.duration !== "";
  };

  const handleSearchExercise = async () => {
    try {
      const apiKey = "1f97f206d2msh1deed2067dece0fp1081a8jsn9c0b72d4a2c0";
      const exerciseResponse = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/name/${searchQuery}`,
        {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );

      setExerciseResults(exerciseResponse.data);
      setSearchPerformed(true);
      setSelectedExercise(null);

      // Save the search results in the new state variable
      setSavedExerciseResults(exerciseResponse.data);
    } catch (error) {
      console.error("Error fetching exercise details:", error);
      setExerciseResults([]);
      setSearchPerformed(true);
    }
  };

  // const handleSelectExercise = (exercise) => {
  //   setSelectedExercise(exercise);
  //   setExerciseFormData({
  //     ...exerciseFormData,
  //     exerciseName: exercise.name,
  //   });
  // };
  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    const durationInMinutes = exercise.duration / 60; // convert duration to minutes
    const minCalories = durationInMinutes * 10;
    const maxCalories = durationInMinutes * 12;
    setCalorieRange({ min: minCalories, max: maxCalories });

    setExerciseFormData({
      ...exerciseFormData,
      exerciseName: exercise.name,
    });
  };


      const handleProfileClick = () => {
        if (role === "admin") {
          // Redirect to admin dashboard
          navigate("/AdminDashboard");
        } else if (role === "nutritionist") {
          // Redirect to nutritionist dashboard
          navigate("/NutritionistDashboard");
        } else if (role === "customer") {
          // Handle other roles or scenarios as needed
          // Redirect to a default dashboard or show an error message
          navigate("/Dashboard");
        }
      };

      const handleSignOut = () => {
        Cookies.remove("userInfo");
        localStorage.removeItem("userRole");
        navigate("/Login");
      };

  const renderFormContent = () => {
    return (
      <div>
        <ToastContainer />
        <h2>Add Exercise Entry:</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-lg">Exercise Name:</label>
            <input
              type="text"
              name="exerciseName"
              value={selectedExercise ? selectedExercise.name : ""}
              readOnly
              className="p-2 border rounded w-full bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-lg">Duration:</label>
            <input
              type="text"
              name="duration"
              value={exerciseFormData.duration}
              onChange={handleInputChange}
              className={`p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300 ${
                durationError ? "border-red-500" : ""
              }`}
            />
            {durationError && <p className="text-red-500">{durationError}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg">Calories Burned:</label>
            <input
              type="text"
              name="caloriesBurned"
              value={parseFloat(exerciseFormData.caloriesBurned).toFixed(0)} // Format to display as 0.00
              readOnly
              className="p-2 border rounded w-full bg-gray-100"
            />
          </div>

          <button
            type="button"
            onClick={() => handleAddExercise(userId)}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={disabled}
          >
            Add Exercise
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </form>
      </div>
    );
  };

  const renderExerciseForm = () => {
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Exercise Modal"
        >
          {renderFormContent()}
        </Modal>
      </div>
    );
  };

  const renderExerciseResults = () => {
    if (exerciseResults.length === 0) {
      return (
        <p className="text-center text-gray-500">
          No matching exercises found.
        </p>
      );
    }

    if (selectedExercise) {
      return <div>{renderExerciseForm()}</div>;
    }

    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Matching exercises:</h2>
        {/* Use the saved exercise results instead of the API response */}
        {exerciseResults.map((exercise) => (
          <div
            key={exercise.id}
            className="mb-8 p-6 border rounded shadow-lg bg-white"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Name: {exercise.name}
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Target:</strong> {exercise.target}
            </p>
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="rounded-lg"
            />
            <button
              onClick={() => {
                handleSelectExercise(exercise);
                openModal();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    );
  };

  //   const handleInputChange = (e) => {
  //     const input = e.target.value;

  //     // Check if the backspace key is pressed
  //     if (
  //       e.nativeEvent.inputType === "deleteContentBackward" &&
  //       input.length > 1
  //     ) {
  //       const updatedDuration = input.slice(0, -1); // Remove the last character
  // const durationValue = parseFloat(updatedDuration);
  // const randomFloatBetween0And2 = Math.random() * 2;
  // console.log("🚀 ~ randomFloatBetween0And2:", randomFloatBetween0And2);

  // if (!isNaN(durationValue)) {
  //   const caloriesValue = durationValue * 10 + randomFloatBetween0And2;
  //   console.log("🚀 ~ Calories Value:", caloriesValue);
  //   // setCalBurned()
  //         setExerciseFormData({
  //           ...exerciseFormData,
  //           [e.target.name]: durationValue,
  //           caloriesBurned: caloriesValue,
  //         });

  //         setDisabled(false);
  //         setDurationError(""); // Reset the error when a valid input is provided
  //       }
  //     } else {
  //       const durationValue = parseFloat(input);

  //       if (isNaN(input)) {
  //         setDurationError("Please enter a valid number for duration.");
  //         setDisabled(true);
  //       } else {
  //         const caloriesValue = durationValue * 10; // adjust based on your calculation
  //         setExerciseFormData({
  //           ...exerciseFormData,
  //           [e.target.name]: durationValue,
  //           caloriesBurned: caloriesValue,
  //         });

  //         // Check for empty fields and update the disabled state
  //         const hasEmptyField = Object.values({
  //           ...exerciseFormData,
  //           [e.target.name]: durationValue,
  //         }).some((value) => value === "" || value === 0);

  //         setDisabled(hasEmptyField);
  //         setDurationError(""); // Reset the error when a valid input is provided
  //       }
  //     }
  //   };
  const handleInputChange = (e) => {
    const input = e.target.value;

    // Check if the backspace key is pressed
    if (
      e.nativeEvent.inputType === "deleteContentBackward" &&
      input.length > 1
    ) {
      const updatedDuration = input.slice(0, -1); // Remove the last character
      handleDurationChange(updatedDuration);
    } else {
      handleDurationChange(input, e);
    }
  };

  const handleDurationChange = (input, e) => {
    const durationValue = parseFloat(input);

    if (isNaN(input)) {
      setDurationError("Please enter a valid number for duration.");
      setDisabled(true);
    } else {
      const randomFloatBetween0And2 = Math.random() * 2;
      const caloriesValue = durationValue * 10 + randomFloatBetween0And2;

      setExerciseFormData({
        ...exerciseFormData,
        [e.target.name]: durationValue,
        caloriesBurned: caloriesValue.toFixed(2), // Format to display as 0.00
      });

      // Check for empty fields and update the disabled state
      const hasEmptyField = Object.values({
        ...exerciseFormData,
        [e.target.name]: durationValue,
      }).some((value) => value === "" || value === 0);

      setDisabled(hasEmptyField);
      setDurationError(""); // Reset the error when a valid input is provided
    }
  };

  const user = Cookies.get("userInfo");
  const userInfo = user ? JSON.parse(user) : null;
  const userId = userInfo ? userInfo._id : "";

  const handleAddExercise = async (userId) => {
    try {
      if (!exerciseFormData.duration) {
        setDurationError("Duration is required.");
        return;
      }

      const requestBody = {
        userId: userId,
        ...exerciseFormData,
      };

      const response = await axios.post(
        "http://localhost:5000/api/exercise/add",
        requestBody
      );

      toast.success(response.data.statusMessage);

      // Reset form data after successful addition
      setExerciseFormData({
        exerciseName: "",
        duration: "",
        caloriesBurned: 0,
      });
      setSearchQuery(""); // Optionally reset the search query as well

      // Close the modal after 2000 milliseconds (2 seconds)
      setTimeout(() => {
        closeModal();
      }, 2000);

      console.log("Exercise added successfully:", response.data);
    } catch (error) {
      console.error("Error adding exercise:", error);

      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error details:", error.message);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-blue-600">
          Exercise Database
        </h1>
      </header>
      <div className="mb-4">
        <label className="block mb-2 text-lg">
          Search our exercise database by name:
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress} // Handle Enter key press
            className="p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300 font-semibold"
          />
          <button
            onClick={handleSearchExercise}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
      {searchPerformed && renderExerciseResults()}
      <div className="mt-8">
        <Link to="/dashboard" className="text-blue-500">
          Go back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default ExerciseComponent;
