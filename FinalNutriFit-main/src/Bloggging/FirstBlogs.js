import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Cardd from "../Component/Cardd";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Typewriter from "typewriter-effect";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { height } from "@mui/system";
import styled from "@emotion/styled";
import { Style } from "@mui/icons-material";

const FirstBlogs = () => {
    return (
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

                            <Link
                                to={"/Exercises"}
                                class="text-black text-xl p-1 rounded-xl"
                            >
                                Exercises
                            </Link>
                            <Link
                                to={"/Blogs"}
                                class="text-black text-xl p-1 rounded-xl"
                            >
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
                            <Link
                                to={"/Login"}
                                class="text-black text-xl p-1 rounded-xl"
                            >
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
            </div >
            <div class=" bg-cover h-2/3 bg-green-100 flex flex-row justify-around p-8">
                <div className="mt-52">
                    {" "}
                    <h1 className="text-5xl font-bold">
                        <Typewriter
                            options={{
                                strings: [
                                    "Be Healthy <br/> for life!",
                                    "Be Healthy <br/> for life!",
                                ],
                                autoStart: true,
                                loop: true,
                                delay: 200,
                            }}
                        />
                    </h1>
                    <br />
                    <p className="font-semibold text-xl ">
                        Your weight loss, diet, and <br /> nutrition assistant
                    </p>
                </div>

                {/* <div className="mt-10">
      <img
        className="rounded-lg drop-shadow-md"
        height={500}
        width={550}
        src={require("../Data/Home-removebg-preview.png")}
      />
    </div> */}
            </div>

            <PageWrapper>
                <p className="mt-20">
                    We’ve all heard more than once that starting the day with a healthy breakfast is great for the brain and the belly. But with all that prework hustle and bustle, not everyone has time to whip up a hot stack of pancakes or bake a fancy frittata. Make your morning routine a breeze by preparing a few nutritious staples ahead of time, like hearty oatmeal cups, simple egg dishes and grab-and-go bars. Your alarm clock will thank you!
                </p>
                <h3>1. MAKE-AHEAD INSTANT OATMEAL JARS | MYFITNESSPAL’S ORIGINAL RECIPES</h3>
                <img src={require("../Data/1.jpg")}></img>
                Nutrition (per serving): Calories: 229; Total Fat: 6g; Saturated Fat: 1g; Monounsaturated Fat: 2g; Cholesterol: 0mg; Sodium: 152mg; Carbohydrate: 38g; Dietary Fiber: 5g; Sugar: 7g; Protein: 6g

                <h3>2. CAULIFLOWER-CRUSTED SPINACH FETA PIE | MYFITNESSPAL’S RECIPES</h3>
                <img src = {require("../Data/2.jpg")}></img>
                <p>Nutrition (per serving): Calories: 136; Total Fat: 6g; Saturated Fat: 3g; Monounsaturated Fat: 1g; Cholesterol: 68mg; Sodium: 330mg; Carbohydrate: 11g; Dietary Fiber: 5g; Sugar: 4g; Protein: 13g</p>


                <h3>2. CAULIFLOWER-CRUSTED SPINACH FETA PIE | MYFITNESSPAL’S RECIPES</h3>
                <img src = {require("../Data/3.jpg")}></img>
                <p>Nutrition (per serving): Calories: 136; Total Fat: 6g; Saturated Fat: 3g; Monounsaturated Fat: 1g; Cholesterol: 68mg; Sodium: 330mg; Carbohydrate: 11g; Dietary Fiber: 5g; Sugar: 4g; Protein: 13g</p>


                <h3>3. 1-MINUTE BERRY PEANUT BUTTER SMOOTHIE FOR TWO | MYFITNESSPAL’S RECIPES</h3>
                <img src = {require("../Data/4.jpg")}></img>
                <p>Nutrition (per serving): Calories: 156; Total Fat: 8g; Saturated Fat: 1g; Monounsaturated Fat: 0g; Cholesterol: 1mg; Sodium: 57mg; Carbohydrate: 19g; Dietary Fiber: 7g; Sugar: 9g; Protein: 5g</p>


                <h3>4. PEANUT BUTTER BREAKFAST COOKIES | MYFITNESSPAL’S RECIPES</h3>
                <img src = {require("../Data/5.jpg")}></img>
                <p>Nutrition (per serving): Calories: 299; Total Fat: 15g; Saturated Fat: 3g; Monounsaturated Fat: 0g; Cholesterol: 53mg; Sodium: 131mg; Carbohydrate: 34g; Dietary Fiber: 6g; Sugar: 13g; Protein: 11g</p>


                <h3>6. SAVORY SWEET POTATO MUFFINS | MYFITNESSPAL’S RECIPES</h3>
                <img src = {require("../Data/6.jpg")}></img>
                <p>Nutrition (per serving): Calories: 206; Total Fat: 7g; Saturated Fat: 1g; Monounsaturated Fat: 4g; Cholesterol: 0mg; Sodium: 196mg; Carbohydrate: 31g; Dietary Fiber: 4g; Sugar: 8g; Protein: 5g</p>


                <h3>2. CAULIFLOWER-CRUSTED SPINACH FETA PIE | MYFITNESSPAL’S RECIPES</h3>
                <img src = {require("../Data/7.jpg")}></img>
                <p>Nutrition (per serving): Calories: 136; Total Fat: 6g; Saturated Fat: 3g; Monounsaturated Fat: 1g; Cholesterol: 68mg; Sodium: 330mg; Carbohydrate: 11g; Dietary Fiber: 5g; Sugar: 4g; Protein: 13g</p>

            </PageWrapper>




        </div>









    )
}

export default FirstBlogs


const PageWrapper = styled.div`
    margin: 0% 20%;

`