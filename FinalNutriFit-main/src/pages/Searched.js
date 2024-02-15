import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Category from '../Component/Category';
import Search from "../Component/Search";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";




const Searched = () => {
    const [searchedRecipes, setSerchedRecipes] = useState([]);
    let params = useParams();



    const role = localStorage.getItem("userRole");

    const getSearched = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
        );
        const recipes = await data.json();
        setSerchedRecipes(recipes.results);
    };

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);



    const handleProfileClick = () => {
        if (role === "admin") {
          // Redirect to admin dashboard
          navigate("/AdminDashboard");
        } else if (role === "nutritionist") {
          // Redirect to nutritionist dashboard
          navigate("/NutritionistDashboard");
        } else if (role === "customer"){
          // Handle other roles or scenarios as needed
          // Redirect to a default dashboard or show an error message
          navigate("/Dashboard");
        }
    }
    
    const handleSignOut = () => {
        Cookies.remove("userInfo");
        localStorage.removeItem("userRole");
        navigate("/Login");
      };
    
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
                class="text-black text-xl px-3 py-1 ml-10 navbar-link"
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
            


            <Search />
        <PageWrapper>
            <Category />
        <Grid>
            {searchedRecipes.map((item) => {
                return (
                    <Card key={item.id}>
                        <img src={item.image} alt="" />
                        <h4>{item.title}</h4>
                    </Card>
                );
            })}
            </Grid>
            </PageWrapper>




            
            </>
    );
}


const Grid = styled.div`
    display: Grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

const PageWrapper = styled.div`
    margin: 0% 20%;
`;



export default Searched