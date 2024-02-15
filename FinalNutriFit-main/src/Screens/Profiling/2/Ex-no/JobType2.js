import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JobType2 = () => {
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(19);

  const handleExerciseClick = (choice) => {
    if (choice === 'office-job') {
      // Handle navigation for Office Job
    } else if (choice === 'self-employed') {
      // Handle navigation for Self Employed
    }
  };

  return (
    <div>
      <div className='bg-green-400 p-8 text-center text-3xl text-white font-bold'>Employment Status</div>

      <div className="border-2 mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">What is your current employment status?</h1>
          <p className='text-center mb-10'>To help us understand your occupation and provide you with the best support</p>
          <div className="text-lg ml-5 mb-5 bg-white rounded-lg p-3 hover:bg-green-400 border-2 border-green-600">
            <Link to="/JobScheduleNo">Office Job</Link>
          </div>

          <div className="text-lg ml-5 mb-5 bg-white rounded-lg p-3 hover:bg-green-400 border-2 border-green-600">
            <Link to="/PhysicalSchedulNo">Self Employed</Link>
          </div>
        </div>
        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/SleepTimeNo"}>Back</Link>
          </div>
      </div>
    </div>
  );
};

export default JobType2;
