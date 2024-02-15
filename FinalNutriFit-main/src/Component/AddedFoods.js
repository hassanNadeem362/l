
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { HeartFill } from "react-bootstrap-icons";
import axios from "axios";
import { Image } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AddedFoods = () => {
  const [addedFoods, setAddedFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [FavOfUser, setFavOfUser] = useState([]);
  const history = useNavigate(); // Create a history object

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

  return (
    <PageWrapper>
      <SectionWrapper>
        <h3>Suggested</h3>
        <Wrapper>
          <Splide
            options={{
              perPage: 4,
              arrows: false,
              pagination: false,
              drag: "free",
              gap: "5rem",
            }}
          >
            {suggestedFoods.map((food) => (
              <SplideSlide key={food._id}>
                <Card>
                  {food.image && (
                    <div className="mb-3">
                      <img
                        src={`data:${
                          food.image.contentType
                        };base64,${arrayBufferToBase64(food.image.data.data)}`}
                        alt={food.foodName}
                        fluid
                        // width={"300px"}
                        // height={"300px"}
                        onClick={() => handleCardClick(food._id)}
                      />
                    </div>
                  )}
                  <div className="info">
                    <h3>{food.foodName}</h3>
                    <p>{food.description}</p>
                    <div
                      className="favorite-icon"
                      onClick={() => handleToggleFavorites(food._id)}
                    >
                      <HeartFill
                        color={
                          FavOfUser && FavOfUser.includes(food._id)
                            ? "red"
                            : "black"
                        }
                        size={20}
                      />
                    </div>
                  </div>
                </Card>
              </SplideSlide>
            ))}
          </Splide>
        </Wrapper>
      </SectionWrapper>

      <SectionWrapper>
        <h3>Favorites</h3>
        <Wrapper>
          <Splide
            options={{
              perPage: 4,
              arrows: false,
              pagination: false,
              drag: "free",
              gap: "5rem",
            }}
          >
            {favoriteFoods.map((food) => (
              <SplideSlide key={food._id}>
                <Card>
                  {food.image && (
                    <div className="mb-3">
                      <img
                        src={`data:${
                          food.image.contentType
                        };base64,${arrayBufferToBase64(food.image.data.data)}`}
                        className="w-full h-40 object-cover"
                        alt={food.foodName}
                        fluid
                        onClick={() => handleCardClick(food._id)}
                      />
                    </div>
                  )}
                  <div className="info">
                    <h3>{food.foodName}</h3>
                    <p>{food.description}</p>
                    <div
                      className="favorite-icon"
                      onClick={() => handleToggleFavorites(food._id)}
                    >
                      <HeartFill
                        color={
                          FavOfUser && FavOfUser.includes(food._id)
                            ? "red"
                            : "black"
                        }
                        size={20}
                      />
                    </div>
                  </div>
                </Card>
              </SplideSlide>
            ))}
          </Splide>
        </Wrapper>
      </SectionWrapper>
    </PageWrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const SectionWrapper = styled.div`
  margin-bottom: 4rem;
`;

const Card = styled.div`
  height: 450px;
  // border-radius: 2rem;
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

export default AddedFoods;
