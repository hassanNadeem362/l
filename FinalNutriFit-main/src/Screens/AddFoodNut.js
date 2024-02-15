// // AddFoodNut.js
// import React, { useState } from "react";
// import axios from "axios";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const AddFoodNut = () => {
//   const [foodName, setFoodName] = useState("");
//   const [description, setDescription] = useState("");
//   const [calories, setCal] = useState("");
//   const [carbs, setCarbs] = useState("");
//   const [fats, setFats] = useState("");
//   const [protein, setProtein] = useState("");
//   const [cholesterol, setCholesterol] = useState("");
//   const [fiber, setFiber] = useState("");
//   const [sodium, setSodium] = useState("");
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleAddFood = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("foodName", foodName);
//     formData.append("description", description);
//     formData.append("calories", calories);
//     formData.append("carbs", carbs);
//     formData.append("fats", fats);
//     formData.append("protein", protein);
//     formData.append("cholesterol", cholesterol);
//     formData.append("fiber", fiber);
//     formData.append("sodium", sodium);
//     formData.append("image", image);

//     let user = Cookies.get("userInfo");
//     const userInfo = user ? JSON.parse(user) : null;

//     if (userInfo) {
//       formData.append("nutritionistId", userInfo._id);
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/nutritionist/addFood",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Redirect or perform any other action after successfully adding food
//       navigate("/NutritionistDashboard");
//     } catch (error) {
//       console.error("Error adding food:", error);
//       // Handle errors
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <Row className="justify-content-md-center">
//         <Col md={8}>
//           <div className="text-center">
//             <h1 className="mb-4">Add Food</h1>

//             <Form onSubmit={handleAddFood} encType="multipart/form-data">
//               <Row className="mb-3">
//                 <Col md={6}>
//                   <Form.Group controlId="foodName">
//                     <Form.Label>Food Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter food name"
//                       value={foodName}
//                       onChange={(e) => setFoodName(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="description">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       placeholder="Enter food description"
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-3">
//                 <Col md={4}>
//                   <Form.Group controlId="calories">
//                     <Form.Label>Enter Calories</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter calories"
//                       value={calories}
//                       onChange={(e) => setCal(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group controlId="carbs">
//                     <Form.Label>Enter Carbs</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter carbs"
//                       value={carbs}
//                       onChange={(e) => setCarbs(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group controlId="fats">
//                     <Form.Label>Enter Fats</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter fats"
//                       value={fats}
//                       onChange={(e) => setFats(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-3">
//                 <Col md={4}>
//                   <Form.Group controlId="protein">
//                     <Form.Label>Enter Protein</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter protein"
//                       value={protein}
//                       onChange={(e) => setProtein(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group controlId="cholesterol">
//                     <Form.Label>Enter Cholesterol</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter cholesterol"
//                       value={cholesterol}
//                       onChange={(e) => setCholesterol(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group controlId="fiber">
//                     <Form.Label>Enter Fiber</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter fiber"
//                       value={fiber}
//                       onChange={(e) => setFiber(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-3">
//                 <Col md={6}>
//                   <Form.Group controlId="sodium">
//                     <Form.Label>Enter Sodium</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter sodium"
//                       value={sodium}
//                       onChange={(e) => setSodium(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="image">
//                     <Form.Label>Upload Image</Form.Label>
//                     <Form.Control
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setImage(e.target.files[0])}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mt-3">
//                 <Col>
//                   <Button variant="primary" type="submit">
//                     Add Food
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AddFoodNut;



// AddFoodNut.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";

const AddFoodNut = () => {
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [calories, setCal] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [protein, setProtein] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [fiber, setFiber] = useState("");
  const [sodium, setSodium] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");

  const handleSignOut = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("userRole");
    navigate("/Login");
  };

  const handleAddFood = async (e) => {
    e.preventDefault();

    

    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("description", description);
    formData.append("calories", calories);
    formData.append("carbs", carbs);
    formData.append("fats", fats);
    formData.append("protein", protein);
    formData.append("cholesterol", cholesterol);
    formData.append("fiber", fiber);
    formData.append("sodium", sodium);
    formData.append("image", image);

    let user = Cookies.get("userInfo");
    const userInfo = user ? JSON.parse(user) : null;

    if (userInfo) {
      formData.append("nutritionistId", userInfo._id);
    }

    try {
      await axios.post(
        "http://localhost:5000/api/nutritionist/addFood",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Redirect or perform any other action after successfully adding food
      navigate("/NutritionistDashboard");
    } catch (error) {
      console.error("Error adding food:", error);
      // Handle errors
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-green-500 via-green-600 to-green-600 p-5">
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
      <div className="max-w-2xl flex gap-7 p-4 mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-sm">
        <Link to={"/NutritionistDashboard"} className="text-white">
          🏠 Home
        </Link>
      </div>
      <Container className="mt-12 mx-auto p-8 max-w-2xl bg-white rounded-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Add Food</h1>
          <p className="text-gray-600">
            Fill in the details below to add a new food item.
          </p>
        </div>

        <Form onSubmit={handleAddFood} encType="multipart/form-data">
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="foodName">
                <Form.Label className="text-gray-700 font-semibold">
                  🍔 Food Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter food name"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="description">
                <Form.Label className="text-gray-700 font-semibold">
                  📝 Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter food description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="calories">
                <Form.Label className="text-gray-700 font-semibold">
                  🌟 Calories
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter calories"
                  value={calories}
                  onChange={(e) => setCal(e.target.value)}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="carbs">
                <Form.Label className="text-gray-700 font-semibold">
                  🍚 Carbs
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter carbs"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="fats">
                <Form.Label className="text-gray-700 font-semibold">
                  🧈 Fats
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter fats"
                  value={fats}
                  onChange={(e) => setFats(e.target.value)}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="protein">
                <Form.Label className="text-gray-700 font-semibold">
                  🍗 Protein
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter protein"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="cholesterol">
                <Form.Label className="text-gray-700 font-semibold">
                  🍤 Cholesterol
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter cholesterol"
                  value={cholesterol}
                  onChange={(e) => setCholesterol(e.target.value)}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="fiber">
                <Form.Label className="text-gray-700 font-semibold">
                  🌾 Fiber
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter fiber"
                  value={fiber}
                  onChange={(e) => setFiber(e.target.value)}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="sodium">
                <Form.Label className="text-gray-700 font-semibold">
                  🧂 Sodium
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter sodium"
                  value={sodium}
                  onChange={(e) => setSodium(e.target.value)}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="image">
                <Form.Label className="text-gray-700 font-semibold">
                  🖼️ Upload Image
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="border p-3 w-full focus:outline-none focus:border-blue-500 rounded-md"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-6">
            <Col>
              <Button
                variant="primary"
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue text-white rounded-md"
              >
                Add Food
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddFoodNut;
