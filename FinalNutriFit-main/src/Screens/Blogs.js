import React, { Component, useState, useEffect } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import Cardd from "../Component/Cardd";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Typewriter from "typewriter-effect";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { height } from "@mui/system";
import styled from "@emotion/styled";
const API_KEY = "f0d80579f3204d7297bc576470ecbc62";
const url = "https://newsapi.org/v2/everything?q=";

const data = [
  { label: "Health & Nutrition", value: 1 },
  { label: "Immunity", value: 2 },
  { label: "Sports", value: 3 },
  { label: "Kids Nutrition", value: 4 },
  { label: "Weight Management", value: 4 },
  { label: "Hair Care", value: 4 },
  { label: "Skin Care", value: 4 },
  { label: "Men Health", value: 4 },
];

const Blogs = () => {

  const [articles, setArticles] = useState([]);
  const [curSelectedNav, setCurSelectedNav] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNews("Food, Fitness, Health");
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
          <h4 className="text-primary-text-color font-bold">{article.title}</h4>
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
        <nav className="bg-green-400 shadow-4 fixed top-0 z-50 left-0 right-0">
          <div className="main-nav flex justify-around py-2 items-center">
            <Link to={"/"} class="text-black text-3xl font-bold ">
              <LocalDiningIcon fontSize="20px" /> NutriFit
            </Link>
            <div className="nav-links">
              <ul className="flex gap-4">
                <li
                  className= {`hover-link ${
                    curSelectedNav === "food" ? "text-accent-color" : ""
                  } cursor-pointer`}
                  onClick={() => onNavItemClick("food")}
                 
                >
                  Food
                </li>
                <li
                  className={`hover-link ${
                    curSelectedNav === "health" ? "text-accent-color" : ""
                  } cursor-pointer`}
                  onClick={() => onNavItemClick("health")}
                >
                  Health
                </li>
                
                <li
                  className={`hover-link ${
                    curSelectedNav === "politics" ? "text-accent-color" : ""
                  } cursor-pointer`}
                  onClick={() => onNavItemClick("fitness")}
                >
                  Fitness
                </li>
              </ul>
            </div>
            <div className="search-bar flex gap-1 items-center">
              <input
                id="search-text"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 h-full p-1 border-2 border-bbd0e2 rounded font-roboto"
                placeholder="e.g. diet, squat"
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
            {articles?.map((article) => fillDataInCard(article))}
          </div>
        </main>

        <template id="template-news-card">
          {/* Your template goes here */}
        </template>
      </div>
    </PageWrapper>
  );
};

export default Blogs;

const PageWrapper = styled.div`
  margin: 0% 8%;
`;

//       const description =
//   "Creating a delightful recipe involves a harmonious blend of flavors, textures, and techniques. Each ingredient plays a vital role, contributing to a symphony of taste that awakens the senses";
//   const description2 =
//   "Creating a delightful recipe involves a harmonious blend of flavors, textures, and techniques. Each ingredient plays a vital role, contributing to a symphony of taste that awakens the senses";
