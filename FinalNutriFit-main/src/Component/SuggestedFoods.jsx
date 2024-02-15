import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import { Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SuggestedFoods = ({ nutritionistId }) => {
  const [addedFoods, setAddedFoods] = useState([]);
  console.log("🚀 ~ SuggestedFoods ~ addedFoods:", addedFoods);
  const history = useNavigate();

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchAddedFoods();
  }, []);

  const fetchAddedFoods = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/nutritionist/addedFoods/${nutritionistId}`
      );
      setAddedFoods(response.data.data);
    } catch (error) {
      console.error("Error fetching added foods:", error);
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/nutritionist/deleteFood/${foodId}`,
        { nutritionistId: nutritionistId }
      );
      fetchAddedFoods();
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  const updateFood = (foodId) => {
    history(`/updateFood/${foodId}`);
  };

  const handleCardClick = (foodId) => {
    history(`/details/${foodId}`);
  };

  return (
    <PageWrapper>
      <h3 className="underline font-semibold">Food Added:</h3>
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
          {addedFoods?.map((food) => (
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
                    className="delete-icon"
                    onClick={() => handleDeleteFood(food._id)}
                  >
                    Delete
                  </div>
                </div>
              </Card>
              <Link
                to={`/updateFood/${food._id}`}
                onClick={() => updateFood(food._id)}
                className="text-black focus:outline-none"
              >
                Update Food
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </PageWrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
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
    .delete-icon {
      cursor: pointer;
      margin-top: 0.5rem;
      color: red;
    }
  }
`;

const PageWrapper = styled.div`
  margin: 0% 20%;
`;

export default SuggestedFoods;
