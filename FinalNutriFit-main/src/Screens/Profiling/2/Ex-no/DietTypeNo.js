import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const DietTypeNo = () => {
  const [dietType, setDietType] = useState(''); // Default to empty

  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(12);

  const handleNext = () => {
    // onNext({ dietType });
  };

  const isDietTypeSelected = dietType !== '';
  return (
    <div>
      <div className='bg-green-400 p-8 text-center text-3xl text-white font-bold'>Diet Type</div>

      <div className="mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl border-2">
      <div className="bg-gray-400 h-2 rounded-xl">
        <div
          className="bg-green-400 h-full  rounded-xl"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">Dietary Preferences Assessment?</h1>
          <p className='text-center mb-5'>What kind of diet your food often consists of?</p>
          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="noRestriction"
                checked={dietType === 'noRestriction'}
                onChange={() => setDietType('noRestriction')}
              />
              No restriction
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="pescatarian"
                checked={dietType === 'pescatarian'}
                onChange={() => setDietType('pescatarian')}
              />
              Pescatarian
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="vegetarian"
                checked={dietType === 'vegetarian'}
                onChange={() => setDietType('vegetarian')}
              />
              Vegetarian
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="paleo"
                checked={dietType === 'paleo'}
                onChange={() => setDietType('paleo')}
              />
              Paleo
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="keto"
                checked={dietType === 'keto'}
                onChange={() => setDietType('keto')}
              />
              Keto
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="vegan"
                checked={dietType === 'vegan'}
                onChange={() => setDietType('vegan')}
              />
              Vegan
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/Dqs2"}>Back</Link>
          {isDietTypeSelected ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/FoodElergiesNo"} onClick={handleNext}>Next</Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietTypeNo;
