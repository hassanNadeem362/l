import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PhysicalSchedulNo = () => {
  const [activityTime, setActivityTime] = useState(''); // Default to empty

  const totalSteps =21;
  const [currentStep, setCurrentStep] = useState(21);

  const handleNext = () => {
  alert("You Can't Move Forward");
  };

  // Check if activityTime is empty to enable/disable the Next button
  const isNextDisabled = activityTime === '';

  return (
    <div>
      <div className='bg-green-400 p-8 text-center text-2xl text-white font-bold'>Activity Time</div>

      <div className="bg-gray-200  mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">

        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">Time you spend with some activity (Like walking, speaking, doing some physical activity)</h1>
          <p className='text-center mb-5'>specify the amount of time you usually spend engaging in moderate physical activities such as walking, speaking, or performing light physical tasks</p>
          <div className="mt-5">
            <h1 className="text-2xl text-center font-bold">Select Hours </h1>
            <select
              style={{ width: "180px", height: "30px" }}
              className="bg-white ml-60 mt-4"
              value={activityTime}
              onChange={(e) => setActivityTime(e.target.value)}
            >
              <option value="">Select Hours</option>
              <option value="3Hours">3 Hours</option>
              <option value="4Hours">4 Hours</option>
              <option value="5Hours">5 Hours</option>
              <option value="6Hours">6 Hours</option>
              <option value="7Hours">7 Hours</option>
              <option value="8Hours">8 Hours</option>
            
            </select>
          </div>
        </div>

        <div className="flex justify-around mt-20 ml-5 mr-5">
          <Link className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/JobType2"} onSubmit={handleNext}>Back</Link>
          <button
            className={`bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNext}
            disabled={isNextDisabled}
            
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhysicalSchedulNo;

