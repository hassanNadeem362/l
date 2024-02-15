import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Exercise = () => {

  const totalSteps = 15;
  const [currentStep, setCurrentStep] = useState(4);

  const handleExerciseClick = (choice) => {
    if (choice === 'yes') {
      // history.push('/dqs');
    } else if (choice === 'no') {
      // history.push('/dqs2');
    }
  };

  return (
    <div>
      <div className='bg-green-400 p-8 text-center text-3xl text-white font-bold'>Exercise Status</div>

      <div className="mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl border-2">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">Do You Exercise?</h1>
          <p className='text-center mb-10'>To help us understand your physical activity and provide you with the best support</p>
          <div className="text-xl ml-5 mb-5 bg-white rounded-lg p-2 hover:bg-green-400 border-2 border-green-600">
            <Link to="/pwqs2">Yes</Link>
          </div>

          <div className="text-xl ml-5 mb-5 bg-white rounded-lg p-2 hover:bg-green-400 border-2 border-green-600">
            <Link to="/dqs2">No</Link>
          </div>
        </div>
        <div className="flex justify-around mt-20 ml-5 mr-5">
          <Link className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/Stamina"}>Back</Link>
          </div>
      </div>
    </div>
  );
};

export default Exercise;
