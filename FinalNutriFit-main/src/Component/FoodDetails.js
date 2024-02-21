import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom"; 
import { Image } from "react-bootstrap";
import axios from "axios";
import { HeartFill } from "react-bootstrap-icons";
import Cookies from "js-cookie";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';



const FoodDetails = () => {
  const { foodId } = useParams(); 
  const navigate = useNavigate();
  const [foodDetails, setFoodDetails] = useState({});
  console.log("🚀 ~ FoodDetails ~ foodDetails:", foodDetails);
  const [activeTab, setActiveTab] = useState("description");
  const [nutritionistDetails, setNutritionistDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [FavOfUser, setFavOfUser] = useState([]);

  const role = localStorage.getItem("userRole");

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
  };

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


    // Fetch nutritionist details using the nutritionistId from the food response
    const nutriInfo = async () => {
      try {
        let user = Cookies.get("userInfo");
        const userInfo = user ? JSON.parse(user) : null;
        console.log(userInfo);
        const response = await axios.get(
          `http://localhost:5000/api/nutritionist/${userInfo?._id}/nutritionDash`
        );
        const userData = response.data.data;
        console.log(userData);

        setNutritionistDetails(userData);
      } catch (error) {
        console.error("Error fetching favorite foods:", error);
      }
    }





    // Fetch user's favorite foods to check if the current food is a favorite
    const fetchFavFoods = async () => {
      try {
        let user = Cookies.get("userInfo");
        const userInfo = user ? JSON.parse(user) : null;
        const response = await axios.get(
          `http://localhost:5000/api/user/favorites/${userInfo?._id}`
        );
        setFavOfUser(response.data.data);
        setIsFavorite(response.data.data.includes(foodId));
      } catch (error) {
        console.error("Error fetching favorite foods:", error);
      }
    };

    fetchFoodDetails();
    fetchFavFoods();
    nutriInfo();
  }, [foodId]); // Re-run the effect when the foodId changes

  const handleToggleFavorites = async () => {
    let user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;

    try {
      if (isFavorite) {
        await axios.post("http://localhost:5000/api/user/removeUserFavorites", {
          foodId: foodId,
          userId: userInfo._id,
        });
      } else {
        await axios.post("http://localhost:5000/api/user/addToFavorites", {
          foodId: foodId,
          userId: userInfo._id,
        });
      }

      setIsFavorite(!isFavorite);
      fetchFavFoods();
    } catch (error) {
      console.error("Error toggling favorites:", error);
    }
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

  const { calories, carbs, fats, protein, cholesterol, fiber, sodium } =
    foodDetails;

  return (
    <>
      <nav class="bg-green-300 p-5">
        <div class="max-w-7xl mx-auto flex flex-row justify-between  items-center space-x-4">
          <Link to={"/"} class="text-black text-3xl font-bold ">
            <LocalDiningIcon fontSize="20px" /> NutriFit
          </Link>{" "}
          <div className="space-x-4 ml-4 ">
            <Link
              to={"/Features"}
              class="text-black text-xl px-3 py-1 navbar-link"
            >
              Diets
            </Link>

            <Link
              to={"/Blogs"}
              class="text-black text-xl px-3 py-1 navbar-link"
            >
              Blogs
            </Link>
            <Link
              to={"/AboutUs"}
              class="text-black text-xl px-3 py-1 navbar-link"
            >
              About Us
            </Link>
          </div>
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
              <button
                onClick={handleProfileClick}
                className="text-black text-xl px-3 py-1 navbar-link"
              >
                Dashboard
              </button>
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
      </nav>

      {/* header */}
      <div class="bg-cover bg-green-100 flex flex-row justify-around p-8">
        <div className="mt-48">
          {" "}
          <h1 className="text-5xl font-bold">
            <Typewriter
              options={{
                strings: [`${foodDetails.foodName}`],
                autoStart: true,
                loop: true,
                delay: 200,
              }}
            />
          </h1>
        </div>

        <div className="mt-10">
          <img
            className="rounded-lg drop-shadow-md"
            width={300}
            src={foodDetails.image}
            alt=""
          />
        </div>
      </div>
      {/* header finished */}

      <PageWrapper>
        <DetailWrapper>
          <div></div>
          <Info>
            <Button
              className={activeTab === "description" ? "active" : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </Button>
            <Button
              className={activeTab === "macronutrients" ? "active" : ""}
              onClick={() => setActiveTab("macronutrients")}
            >
              Macros
            </Button>
            <Button
              className={activeTab === "nutritionist" ? "active" : ""}
              onClick={() => setActiveTab("nutritionist")}
            >
              Nutritionist
            </Button>
          </Info>

          {activeTab === "description" && (
            <h5
              dangerouslySetInnerHTML={{ __html: foodDetails.description }}
            ></h5>
          )}

          {activeTab === "nutritionist" && (
            <table className="w-2/4 mt-10">
              <tbody>
                <tr>
                  <td className="pr-4 font-semibold">Name:</td>
                  <td>{foodDetails.nutritionistId.name}</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Email:</td>
                  <td>{foodDetails.nutritionistId.email}</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Phone:</td>
                  <td>{foodDetails.nutritionistId.phone}</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold" onClick={() => navigate('/chat')} >
                   <IconButton>
                    <ChatIcon />
                   </IconButton>
                  </td>
                  <td>Nutritionists</td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === "macronutrients" && (
            <table className="w-2/4 mt-5">
              <tbody>
                <tr>
                  <td className="pr-4">Calories:</td>
                  <td>{calories} cal</td>
                </tr>
                <tr>
                  <td className="pr-4">Carbs:</td>
                  <td>{carbs} g</td>
                </tr>
                <tr>
                  <td className="pr-4">Fats:</td>
                  <td>{fats} g</td>
                </tr>
                <tr>
                  <td className="pr-4">Protein:</td>
                  <td>{protein} g</td>
                </tr>
                <tr>
                  <td className="pr-4">Cholesterol:</td>
                  <td>{cholesterol} g</td>
                </tr>
                <tr>
                  <td className="pr-4">Fiber:</td>
                  <td>{fiber} g</td>
                </tr>
                <tr>
                  <td className="pr-4">Sodium:</td>
                  <td>{sodium} mg</td>
                </tr>
              </tbody>
            </table>
          )}
          {/* <h5 dangerouslySetInnerHTML={{ __html: details.diets }}></h5> */}
        </DetailWrapper>
      </PageWrapper>
    </>
  );
};

const DetailWrapper = styled.div`
      margin-top: 5rem;
      margin-bottom: 5rem;
      ${"" /* display: flex; */}
      .active {
        background: linear-gradient(90deg, rgba(161,238,147,1) 0%, rgba(156,255,161,1) 100%);
      color: green;
  }
      ${"" /* div {
        width: 500px;
      height: auto;
  } */
  }
  div img {
    width: 300px;
    height: auto;
    border-radius: 10px;
    box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12)
;
  }

  h5  {
    margin-top: 3rem;
  }

      h2 {
        margin-bottom: 2rem; 
        font-size: 1.5rem;
        font-weight: bold; 
  }
      li {
        font - size: 1.2rem;
      line-height: 2.5rem;
  }
      ul {
        margin - top: 2rem;
  }
      `;

const Button = styled.div`
  padding: 0.5rem 2rem;
  margin-top: 5px;
  color: #313131;
  background: white;
  border: 2px solid black;
  border-radius: 7px;
  margin-right: 2rem;
  font-weight: 600;
  max-width: 150px;
  max-height: 50px;
  box-shadow: 0px 44px 82px 4px rgba(0, 183, 34, 0.75);
  -webkit-box-shadow: 0px 44px 82px 4px rgba(0, 183, 34, 0.75);
  -moz-box-shadow: 0px 44px 82px 4px rgba(0, 183, 34, 0.75);
`;

const Info = styled.div`
  margin-top: 5rem;
  display: flex;
`;

const PageWrapper = styled.div`
  margin: 0% 20%;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export default FoodDetails;
