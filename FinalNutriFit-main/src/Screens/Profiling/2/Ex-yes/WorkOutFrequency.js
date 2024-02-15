import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WorkOutFrequency = ({ onNext }) => {
  const [workoutFrequency, setWorkoutFrequency] = useState('');
  const [isFrequencySelected, setIsFrequencySelected] = useState(false); // New state variable
  const totalSteps = 15;
  const [currentStep, setCurrentStep] = useState(7);

  const handleFrequencyChange = (value) => {
    setWorkoutFrequency(value);
    setIsFrequencySelected(true); // Set to true when an option is selected
  };

  const handleNext = () => {
    onNext({ workoutFrequency });
  };

  return (
    <div>
      <div className='bg-green-500 p-8 text-center text-3xl text-white font-bold'>Workout Frequency</div>

      <div className="border-2 mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">How Often Do You Work Out?</h1>
          <p className='text-center mb-5'>We'd like to understand how often you participate in physical activity to better guide you.</p>
          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="2"
                checked={workoutFrequency === '2'}
                onChange={() => handleFrequencyChange('2')}
              />
              2 times a week
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="3"
                checked={workoutFrequency === '3'}
                onChange={() => handleFrequencyChange('3')}
              />
              3 times a week
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="5"
                checked={workoutFrequency === '5'}
                onChange={() => handleFrequencyChange('5')}
              />
              5 times a week
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="7"
                checked={workoutFrequency === '7'}
                onChange={() => handleFrequencyChange('7')}
              />
              7 times a week
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/exercise-type"} >Back</Link>
          {isFrequencySelected ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/play-sport"} onClick={handleNext}>Next</Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkOutFrequency;
