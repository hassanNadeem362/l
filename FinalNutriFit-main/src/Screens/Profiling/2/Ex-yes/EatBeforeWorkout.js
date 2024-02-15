import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EatBeforeWorkout = ({ onNext }) => {
  const [carbOption, setCarbOption] = useState(''); // Default to empty

  const totalSteps = 12;
  const [currentStep, setCurrentStep] = useState(5);

  const handleNext = () => {
    onNext({ carbOption });
  };

  // Check if the carbOption is filled
  const isCarbOptionSelected = carbOption !== '';

  return (
    <div>
      <div className='bg-green-400 p-8 text-center text-3xl text-white font-bold'>Carb Foods</div>

      <div className="border-2  mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
      <div className="bg-gray-400 h-2 rounded-xl">
        <div
          className="bg-green-400 h-full  rounded-xl"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-4">Your Pre-Exercise Eating Choices</h1>
          <p className='text-center mb-6'>Please let us know what you typically consume before a workout or endurance activity</p>
          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="Low Carb Food"
                checked={carbOption === 'Low Carb Food'}
                onChange={() => setCarbOption('Low Carb Food')}
              />
              Low carb foods (meat, eggs, seafood)
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '30px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="High Carb Food"
                checked={carbOption === 'High Carb Food'}
                onChange={() => setCarbOption('High Carb Food')}
              />
              High carb foods (quinoa, bananas, sweet potatoes)
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/pwqs2"}>Back</Link>
          {isCarbOptionSelected ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/exercise-type"} onClick={handleNext}>Next</Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EatBeforeWorkout;
