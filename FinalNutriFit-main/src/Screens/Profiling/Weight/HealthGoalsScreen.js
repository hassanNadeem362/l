import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HealthGoalsScreen = () => {
  const totalSteps = 21; 
  const [currentStep, setCurrentStep] = useState(3);

  const [checkboxValues, setCheckboxValues] = useState({
    loseWeight: false,
    gainWeight: false,
    improveStamina: false,
    dietModification: false,
  });

  const [areFieldsFilled, setAreFieldsFilled] = useState(false);

  useEffect(() => {
    const fieldsFilled =
      checkboxValues.loseWeight ||
      checkboxValues.gainWeight ||
      checkboxValues.improveStamina ||
      checkboxValues.dietModification;

    setAreFieldsFilled(fieldsFilled);
  }, [checkboxValues]);

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: !prevValues[checkboxName],
    }));
  };

  const handleNext = () => {
    // onNext(checkboxValues);
  };

  return (
    <div>
  <div className="bg-green-400 p-8 text-center text-3xl text-white font-bold">
        Desired Goal
      </div>


      <div className=" mt-5 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">
    
      <div className="bg-gray-400 h-2 rounded-xl">
        <div
          className="bg-green-400 h-full  rounded-xl"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>


        <h1 className="mt-8 text-center font-bold text-3xl mb-4">
         Choose Your Goal
        </h1>
        <hr style={{ background: "gray", height: "2px",marginBottom:"40px" }}/>
     
        <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400">
         <label>
        <input
          type="checkbox"
          checked={checkboxValues.lowWeight}
          onChange={() => handleCheckboxChange('loseWeight')}
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        Lose Weight
      </label>
      </div>


      
      <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400">
      <label>
        <input
          type="checkbox"
          checked={checkboxValues.gainWeight}
          onChange={() => handleCheckboxChange('gainWeight')}
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        Gain Weight
      </label>
      </div>


      <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400">
      <label>
        <input
          type="checkbox"
          checked={checkboxValues.improveStamina}
          onChange={() => handleCheckboxChange('improveStamina')}
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        Improve Stamina
      </label>
      </div>


      <div className="text-2xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400">
      <label>
        <input
          type="checkbox"
          checked={checkboxValues.dietModification}
          onChange={() => handleCheckboxChange('dietModification')}
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        Diet Modification
      </label>
      </div>

      <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm" to={"/HeightWeight"}>
            Back
          </Link>
          {areFieldsFilled ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm" to={"/BodyComposition"} onClick={handleNext}>
              Next
            </Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm opacity-50 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
              
    </div>
   
    </div>
  );
};

export default HealthGoalsScreen;

