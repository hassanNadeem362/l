import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HealthFitness = () => {
  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(9);

  const [aspect, setAspect] = useState('');
  const [trackingFrequency, setTrackingFrequency] = useState('');
  const [isAspectSelected, setIsAspectSelected] = useState(false);
  const [isTrackingFrequencySelected, setIsTrackingFrequencySelected] = useState(false);

  useEffect(() => {
    setIsAspectSelected(aspect !== '');
  }, [aspect]);

  useEffect(() => {
    setIsTrackingFrequencySelected(trackingFrequency !== '');
  }, [trackingFrequency]);

  const handleNext = () => {
    // const inputData = {
    //   aspect,
    //   trackingFrequency,
    // };
    // onNext(inputData);
  };

  return (
    <div>
      <div className='bg-green-500 p-4 text-center text-2xl text-white font-bold'>Health / Fitness</div>

      <div className="mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">

        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <h1 className="mt-8 text-center font-bold text-2xl mb-4 p-2">Track Your Health/Fitness</h1>
        <hr style={{ background: "gray", height: "2px", marginBottom: "40px" }} />

        <h1 className="mt-5 font-bold text-xl mb-5">What Aspect of your health or fitness would you like to track?</h1>

        <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
          <label>
            <input
              type="radio"
              name="aspect"
              value="Weight"
              checked={aspect === 'Weight'}
              onChange={(e) => setAspect(e.target.value)}
            />
            Weight
          </label>
        </div>

        <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
          <label>
            <input
              type="radio"
              name="aspect"
              value="Body Measurement"
              checked={aspect === 'Body Measurement'}
              onChange={(e) => setAspect(e.target.value)}
            />
            Body Measurement
          </label>
        </div>

        <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
          <label>
            <input
              type="radio"
              name="aspect"
              value="None"
              checked={aspect === 'None'}
              onChange={(e) => setAspect(e.target.value)}
            />
            None
          </label>
        </div>

        <div>
          <h1 className="mt-5 font-bold text-xl mb-5">How Often would you like to track?</h1>
          <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                type="radio"
                name="trackingFrequency"
                value="Daily"
                checked={trackingFrequency === 'Daily'}
                onChange={(e) => setTrackingFrequency(e.target.value)}
              />
              Daily
            </label>
          </div>

          <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                type="radio"
                name="trackingFrequency"
                value="Weekly"
                checked={trackingFrequency === 'Weekly'}
                onChange={(e) => setTrackingFrequency(e.target.value)}
              />
              Weekly
            </label>
          </div>

          <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
            <label>
              <input
                type="radio"
                name="trackingFrequency"
                value="Monthly"
                checked={trackingFrequency === 'Monthly'}
                onChange={(e) => setTrackingFrequency(e.target.value)}
              />
              Monthly
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm" to={"/Diet"}>Back</Link>
          {(isAspectSelected && isTrackingFrequencySelected) ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm" to={"/Login"} onClick={handleNext}>
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

export default HealthFitness;
