import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SuggestedFoods from "../Component/SuggestedFoods";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";

const NutDet = () => {
  const [dash, setDash] = useState({});
  console.log("🚀 ~ UserDetailsPage ~ dash:", dash);
  const { userId } = useParams();

  const navigate = useNavigate();
  console.log("🚀 ~ UserDetailsPage ~ userId:", userId);
  const role = localStorage.getItem("userRole");

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/nutritionist/${userId}/nutritionDash`
        );
        const userData = response.data.data;
        console.log(userData);
        setDash(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle errors
      }
    };

    userId.length ? fetchUserDetails() : "";
  }, [userId]);

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

  return (
    <>
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
                    <PersonIcon /> SignOut
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="w-3/5 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm">
        <button
          onClick={handleProfileClick}
          className="text-black text-xl p-1 rounded-xl"
        >
          🏠 Home
        </button>
      </div>

      <div class="container mx-auto p-8">
        <h2 class="text-2xl font-bold mb-4 text-center">
          Nutritionist Details
        </h2>
        <table class="table-auto w-2/3 mx-auto">
          <tbody>
            <tr>
              <td class="border px-4 py-2 font-semibold">Name</td>
              <td class="border px-4 py-2">{dash?.name}</td>
            </tr>
            <tr>
              <td class="border px-4 py-2 font-semibold">Email</td>
              <td class="border px-4 py-2">{dash?.email}</td>
            </tr>
            <tr>
              <td class="border px-4 py-2 font-semibold">ID</td>
              <td class="border px-4 py-2">{dash?._id}</td>
            </tr>
            <tr>
              <td class="border px-4 py-2 font-semibold">Phone</td>
              <td class="border px-4 py-2">{dash?.phone}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Document</td>
              <td className="border px-4 py-2">
                {dash?.document && dash.document.data && (
                  <a
                    href={`data:${dash.document.contentType};base64,${arrayBufferToBase64(dash.document.data.buffer)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Certificate
                  </a>  
                )}
              </td>
            </tr>
            {/* You might not want to display the password directly in the UI */}

            {/* <tr>
        <td class="border px-4 py-2 font-semibold">Password</td>
        <td class="border px-4 py-2">{dash?.password}</td>
      </tr> */}
          </tbody>
        </table>
        <SuggestedFoods nutritionistId={userId} />
      </div>
    </>
  );
};

export default NutDet;
