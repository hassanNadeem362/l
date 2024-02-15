import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PlaySport = ({ onNext }) => {
  const [playsSport, setPlaysSport] = useState('');
  const [isSportSelected, setIsSportSelected] = useState(false); // New state variable

  const totalSteps = 15;
  const [currentStep, setCurrentStep] = useState(7);

  const handleSportChange = (value) => {
    setPlaysSport(value);
    setIsSportSelected(true); // Set to true when an option is selected
  };

  const handleNext = () => {
    onNext({ playsSport });
  };

  return (
    <div>
      <div className='bg-green-500 p-8 text-center text-2xl text-white font-bold'>Playing Sports</div>

      <div className="border-2  mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">Do You Play Any Kind of Sport?</h1>
          <p className=' text-center mb-5'>We are keen to learn about your involvement in sports activities to provide you with more personalized support</p>
          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="yes"
                checked={playsSport === 'yes'}
                onChange={() => handleSportChange('yes')}
              />
              Yes
            </label>
          </div>

          <div className="text-lg ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                required
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                type="radio"
                value="no"
                checked={playsSport === 'no'}
                onChange={() => handleSportChange('no')}
              />
              No
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/workout-frequency"} >Back</Link>
          {isSportSelected ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/Dqs3"} onClick={handleNext}>Next</Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaySport;
