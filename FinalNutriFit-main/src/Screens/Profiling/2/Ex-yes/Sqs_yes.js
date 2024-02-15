import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from "typewriter-effect";

const Sqs_yes = () => {
  const [exerciseType, setExerciseType] = useState(''); // Default to empty

  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(18);

  const handleNext = () => {

  };


  return (
    <div>
      <div className='bg-green-500 p-8 text-center text-2xl text-white font-bold'>Schedule</div>

      <div className="border-2  mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
      <div className="bg-gray-400 h-2 rounded-xl">
        <div
          className="bg-green-400 h-full  rounded-xl"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>


     


      <h1 className='text-2xl text-center font-bold mb-5'> <Typewriter options={{
                      strings: ['Monitoring Your Schedule!', 'Monitoring Your Schedule!'],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                 }}/></h1>
      <p className='text-center mb-5'>Welcome to the Work and Life Schedule Questions
      Hello and a warm welcome to our community dedicated to exploring the delicate balance between work and life. We understand that managing the demands of your career, personal life, and overall well-being can be a challenging endeavor. 
      That's why we're here to provide insights, share experiences, and answer your burning questions about how to strike that perfect harmony.</p>      
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/ActivityLevel_yes"}>Back</Link>
          
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/SleepTime_yes"} onClick={handleNext}>Next</Link>
     
           
       
        </div>
      </div>
    </div>
  );
};

export default Sqs_yes;

