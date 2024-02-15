import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SleepTimeNo = () => {

  const totalSteps = 21;
  const [currentStep, setCurrentStep] = useState(19);

  const [sleepTime, setSleepTime] = useState('');
  const [wakeUpTime, setWakeUpTime] = useState('');

  const handleNext = () => {
    // onNext({ sleepTime, wakeUpTime });
  };

  // Check if both sleepTime and wakeUpTime are filled
  const isFieldsFilled = sleepTime.trim() !== '' && wakeUpTime.trim() !== '';

  return (
    <div>
      <div className='bg-green-400 p-8 text-center text-2xl text-white font-bold'>Daily Sleep Schedule</div>

      <div className="bg-gray-200  mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-xl ">
      <div className="bg-gray-400 h-2 rounded-xl">
        <div
          className="bg-green-400 h-full  rounded-xl"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

        <div>
          <h1 className="mt-2 text-center font-bold text-2xl mb-5">Daily Sleep and wakeUp Schedule?</h1>
          <p className='text-center mb-5'>Understanding your sleep patterns is crucial. Please specify your daily sleep and wakeUp schedule:</p>
          <div className="mt-5">
            <h1 className="text-xl font-bold">Sleep Time:</h1>
            <input
              required
              style={{ width: "180px", height: "30px" }}
              type="time"
              className="bg-white ml-36 mt-4"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <h1 className="text-xl font-bold">Wake Up Time:</h1>
            <input
              required
              style={{ width: "180px", height: "30px" }}
              type="time"
              className="bg-White ml-36 mt-4"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/Sqs2"}>Back</Link>
          {isFieldsFilled ? (
            <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1" to={"/JobType2"} onClick={handleNext}>Next</Link>
          ) : (
            <span className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 opacity-50 cursor-not-allowed">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SleepTimeNo;

