import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from "typewriter-effect";

const Dqs = () => {
  const [exerciseType, setExerciseType] = useState(''); // Default to empty

  const totalSteps = 21;
  

  const [currentStep, setCurrentStep] = useState(11);

  const handleNext = () => {

  };

  // Check if the exerciseType is filled
  const isExerciseTypeSelected = exerciseType !== '';

  return (
    <div>
      <div className='bg-green-500 p-8 text-center text-2xl text-white font-bold'>Diet</div>

      <div className="border-2 mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
      <div className="bg-gray-400 h-2 rounded-xl">
        <div
          className="bg-green-400 h-full  rounded-xl"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      <h1 className='text-2xl text-center font-bold mb-5'> <Typewriter options={{
                      strings: ['Monitoring Your Diet!', 'Monitoring Your Diet!'],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                 }}/></h1>
      <p className='text-center mb-5'>Embark on Your Journey to Better Health

      we are dedicated to helping you achieve your health and nutrition goals. Whether you're looking to lose weight, gain muscle, improve your energy levels, or simply adopt a healthier lifestyle, you've come to the right place.</p>
      
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/play-sport2"}>Back</Link>
          
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/diet-type"} onClick={handleNext}>Next</Link>
     
           
       
        </div>
      </div>
    </div>
  );
};

export default Dqs;