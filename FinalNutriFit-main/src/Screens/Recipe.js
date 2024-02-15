import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Typewriter from "typewriter-effect";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";





const Recipe = () => {

  let params = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  const role = localStorage.getItem("userRole");
  const fetchDetail = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)

    const detailData = await data.json();
    setDetails(detailData);


  };
  

  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
  };

  // fetching nutrients info
  


  useEffect(() => {
    fetchDetail();
  }, [params.name])


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
    <div>
      <div>
        <div>
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
        </div>
        <div class="bg-cover bg-green-100 flex flex-row justify-around p-8">
          <div className="mt-48">
            {" "}
            <h1 className="text-5xl font-bold">
              <Typewriter
                options={{
                  strings: [`${details.title}`],
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
              src={details.image}
              alt=""
            />
          </div>
        </div>
      </div>

      <PageWrapper>
        <DetailWrapper>
          <div>
            {/* <h2>{details.title}</h2> */}
            {/* <img src={details.image} alt="" /> */}
          </div>
          <Info>
            <Button
              className={activeTab === "instructions" ? "active" : ""}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </Button>
            <Button
              className={activeTab === "summary" ? "active" : ""}
              onClick={() => setActiveTab("summary")}
            >
              Summary
            </Button>
            <Button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </Button>
            <Button
              className={activeTab === "diets" ? "active" : ""}
              onClick={() => setActiveTab("diets")}
            >
              Diets
            </Button>
            <Button
              className={activeTab === "dishType" ? "active" : ""}
              onClick={() => setActiveTab("dishType")}
            >
              Dish Type
            </Button>

            {/* <Button
              className={activeTab === "macros" ? "active" : ""}
              onClick={() => setActiveTab("macros")}
            >
              Macros
            </Button> */}
          </Info>

          {activeTab === "instructions" && (
            <div>
              <h5
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></h5>
            </div>
          )}

          {activeTab === "summary" && (
            <h5 dangerouslySetInnerHTML={{ __html: details.summary }}></h5>
          )}

          {activeTab === "diets" && (
            <Table>
              <thead>
                <tr>
                  <th>Diets</th>
                </tr>
              </thead>
              <tbody>
                {details.diets.map((diet) => (
                  <tr>
                    <td className="bg-green-100">{diet}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {/* <h5 dangerouslySetInnerHTML={{ __html: details.diets }}></h5> */}

          {activeTab === "ingredients" && (
            <Table>
              <thead>
                <tr>
                  <th>Ingredients</th>
                </tr>
              </thead>
              <tbody>
                {details.extendedIngredients.map((ingredient) => (
                  <tr key={ingredient.id}>
                    <td className="bg-green-100">{ingredient.original}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {activeTab === "dishType" && (
            <Table>
              <thead>
                <tr>
                  <th>Dish Type</th>
                </tr>
              </thead>
              <tbody>
                {details.dishTypes.map((dishType) => (
                  <tr key={dishType.id}>
                    <td className="bg-green-100">{dishType}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* {activeTab === "macros" && details.nutrition &&(
            <Table>
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Amount</th>
                  <th>Unit</th>
                  <th>% of Daily Needs</th>
                </tr>
              </thead>
              <tbody>
                {details.nutrition.map((nutrient) => (
                  <tr key={nutrient.name}>
                    <td>{nutrient.name}</td>
                    <td>{nutrient.amount} {nutrient.unit}</td>
                    <td>{nutrient.percentOfDailyNeeds}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )  (
            
          )} */}
        </DetailWrapper>
      </PageWrapper>
    </div>
  );
};









const DetailWrapper = styled.div`
      margin-top: 5rem;
      margin-bottom: 5rem;
      ${'' /* display: flex; */}
      .active {
        background: linear-gradient(90deg, rgba(161,238,147,1) 0%, rgba(156,255,161,1) 100%);
      color: green;
  }
      ${'' /* div {
        width: 500px;
      height: auto;
  } */}
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
      `
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

export default Recipe