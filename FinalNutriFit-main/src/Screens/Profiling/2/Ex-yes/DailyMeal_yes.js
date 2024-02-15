import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DailyMeal_yes = () => {
  const [eatingHabits, setEatingHabits] = useState(''); // Default to empty

  const totalSteps = 21; 
  const [currentStep, setCurrentStep] = useState(16);

  const handleNext = () => {
    // onNext({ eatingHabits });
  };

  // Check if the eatingHabits field is filled
  const isFieldFilled = eatingHabits.trim() !== '';

  return (
    <div>
      <div className='bg-green-400 p-8 text-center text-2xl text-white font-bold'>Eating Habits</div>

      <div className="border-2  mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
        <h1 className="mt-2 text-center font-bold text-2xl mb-5">Typical Daily Meal Choices?</h1>
         <p className='text-center mb-5'>How would you describe your typical daily meals and eating habits?
Please select the option that best represents your eating pattern:</p>
          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="2Meals"
                checked={eatingHabits === '2Meals'}
                onChange={() => setEatingHabits('2Meals')}
              />
              2 Meals
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="3Meals"
                checked={eatingHabits === '3Meals'}
                onChange={() => setEatingHabits('3Meals')}
              />
              3 Meals
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="SmallerFrequentMeals"
                checked={eatingHabits === 'SmallerFrequentMeals'}
                onChange={() => setEatingHabits('SmallerFrequentMeals')}
              />
              Smaller (Frequent Meals)
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/HealthyFats_yes"}>Back</Link>
          {isFieldFilled ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/ActivityLevel_yes"} onClick={handleNext}>Next</Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyMeal_yes;



