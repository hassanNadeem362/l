import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PersonIcon from '@mui/icons-material/Person';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toaster, { toast } from "../Component/toastr/toaster.tsx";
import { ToastContainer } from "react-toastify";



const UpdateFood = () => {
  const [foodDetails, setFoodDetails] = useState({});
  const { foodId } = useParams(); 
  const [fieldsToUpdate, setFieldsToUpdate] = useState({
    id: '',
    foodName: '',
    description: '',
    calories: '',
    carbs: '',
    fats: '',
    protein: '',
    cholesterol: '',
    fiber: '',
    sodium: '',
  });

  // const { foodId } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");

  // Function to fetch food information
  // useEffect(() => {
  //   const fetchFoodInfo = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/nutritionist/addedFoods`
  //       );

  //       if (Array.isArray(response.data.data) && response.data.data.length > 0) {
  //         const food = response.data.data.find((item) => item._id === foodId);
  //         if (food) {
  //           setFieldsToUpdate({
  //             foodName: food.foodName,
  //             description: food.description,
  //             calories: food.calories,
  //             carbs: food.carbs,
  //             fats: food.fats,
  //             protein: food.protein,
  //             cholesterol: food.cholesterol,
  //             fiber: food.fiber,
  //             sodium: food.sodium,
  //             id: food._id,
  //           });
  //         } else {
  //           console.error('Food not found');
  //         }
  //       } else {
  //         console.error('No data or invalid response format');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching food information', error);
  //     }
  //   };

  //   fetchFoodInfo();
  // }, [foodId]);



  useEffect(() => {
    // Fetch food details using the foodId
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/nutritionist/addedFoods`
        );
        const matchingFood = response.data.data.find(
          (food) => food._id === foodId
        );
        setFoodDetails(matchingFood || {});
  
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };
  
    fetchFoodDetails(); // Call the function to fetch food details
  
  }, [foodId]);

  // Function to handle food update
  const handleUpdateFood = async () => {
    const user = Cookies.get('userInfo');
    const userInfo = user ? JSON.parse(user) : null;
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/nutritionist/updateFood/${foodId}`,
        fieldsToUpdate,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`, // Include authentication token
          },
        }
      );
  
      Cookies.set("userInfo", JSON.stringify(response.data.data));


      toast.success("Profile updated successfully");
      // Handle success or show a notification to the user
      console.log("Profile updated successfully");
    } catch (error) {
      // Handle errors, show a notification, or redirect the user
      console.error("Error updating profile:", error);
    }
  };
  

  // Function to handle field changes
  const handleFieldChange = (fieldName, value) => {
    setFieldsToUpdate((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  // Function to handle profile click
  // const handleProfileClick = () => {
  //   // Add logic to handle different user roles and navigate to the appropriate dashboard
  // };
  

  // const handleFieldChange = (fieldName, value) => {
  //   setFieldsToUpdate((prevFields) => ({
  //     ...prevFields,
  //     [fieldName]: value,
  //   }));
  // };

  const handleProfileClick = () => {
    if (role === 'admin') {
      navigate('/AdminDashboard');
    } else if (role === 'nutritionist') {
      navigate('/NutritionistDashboard');
    } else if (role === 'customer') {
      navigate('/Dashboard');
    }
  };

  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
  };

  return (
    <>
    <ToastContainer />
      <nav className="bg-green-300 p-5">
        <div className="max-w-7xl mx-auto flex flex-row justify-between  items-center space-x-4">
          <Link to={"/"} class="text-black text-3xl font-bold ">
            <LocalDiningIcon fontSize="20px" /> NutriFit
          </Link>{" "}
          <div className="space-x-4 ml-4 ">
            <Link
              to={"/Features"}
              className="text-black text-xl px-3 py-1 navbar-link"
            >
              Diets
            </Link>

            <Link
              to={"/Blogs"}
              className="text-black text-xl px-3 py-1 navbar-link"
            >
              Blogs
            </Link>
            <Link
              to={"/AboutUs"}
              className="text-black text-xl px-3 py-1 navbar-link"
            >
              About Us
            </Link>
          </div>
          <div className="space-x-4">
            {!role ? (
              <div class="space-x-4">
                <Link
                  to={"/Login"}
                  class="text-black text-xl px-3 py-1 navbar-link"
                >
                  <PersonIcon /> Login
                </Link>
                <Link
                  to={"/UserSignUp"}
                  class="text-black text-xl px-3 py-1 navbar-link"
                >
                  <AccountBoxIcon /> SignUp
                </Link>
              </div>
            ) : (
              <div class="space-x-4">
                <Link
                  to={"/Login"}
                  class="text-black text-xl px-3 py-1 navbar-link"
                >
                  <button onClick={handleSignOut}>
                    <PersonIcon /> Sign Out
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-2xl flex gap-7 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm">
        <button
          onClick={handleProfileClick}
          className="text-black text-xl p-1 rounded-xl"
        >
          🏠 Home
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-8 bg-white border rounded-md shadow-md">
        <h2 className="text-3xl mb-6">🚀 Update Food</h2>
        <div className="mb-4">
          <label
            htmlFor="foodName"
            className="block text-sm font-semibold text-gray-600"
          >
            Food Name:
          </label>
          <input
            type="text"
            id="foodName"
            className="mt-1 p-3 border rounded-md w-full"
            value={fieldsToUpdate.foodName}
            onChange={(e) => handleFieldChange('foodName', e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-600">
            📧 Description:
          </label>
          <input
            type="text"
            id="description"
            className="mt-1 p-3 border rounded-md w-full"
            value={fieldsToUpdate.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="calories" className="block text-sm font-semibold text-gray-600">
          🌟 Calories:
          </label>
          <input
            type="text"
            id="calories"
            className="mt-1 p-3 border rounded-md w-full"
            value={fieldsToUpdate.calories}
            onChange={(e) => handleFieldChange('calories', e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="carbs" className="block text-sm font-semibold text-gray-600">
          🍚 Carbs:
          </label>
          <input
            type="text"
            id="carbs"
            className="mt-1 p-3 border rounded-md w-full"
            value={fieldsToUpdate.carbs}
            onChange={(e) => handleFieldChange('carbs', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fats"
            className="block text-sm font-semibold text-gray-600"
          >
           🧈 Fats:
          </label>
          <input
            type="text"
            id="fats"
            className="mt-1 p-3 border rounded-md w-full"
            value={fieldsToUpdate.fats}
            onChange={(e) => handleFieldChange('fats', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="protein"
            className="block text-sm font-semibold text-gray-600"
          >
            🍗 Protein:
          </label>
          <input
            type="text"
            id="protein"
            className="mt-1 p-3 border rounded-md w-full"
            value={fieldsToUpdate.protein}
            onChange={(e) => handleFieldChange('protein', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cholesterol"
            className="block text-sm font-semibold text-gray-600"
          >
            🍤 Cholesterol:
          </label>
          <input
            type="text"
            id="cholesterol"
            className="mt-1 p-3 border rounded-md w-full"
            value={fieldsToUpdate.cholesterol}
            onChange={(e) => handleFieldChange('cholesterol', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fiber"
            className="block text-sm font-semibold text-gray-600"
          >
            🌾 Fiber:
          </label>
          <input
            type="text"
            id="fiber"
            className="mt-1 p-3 border rounded-md w-full"
            value={fieldsToUpdate.fiber}
            onChange={(e) => handleFieldChange('fiber', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="sodium"
            className="block text-sm font-semibold text-gray-600"
          >
            🧂 Sodium:
          </label>
          <input
            type="text"
            id="sodium"
            className="mt-1 p-3 border rounded-md w-full"
            value={fieldsToUpdate.sodium}
            onChange={(e) => handleFieldChange('sodium', e.target.value)}
          />
        </div>

        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700"
          onClick={handleUpdateFood}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

export default UpdateFood
