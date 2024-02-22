import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { HeartFill } from "react-bootstrap-icons";
import axios from "axios";
import { Image } from "react-bootstrap";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";

const AllFoodsForAdmin = () => {
  const [addedFoods, setAddedFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [FavOfUser, setFavOfUser] = useState([]);
  const history = useNavigate(); // Create a history object

  const role = localStorage.getItem("userRole");
  const navigate = useNavigate();
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  useEffect(() => {
    fetchAddedFoods();
    fetchFavFoods();
  }, []);

  const fetchFavFoods = async () => {
    try {
      let user = Cookies.get("userInfo");
      const userInfo = user ? JSON.parse(user) : null;
      const response = await axios.get(
        `http://localhost:5000/api/user/favorites/${userInfo?._id}`
      );

      setFavOfUser(response.data.data);
    } catch (error) {
      console.error("Error fetching favorite foods:", error);
    }
  };

  const fetchAddedFoods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/nutritionist/addedFoods"
      );
      setAddedFoods(response.data.data);
    } catch (error) {
      console.error("Error fetching added foods:", error);
    }
  };

  const handleToggleFavorites = async (foodId) => {
    let user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;

    try {
      const isFavorite = FavOfUser && FavOfUser.includes(foodId);

      if (isFavorite) {
        const response = await axios.post(
          "http://localhost:5000/api/user/removeUserFavorites",
          {
            foodId: foodId,
            userId: userInfo._id,
          }
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/user/addToFavorites",
          {
            foodId: foodId,
            userId: userInfo._id,
          }
        );
      }

      fetchFavFoods();
    } catch (error) {
      console.error("Error toggling favorites:", error);
    }
  };

  const handleCardClick = (foodId) => {
    history(`/details/${foodId}`);
  };

  const suggestedFoods = addedFoods.filter(
    (food) => !FavOfUser.includes(food._id)
  );
  const favoriteFoods = addedFoods.filter((food) =>
    FavOfUser.includes(food._id)
  );

  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
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

      <PageWrapper>
        <SectionWrapper>
          <h3>Foods</h3>
          <Wrapper>
            <FoodContainer>
              {suggestedFoods.map((food) => (
                <FoodCard key={food._id}>
                  {food.image && (
                    <div className="mb-3">
                      <img
                        src={`data:${
                          food.image.contentType
                        };base64,${arrayBufferToBase64(food.image.data.data)}`}
                        alt={food.foodName}
                        fluid
                        className="w-full h-40 object-cover"
                        onClick={() => handleCardClick(food._id)}
                      />
                    </div>
                  )}
                  <div className="info">
                    <h3>{food.foodName}</h3>
                    <p>{food.description}</p>
                  </div>
                </FoodCard>
              ))}
            </FoodContainer>
          </Wrapper>
        </SectionWrapper>
      </PageWrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const SectionWrapper = styled.div`
  margin-bottom: 4rem;
`;

const FoodContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
`;

const FoodCard = styled.div`
  flex: 0 0 calc(25% - 5rem); // 4 items per row with 5rem gap
  height: 450px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .info {
    padding: 1rem;
    h3 {
      color: black;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    p {
      color: black;
      font-size: 1rem;
    }
    .favorite-icon {
      cursor: pointer;
      margin-top: 0.5rem;
    }
  }
`;

const PageWrapper = styled.div`
  margin: 0% 20%;
`;

export default AllFoodsForAdmin;
