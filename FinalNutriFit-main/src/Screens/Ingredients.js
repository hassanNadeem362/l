import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Typewriter from "typewriter-effect";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";




const Ingredients = () => {
  
        let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('ingredients');
  const fetchDetail = async () => {
const data = await fetch(
  `https://api.spoonacular.com/food/ingredients/9266/information?amount=1&apiKey=${process.env.REACT_APP_ING_API_KEY}`
);

    const detailData = await data.json();
    setDetails(detailData);


  }

  // fetching nutrients info
  


  useEffect(() => {
    fetchDetail();
  }, [params.name])




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
                  class="text-black text-xl p-1 ml-10 rounded-xl"
                >
                  Diets
                </Link>

                <Link to={"/Blogs"} class="text-black text-xl  p-1 rounded-xl">
                  Blogs
                </Link>
                <Link
                  to={"/AboutUs"}
                  class="text-black text-xl  p-1 rounded-xl"
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
                  class="text-black text-xl  p-1 rounded-xl"
                >
                  <AccountBoxIcon /> SignUp
                </Link>
              </div>
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
          <div></div>
          <Info>
            <Button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </Button>
          </Info>

          {activeTab === "ingredients" && details.nutrients && (
            <Table>
              <thead>
                <tr>
                  <th>Ingredients</th>
                </tr>
              </thead>
              <tbody>
                {details.nutrients.map((ingredients) => (
                  <tr key={ingredients.id}>
                    <td className="bg-green-100">{ingredients.name}</td>
                    <td className="bg-green-100">{ingredients.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
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


export default Ingredients