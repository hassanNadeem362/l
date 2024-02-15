import React, { useState, useEffect } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import Cardd from "../Component/Cardd";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Typewriter from "typewriter-effect";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { height } from "@mui/system";
import styled from "@emotion/styled";

const API_KEY = "8238961bc2msh165815d34a8099cp1b7eebjsn495d80fcde41";
const url =
  "https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10";



  const Exercisesdb = () => {
    const [articles, setArticles] = useState([]);
    const [curSelectedNav, setCurSelectedNav] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
      fetchNews("Fitness and Health");
    }, []); // Equivalent to window.addEventListener("load", ...)

    async function fetchNews(query) {
      const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      bindData(data.articles);
    }

    function bindData(articles) {
      setArticles(articles);
    }

    function fillDataInCard(article) {
      const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      });

      return (
        <a
          key={article.url}
          href={article.url}
          target="_blank" // Open the link in a new tab
          rel="noopener noreferrer" // Recommended for security reasons
          className="w-96 min-h-96 shadow-4 rounded cursor-pointer bg-white overflow-hidden transition-transform ease-in duration-300 hover:shadow-8 hover:bg-f9fdff transform -translate-y-2"
        >
          <div className="card-header hover:translate-y-2 transition-all">
            <img
              src={article.urlToImage}
              alt="news"
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="card-content p-3">
            <h4 className="text-primary-text-color font-bold">
              {article.title}
            </h4>
            <h6 className="news-source mb-4">{`${article.source.name} · ${date}`}</h6>
            <p className="text-secondary-text-color">{article.description}</p>
          </div>
        </a>
      );
    }

    function onNavItemClick(id) {
      fetchNews(id);
      setCurSelectedNav(id);
    }

    function handleSearch() {
      if (!searchQuery) return;
      fetchNews(searchQuery);
      setCurSelectedNav(null);
    }

    return (
      <PageWrapper>
        <div>
          <div>
            <nav class="bg-green-400 p-5">
              <div class="max-w-7xl mx-auto flex flex-row justify-between  items-center space-x-4">
                <Link to={"/"} class="text-black text-3xl font-bold ">
                  <LocalDiningIcon fontSize="20px" /> NutriFit
                </Link>{" "}
                <div className="space-x-4 ml-4 ">
                  <Link
                    to={"/Features"}
                    class="text-black text-xl p-1 ml-10 rounded-xl"
                  >
                    Diets
                  </Link>
                  <Link
                    to={"/Exercises"}
                    class="text-black text-xl p-1 rounded-xl"
                  >
                    Exercises
                  </Link>
                  <Link to={"/Blogs"} class="text-black text-xl p-1 rounded-xl">
                    Blogs
                  </Link>
                  <Link
                    to={"/AboutUs"}
                    class="text-black text-xl p-1 rounded-xl"
                  >
                    About Us
                  </Link>
                </div>
                <div class="space-x-4">
                  <Link to={"/Login"} class="text-black text-xl p-1 rounded-xl">
                    <PersonIcon /> Login
                  </Link>
                  <Link
                    to={"/UserSignUp"}
                    class="text-black text-xl p-1 rounded-xl"
                  >
                    <AccountBoxIcon /> SignUp
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <div class="bg-cover bg-green-100 flex flex-row justify-around p-8">
            <div>
              {" "}
              <h1 className="text-5xl font-bold">
                <Typewriter
                  options={{
                    strings: ["Check Out <br/> Exercises!"],
                    autoStart: true,
                    loop: true,
                    delay: 200,
                  }}
                />
              </h1>
              <br />
              <p className="font-semibold text-xl ">
                You have to think about it before you can do it.
              </p>
            </div>

            <div className="mt-7">
              <img
                className="rounded-lg drop-shadow-md"
                height={200}
                width={350}
                src={require("../Data/exer4.jpg")}
              />
            </div>
          </div>
        </div>

        {/* starts fro here */}
        <div>
          <nav className="bg-green-400 shadow-4 fixed top-0 z-50 left-0 right-0">
            <div className="main-nav flex justify-around py-2 items-center">
              <Link to={"/"} class="text-black text-3xl font-bold ">
                <LocalDiningIcon fontSize="20px" /> NutriFit
              </Link>
              <div className="nav-links">
                <ul className="flex gap-4">
                  <li
                    className={`hover-link ${
                      curSelectedNav === "gym exercise"
                        ? "text-accent-color"
                        : ""
                    } cursor-pointer`}
                    onClick={() => onNavItemClick("gym exercise")}
                  >
                    Exercises
                  </li>
                  <li
                    className={`hover-link ${
                      curSelectedNav === "fitness" ? "text-accent-color" : ""
                    } cursor-pointer`}
                    onClick={() => onNavItemClick("fitness")}
                  >
                    Fitness
                  </li>
                  {/* <li
                  className={`hover-link ${
                    curSelectedNav === "politics" ? "text-accent-color" : ""
                  }`}
                  onClick={() => onNavItemClick("politics")}
                >
                  Politics
                </li> */}
                </ul>
              </div>
              <div className="search-bar flex gap-1 items-center">
                <input
                  id="search-text"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 h-full p-1 border-2 border-bbd0e2 rounded font-roboto"
                  placeholder="e.g. squats"
                />
                <button
                  onClick={handleSearch}
                  className="bg-accent-color text-black px-6 py-2 rounded cursor-pointer font-roboto"
                >
                  Search
                </button>
              </div>
            </div>
          </nav>

          <main className="py-5 mt-20 container mx-auto">
            <div className="flex justify-between flex-wrap gap-5 items-start">
              {articles.map((article) => fillDataInCard(article))}
            </div>
          </main>

          <template id="template-news-card">
            {/* Your template goes here */}
          </template>
        </div>
      </PageWrapper>
    );
  };

  {
    /* search options */
  }
  {
    /* <div className='m-10'>
                <SimpleDropdown
                    options={data}
                    clearable
                    searchable
                    configs={
                        { position: { y: 'bottom', x: 'center' } }
                    }
                />
            </div> */
  }

  export default Exercisesdb;

  const PageWrapper = styled.div`
    margin: 0% 8%;
  `;
