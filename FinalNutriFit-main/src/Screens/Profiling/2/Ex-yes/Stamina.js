import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Stamina = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState(''); // Default to 'physical'

  const totalSteps = 15;
  const [currentStep, setCurrentStep] = useState(3);

  const handleNext = () => {
    onNext({ selectedOption });
  };

  // Check if the selectedOption is filled
  const isOptionSelected = selectedOption !== '';

  return (
    <div>
      <div className='bg-green-400 p-8 text-center text-3xl text-white font-bold'>Stamina</div>

      <div className="mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl border-2">

      <div className="bg-gray-400 h-2 rounded-xl">
        <div
          className="bg-green-400 h-full  rounded-xl"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">Assessing Your Stamina</h1>
          <p className='text-center mb-8'>Could you please indicate which type of stamina deficiency you feel you might have</p>
          <div className="text-2xl ml-5 mb-5  rounded-lg p-1 hover:bg-green-400 border-2">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="physical"
                checked={selectedOption === 'physical'}
                onChange={() => setSelectedOption('physical')}
              />
              Physical Stamina
            </label>
          </div>

          <div className="text-2xl ml-5 mb-5  rounded-lg p-1 hover:bg-green-400 border-2">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="mental"
                disabled
                checked={selectedOption === 'mental'}
                onChange={() => setSelectedOption('mental')}
              />
              Mental Stamina
            </label>
          </div>
        </div>

        <br />

        <br />

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/Gender2"}>Back</Link>
          {isOptionSelected ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/exercise"} onClick={handleNext}>Next</Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stamina;
