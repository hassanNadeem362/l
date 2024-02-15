import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Option = () => {
  const totalSteps = 8;
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    // Handle the next step logic here
  };

  return (
    <div>
      <div className='bg-green-500 p-4 text-center text-3xl text-white font-bold'>Choose</div>
      <div className="bg-gray-100  mt-6 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-4">
 
        <div className=''>
          <h1 className="mt-2 text-center font-bold text-3xl mb-10">Select an Option</h1>
          <div className="flex flex-col space-y-4">
            <button className="bg-white hover:bg-green-400 text-black text-xl p-3 rounded-sm border-green-700 border-2"><Link to={"/Height"}>Gain Weight</Link> </button>
            <button className="bg-white hover:bg-green-400 text-black text-xl p-3 rounded-sm border-green-700 border-2"><Link to={"/Height"}>Weight Loss</Link></button>
            <button className="bg-white hover:bg-green-400 text-black text-xl p-3 rounded-sm border-green-700 border-2"><Link to={"/Height"}>Maintain Weight </Link></button>
            <button className="bg-white hover:bg-green-400 text-black text-xl p-3 rounded-sm border-green-700 border-2"><Link to={"/Msg2"}>Increase Stamina</Link></button>
          </div>
        </div>
        <br />
        {/* <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link
            className="bg-blue-500  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
            to={"/"}
          >
            Back
          </Link>
          <span className="bg-blue-500 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm opacity-50 cursor-not-allowed">
            Next
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Option;
