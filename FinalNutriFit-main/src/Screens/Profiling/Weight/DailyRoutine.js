import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// --------------------------------------6
const DailyRoutine = () => {
  const totalSteps = 21; // Total number of steps/screens
  const [currentStep, setCurrentStep] = useState(6);
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');
  const [exercise, setExercise] = useState('');

  const [areFieldsFilled, setAreFieldsFilled] = useState(false);

  useEffect(() => {
    const fieldsFilled = wakeUpTime !== '' && workSchedule !== '' && exercise !== '';
    setAreFieldsFilled(fieldsFilled);
  }, [wakeUpTime, workSchedule, exercise]);

  const handleNext = () => {

  };

  return (
    <div>
      <div className='bg-green-400 p-4 text-center text-2xl text-white font-bold'>Daily Routine</div>

      <div className=" mt-3 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">
        <div className="bg-gray-400 h-2 rounded-xl">
          <div
            className="bg-green-400 h-full  rounded-xl"
            style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        <h1 className="mt-8 text-center font-bold text-2xl mb-5">Select Daily Routine</h1>
        <hr style={{ background: "gray", height: "2px", marginBottom: "10px" }} />

        <div className="mt-2 mb-3">
          <label className="font-bold text-xl">Wake Up Time:</label><br/>
          <input
          style={{ width: '30px', height: '20px', marginRight: '8px' }}
            type="time"
            value={wakeUpTime}
            onChange={(e) => setWakeUpTime(e.target.value)}
            className="ml-36 rounded-md mt-1 w-40 p-1 border-2"
          />
        </div>

        <div>
          <label className="font-bold text-xl">Work Schedule:</label><br/>
          <input
          
            type="text"
            className="ml-3 rounded-md mt-3 w-80 p-1 border-2"
            placeholder="Work Schedule"
            value={workSchedule}
            style={{height:"60px"}}
            onChange={(e) => setWorkSchedule(e.target.value)}
          />
        </div>

        <div>
          <label className="font-bold text-xl">Exercise Time:</label>
          <input
          
            type="text"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="ml-3 rounded-md mt-3 w-80 p-1 border-2"
            placeholder="Exercise Time"
            style={{height:"60px"}}
          />
        </div>

        <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm" to={"/BodyComposition"}>
            Back
          </Link>
          {areFieldsFilled ? (
            <Link
              className="bg-green-400 text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
              to={"/ActivityLevel"}
              onClick={handleNext}
            >
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

export default DailyRoutine;
