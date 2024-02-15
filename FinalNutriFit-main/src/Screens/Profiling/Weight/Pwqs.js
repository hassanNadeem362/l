import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from "typewriter-effect";
const Pwqs = () => {
  // --------------------------------------6
  const [exerciseType, setExerciseType] = useState(''); // Default to empty

  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(6);

  const handleNext = () => {

  };

  // Check if the exerciseType is filled
  const isExerciseTypeSelected = exerciseType !== '';

  return (
    <div>
      <div className='bg-green-500 p-8 text-center text-2xl text-white font-bold'>Physical Workout</div>

      <div className="border-2 mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
      <div className="bg-gray-400 h-2 rounded-xl">
        <div
          className="bg-green-400 h-full  rounded-xl"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      <h1 className='text-2xl text-center font-bold mb-5'> <Typewriter options={{
                      strings: ['Monitoring Your Physical Workout!', 'Monitoring Your Physical Workout!'],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                 }}/></h1>
      <p className='text-center mb-5'>Welcome to Our Physical Workout Routine Forms

We are thrilled that you've taken the first step toward a healthier, fitter you by joining our Physical Workout Routine Forms. Congratulations on your commitment to a more active and balanced lifestyle!</p>
      
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/GoalBody"}>Back</Link>
          
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/eat-before-workout2"} onClick={handleNext}>Next</Link>
     
           
       
        </div>
      </div>
    </div>
  );
};

export default Pwqs;