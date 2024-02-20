import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignUP from "./Screens/UserSignUp";
import Login from "./Screens/Login";
import AdminSignUP from "./Screens/AdminSignUp";
import Welcome from "./Screens/Welcome";
import FeaturesScreen from "./Screens/FeaturesScreen";
import HealthGoalsScreen from "./Screens/Profiling/HealthGoalsScreen";
import HeightWeightScreen from "./Screens/Profiling/HeightWeightScreen";
import WorkoutPreferencesScreen from "./Screens/Profiling/WorkoutPreferencesScreen";
import GenderScreen from "./Screens/Profiling/GenderScreen";
import BodyComposition from "./Screens/Profiling/BodyComposition";
import DailyRoutine from "./Screens/Profiling/DailyRoutine";
import ActivityLevel from "./Screens/Profiling/ActivityLevel";
import Diet from "./Screens/Profiling/Diet";
import HeatlhFitness from "./Screens/Profiling/HealthFitness";
import Recipe from "./Screens/Recipe";
import Blogs from "./Screens/Blogs";
// import Exercises from './Screens/Exercises';
import { UserAuthContextProvider } from "./context/UserAuthContext";
import {
  SleepTimeNo,
  ProteinNo,
  PhysicalSchedulNo,
  JobScheduleNo,
  HealthyFatsNo,
  FoodElergiesNo,
  DietTypeNo,
  DailyMealNo,
  ActivityLevelNo,
  Dqs2,
  Sqs2,
  JobType2,
} from "./import/importNo";
import {
  SleepTime_yes,
  Protein_yes,
  PhysicalSchedul_yes,
  JobType_yes,
  JobSchedule_yes,
  HealthyFats_yes,
  FoodElergies_yes,
  DietType_yes,
  DailyMeal_yes,
  ActivityLevel_yes,
} from "./import/importYes";
import Exercise from "./Screens/Profiling/2/Ex-yes/Exercise";
import Dashboard from "./Screens/Dashboard";
import AboutUs from "./Screens/AboutUs";
// import Exercisesdb from './Screens/Exercisesdb';
import EatBeforeWorkout from "./Screens/Profiling/2/Ex-yes/EatBeforeWorkout";
import WorkOutFrequency from "./Screens/Profiling/2/Ex-yes//WorkOutFrequency";
import PlaySport from "./Screens/Profiling/2/Ex-yes//PlaySport";
import ResultScreen2 from "./Screens/Profiling/2/Ex-yes/ResultsScreen2";
import Stamina from "./Screens/Profiling/2/Ex-yes//Stamina";
import Msg2 from "./Screens/Profiling/2/Ex-yes/Msg2";
import GenderScreen2 from "./Screens/Profiling/2/Ex-yes/GenderScreen2";
import ExerciseType from "./Screens/Profiling/2/Ex-yes/ExerciseType";
import Pwqs2 from "./Screens/Profiling/2/Ex-yes/Pwq2s";
import {
  GoalBody,
  HealthFitness,
  Height,
  Msg1,
  Name,
  NameCall,
  Option,
  Dqs,
  Pwqs,
  Sqs,
  EatBeforeWorkout2,
  ExerciseType2,
  WorkOutFrequency2,
  PlaySport2,
  DietType,
  FoodElergies,
  Protein,
  HealthyFats,
  DailyMeal,
  JobSchedule,
  SleepTime,
  PhysicalSchedule,
  Dqs3,
  WeeklyGoal,
} from "./import/import";
import JobType from "./Screens/Profiling/Weight/JobType";
import Sqs_yes from "./Screens/Profiling/2/Ex-yes/Sqs_yes";
import Food from "./Screens/Food";
import AddExercise from "./Screens/AddExercise";
import NutritionistDashboard from "./Screens/NutritionistDashboard";
import UserDetailsPage from "./Screens/UserDetailsPage";
import UserPreferences from "./Screens/UserPreferences";
import AdminDashboard from "./Screens/AdminDashboard";
import UpdateProfile from "./Screens/UpdateProfile";
import ProtectedRoute from "./Component/ProtectedRoute";
import UpdateFood from "./Screens/UpdateFood";
import NutritionistDetails from "./Component/NutritionistDetails";
import NutDet from "./Screens/NutDet";
import AddFoodNut from "./Screens/AddFoodNut";
import AddedFoods from "./Component/AddedFoods";
import FoodDetails from "./Component/FoodDetails";
import ForgotPassword from "./Screens/ForgotPassword";
import UserFavfood from "./Component/UserFavfood";
// import Pages from "./pages/Pages";
// import Category from "./Component/Category";
import Home from "./pages/Home";
import Cuisine from "./pages/Cuisine";
import Searched from "./pages/Searched";
import UpdateUserInfo from "./Screens/updateUserInfo";
import Chat from "./Screens/Chat";


