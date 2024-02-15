import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FoodElergiesNo = () => {
  const [foodAllergies, setFoodAllergies] = useState([]); // Default to empty array

  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(13);

  const handleToggleAllergy = (allergy) => {
    if (foodAllergies.includes(allergy)) {
      setFoodAllergies(foodAllergies.filter(item => item !== allergy));
    } else {
      setFoodAllergies([...foodAllergies, allergy]);
    }
  };

  const handleNext = () => {
    // onNext({ foodAllergies });
  };

  
  const isAtLeastOneCheckboxSelected = foodAllergies.length > 0;

  return (
    <div>
      <div className='bg-green-400 p-8 text-center text-2xl text-white font-bold'>Food Allergies</div>
      

      <div className="mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl border-2">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">Food Allergies Information</h1>
          <p className='text-center mb-5'>Your safety and well-being are important to us. To ensure we accommodate any food allergies or sensitivities you may have.</p>
          <p className='text-center font-bold mb-5'>Do you have any food allergies?</p>
          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="DairyHighLactose"
                checked={foodAllergies.includes('DairyHighLactose')}
                onChange={() => handleToggleAllergy('DairyHighLactose')}
              />
              Dairy (High Lactose)
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="AllDairy"
                checked={foodAllergies.includes('AllDairy')}
                onChange={() => handleToggleAllergy('AllDairy')}
              />
              All Dairy
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="Eggs"
                checked={foodAllergies.includes('Eggs')}
                onChange={() => handleToggleAllergy('Eggs')}
              />
              Eggs
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="Peanuts"
                checked={foodAllergies.includes('Peanuts')}
                onChange={() => handleToggleAllergy('Peanuts')}
              />
              Peanuts
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="TreeNuts"
                checked={foodAllergies.includes('TreeNuts')}
                onChange={() => handleToggleAllergy('TreeNuts')}
              />
              Tree Nuts
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="Soy"
                checked={foodAllergies.includes('Soy')}
                onChange={() => handleToggleAllergy('Soy')}
              />
              Soy
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="Gluten"
                checked={foodAllergies.includes('Gluten')}
                onChange={() => handleToggleAllergy('Gluten')}
              />
              Gluten
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="Fish"
                checked={foodAllergies.includes('Fish')}
                onChange={() => handleToggleAllergy('Fish')}
              />
              Fish
            </label>
          </div>

          <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400">
            <label>
              <input
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="checkbox"
                value="Shellfish"
                checked={foodAllergies.includes('Shellfish')}
                onChange={() => handleToggleAllergy('Shellfish')}
              />
              Shellfish
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/DietTypeNo"}>Back</Link>
          {isAtLeastOneCheckboxSelected ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/ProteinNo"} onClick={handleNext}>Next</Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodElergiesNo;



