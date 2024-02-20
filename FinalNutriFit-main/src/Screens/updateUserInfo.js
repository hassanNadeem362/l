import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { ToastContainer } from "react-toastify";
import { toast } from "../Component/toastr/toaster.tsx";
import { useUserAuth } from "../context/UserAuthContext.js";
const UpdateUserInfo = () => {
  const { nutrition } = useUserAuth();
  const [userInfo, setUserInfo] = useState(nutrition); // Initialize with an empty object if nutrition is undefined

  console.log(userInfo);

 
  const navigate = useNavigate();


  useEffect(() => {
    const user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, []);
  const role = localStorage.getItem("userRole");
  // const handleSignOut = () => {
  //   Cookies.remove("userInfo");
  //   localStorage.removeItem("userRole");
  //   navigate("/Login");
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/user-update/${userInfo._id}`,
        userInfo
      );
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleProfileClick = () => {
    if (role === "admin") {
      navigate("/AdminDashboard");
    } else if (role === "nutritionist") {
      navigate("/NutritionistDashboard");
    } else if (role === "customer") {
      navigate("/Dashboard");
    }
  };

  return (
    <div>
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
          {/* <div className="space-x-4">
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
                    <PersonIcon /> SignOut
                  </button>
                </Link>
              </div>
            )}
          </div> */}
        </div>
      </nav>
      <ToastContainer />
      <div className="max-w-md flex gap-7 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm">
        <Link
          to="/UserPreferences"
          className="text-black text-xl p-1 rounded-xl"
        >
          🏠 Home
        </Link>
      </div>

      <h1 className="text-center mb-4 text-3xl font-semibold underline">
        Edit User Information
      </h1>
      <form onSubmit={handleSubmit} className="mx-auto mt-8">
        <table className="w-3/4 mx-auto border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left border-r">User Information</th>
              <th className="py-3 px-6 text-left border-r">
                Health and Fitness
              </th>
              <th className="py-3 px-6 text-left border-r">Body Information</th>
              <th className="py-3 px-6 text-left">Other Preferences</th>
            </tr>
          </thead>
          <tbody>
            <tr className="transition-al bg-slate-200">
              {/* User Information */}
              <td className="py-4 px-6 border-r border-b">
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Full Name:
                      <input
                        type="text"
                        name="fullName"
                        value={userInfo.fullName}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-black shadow-sm"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Email:
                      <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={(e) => handleChange(e)}
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Phone:
                      <input
                        type="text"
                        name="phone"
                        value={userInfo.phone}
                        onChange={(e) => handleChange(e)}
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Gender:
                      <input
                        type="text"
                        name="gender"
                        value={userInfo.gender}
                        onChange={(e) => handleChange(e)}
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Date of Birth:
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={userInfo.dateOfBirth}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Height:
                      <input
                        type="text"
                        name="height"
                        value={userInfo.height}
                        onChange={(e) => handleChange(e)}
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Current Weight:
                      <input
                        type="text"
                        name="currentWeight"
                        value={userInfo.currentWeight}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Desired Weight:
                      <input
                        type="text"
                        name="desiredWeight"
                        value={userInfo.desiredWeight}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                </div>
              </td>

              {/* Health and Fitness */}
              <td className="py-4 px-6 border-r border-b">
                <div className="grid grid-cols-1 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Health Goal:
                      <input
                        type="text"
                        name="healthGoal"
                        value={userInfo.healthGoal}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Exercise Preference:
                      <input
                        type="text"
                        name="exercisePref"
                        value={userInfo.exercisePref}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Dietary Preferences:
                      <input
                        type="text"
                        name="dietaryPreferences"
                        value={userInfo.dietaryPreferences}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                </div>
              </td>

              {/* Body Information */}
              <td className="py-4 px-6 border-r border-b">
                <div className="grid grid-cols-1 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Current Body:
                      <input
                        type="text"
                        name="currentBody"
                        value={userInfo.currentBody}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Desired Body:
                      <input
                        type="text"
                        name="desiredBody"
                        value={userInfo.desiredBody}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      EBWO:
                      <input
                        type="text"
                        name="ebwo"
                        value={userInfo.ebwo}
                        onChange={(e) => handleChange(e)}
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                </div>
              </td>

              {/* Other Preferences */}
              <td className="py-4 px-6 border-b">
                <div className="grid grid-cols-1 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Daily Activity Level:
                      <input
                        type="text"
                        name="dailyActivityLevel"
                        value={userInfo.dailyActivityLevel}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Daily Meal Choices:
                      <input
                        type="text"
                        name="dailyMealChoices"
                        value={userInfo.dailyMealChoices}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Employment Status:
                      <input
                        type="text"
                        name="employmentStatus"
                        value={userInfo.employmentStatus}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Physical Schedule Activity:
                      <input
                        type="text"
                        name="physicalScheduleActivity"
                        value={userInfo.physicalScheduleActivity}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Sleep Time:
                      <input
                        type="text"
                        name="sleepTime"
                        value={userInfo.sleepTime}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Wake Up Time:
                      <input
                        type="text"
                        name="wakeUpTime"
                        value={userInfo.wakeUpTime}
                        onChange={(e) =>
                          handleChange(e)
                        }
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UpdateUserInfo;
