import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
const Veggie = () => {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {

        const check = localStorage.getItem('veggie');
        if(check) {
            setPopular(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
            const data = await api.json();
            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setPopular(data.recipes)
            console.log(data)
        }
        
    }
    return (
        <PageWrapper>
        <Wrapper>
            <h3>Our Vegetarian Picks</h3>
            <Splide options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '5rem'
            }}>
                {popular.map((recipe) => {
                    return (
                        <SplideSlide>
                            <Card>
                            <Link to={"/recipe/" + recipe.id}>     
                                <img src={recipe.image} alt={recipe.title}></img>
                                <p>{recipe.title}</p>
                                </Link>
                            </Card>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
        </PageWrapper>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    height: 350px;
    brder-radius: 2rem;
    position: relative;
    overflow: hidden;

    img {
        border-radius: 2rem;
        width: 100%;
        height: 80%;
        object-fit: cover;
    }

    p {
        color: black;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        
    }
`;

const PageWrapper = styled.div`
    margin: 0% 20%;
`

export default Veggie