function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/NutritionistDashboard/*"
            element={
              <ProtectedRoute allowedRoles={["nutritionist"]}>
                <NutritionistDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminDashboard/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/AddFoodNut" element={<AddFoodNut />} />
          <Route path="/details/:foodId" element={<FoodDetails />} />

          <Route path="/" element={<Welcome />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/UserSignUp" element={<UserSignUP />} />
          <Route path="/NutritionistSignUp" element={<AdminSignUP />} />
          <Route path="/Gender" element={<GenderScreen />} />
          <Route path="/HealthGoal" element={<HealthGoalsScreen />} />
          <Route path="/Workout" element={<WorkoutPreferencesScreen />} />
          <Route path="/HeightWeight" element={<HeightWeightScreen />} />
          <Route path="/BodyComposition" element={<BodyComposition />} />

          <Route path="/" element={<Welcome />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/UserSignUp" element={<UserSignUP />} />
          <Route path="/NutritionistSignUp" element={<AdminSignUP />} />
          <Route path="/Gender" element={<GenderScreen />} />
          <Route path="/HealthGoal" element={<HealthGoalsScreen />} />
          <Route path="/Workout" element={<WorkoutPreferencesScreen />} />
          <Route path="/HeightWeight" element={<HeightWeightScreen />} />
          <Route path="/BodyComposition" element={<BodyComposition />} />

          <Route path="/DailyRoutine" element={<DailyRoutine />} />
          <Route path="/ActivityLevel" element={<ActivityLevel />} />
          <Route path="/Diet" element={<Diet />} />
          <Route path="/HeatlhFitness" element={<HeatlhFitness />} />
          <Route path="/Features" element={<FeaturesScreen />} />
          <Route path="/recipe/:name" element={<Recipe />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/AddExercise" element={<AddExercise />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/user/:userId" element={<UserDetailsPage />} />
          <Route path="/nut/:userId" element={<NutDet />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/updateUserInfo" element={<UpdateUserInfo />} />
          {/* <Route path="/NutritionistDashboard" element={<NutritionistDashboard />} /> */}

          <Route path="/DailyRoutine" element={<DailyRoutine />} />
          <Route path="/ActivityLevel" element={<ActivityLevel />} />
          <Route path="/Diet" element={<Diet />} />
          <Route path="/HeatlhFitness" element={<HeatlhFitness />} />
          <Route path="/Features" element={<FeaturesScreen />} />
          <Route path="/recipe/:name" element={<Recipe />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/AddExercise" element={<AddExercise />} />
          <Route path="/update" element={<UpdateProfile />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/updateFood/:foodId" element={<UpdateFood />} />
          <Route path="/UserFavfood" element={<UserFavfood />} />

          <Route path="/UserPreferences" element={<UserPreferences />} />
          <Route path="/food" element={<Food />} />

          <Route path="/ActivityLevelNo" element={<ActivityLevelNo />} />
          <Route path="/DailyMealNo" element={<DailyMealNo />} />
          <Route path="/DietTypeNo" element={<DietTypeNo />} />
          <Route path="/FoodElergiesNo" element={<FoodElergiesNo />} />
          <Route path="/HealthyFatsNo" element={<HealthyFatsNo />} />
          <Route path="/JobScheduleNo" element={<JobScheduleNo />} />
          <Route path="/PhysicalSchedulNo" element={<PhysicalSchedulNo />} />
          <Route path="/ProteinNo" element={<ProteinNo />} />
          <Route path="/SleepTimeNo" element={<SleepTimeNo />} />
          <Route path="/Dqs2" element={<Dqs2 />} />
          <Route path="/Sqs2" element={<Sqs2 />} />
          <Route path="/Dqs3" element={<Dqs3 />} />
          <Route path="/SleepTime_yes" element={<SleepTime_yes />} />
          <Route path="/Protein_yes" element={<Protein_yes />} />
          <Route
            path="/PhysicalSchedul_yes"
            element={<PhysicalSchedul_yes />}
          />
          <Route path="/JobType_yes" element={<JobType_yes />} />
          <Route path="/JobSchedule_yes" element={<JobSchedule_yes />} />
          <Route path="/sqs_yes" element={<Sqs_yes />} />
          <Route path="/HealthyFats_yes" element={<HealthyFats_yes />} />
          <Route path="/FoodElergies_yes" element={<FoodElergies_yes />} />
          <Route path="/DietType_yes" element={<DietType_yes />} />
          <Route path="/DailyMeal_yes" element={<DailyMeal_yes />} />
          <Route path="/ActivityLevel_yes" element={<ActivityLevel_yes />} />
          <Route path="/eat-before-workout2" element={<EatBeforeWorkout2 />} />
          <Route path="/exercisetype2" element={<ExerciseType2 />} />
          <Route path="/workout-frequency2" element={<WorkOutFrequency2 />} />
          <Route path="/play-sport2" element={<PlaySport2 />} />
          <Route path="/stamina" element={<Stamina />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/eat-before-workout" element={<EatBeforeWorkout />} />
          <Route path="/exercise-type2" element={<ExerciseType2 />} />
          <Route path="/exercise-type" element={<ExerciseType />} />
          <Route path="/workout-frequency" element={<WorkOutFrequency />} />
          <Route path="/play-sport" element={<PlaySport />} />
          <Route path="/diet-type" element={<DietType />} />
          <Route path="/daily-meal" element={<DailyMeal />} />
          <Route path="/food-allergies" element={<FoodElergies />} />
          <Route path="/protein" element={<Protein />} />
          <Route path="/healthy-fats" element={<HealthyFats />} />
          <Route path="/sleep-time" element={<SleepTime />} />
          <Route path="/job-schedule" element={<JobSchedule />} />
          <Route path="/physicalSchedule" element={<PhysicalSchedule />} />
          <Route path="/HealthGoal" element={<HealthGoalsScreen />} />
          <Route path="/BodyComposition" element={<BodyComposition />} />
          <Route path="/GoalBody" element={<GoalBody />} />
          <Route path="/DailyRoutine" element={<DailyRoutine />} />
          <Route path="/ActivityLevel" element={<ActivityLevel />} />
          <Route path="/Diet" element={<Diet />} />
          <Route path="/HeatlhFitness" element={<HealthFitness />} />

          <Route path="/Name" element={<Name />} />
          <Route path="/Option" element={<Option />} />
          <Route path="/NameCall" element={<NameCall />} />
          <Route path="/Msg1" element={<Msg1 />} />
          <Route path="/Msg2" element={<Msg2 />} />
          <Route path="/pwqs" element={<Pwqs />} />
          <Route path="/pwqs2" element={<Pwqs2 />} />
          <Route path="/dqs" element={<Dqs />} />

          <Route path="/sqs" element={<Sqs />} />
          <Route path="/JobType" element={<JobType />} />
          <Route path="/JobType2" element={<JobType2 />} />

          <Route path="/Gender2" element={<GenderScreen2 />} />
          <Route path="/Height" element={<Height />} />
          <Route path="/Gender" element={<GenderScreen />} />
          <Route path="/HeightWeight" element={<HeightWeightScreen />} />
          <Route path="/WeeklyGoal" element={<WeeklyGoal />} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/searched/:search" element={<Searched />} />
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />

          {/* <Category />
          <Pages /> */}
          
        </Routes>
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
