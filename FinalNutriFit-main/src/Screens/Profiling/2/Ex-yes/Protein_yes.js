import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Protein_yes = () => {
  const [proteinSources, setProteinSources] = useState([]); // Default to empty array

  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(14);

  const handleToggleSource = (source) => {
    if (proteinSources.includes(source)) {
      setProteinSources(proteinSources.filter(item => item !== source));
    } else {
      setProteinSources([...proteinSources, source]);
    }
  };

  const handleNext = () => {
   
  };

  // Check if at least one checkbox is selected
  const isAtLeastOneCheckboxSelected = proteinSources.length > 0;

  return (
    <div>
      <div className='bg-green-500 p-8 text-center text-2xl text-white font-bold'>Protein Consumption</div>

      <div className="border-2  mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
        <h1 className="mt-2 text-center font-bold text-2xl mb-5">Daily Protein Consumption</h1>
          <p className='text-center mb-6'>Do you consume protein daily, and if so, from what sources?</p>
          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="Meat"
                checked={proteinSources.includes('Meat')}
                onChange={() => handleToggleSource('Meat')}
              />
              Meat
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="Fish"
                checked={proteinSources.includes('Fish')}
                onChange={() => handleToggleSource('Fish')}
              />
              Fish
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="Dairy"
                checked={proteinSources.includes('Dairy')}
                onChange={() => handleToggleSource('Dairy')}
              />
              Dairy
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="PlantBased"
                checked={proteinSources.includes('PlantBased')}
                onChange={() => handleToggleSource('PlantBased')}
              />
              Plant-based
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/FoodElergies_yes"}>Back</Link>
          {isAtLeastOneCheckboxSelected ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/HealthyFats_yes"} onClick={handleNext}>Next</Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Protein_yes;

