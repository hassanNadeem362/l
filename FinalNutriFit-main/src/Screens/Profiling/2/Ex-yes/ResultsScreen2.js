import React from 'react';
import { Link } from 'react-router-dom';




  //workoutFrequency ,selectedOption ,{sleepTime, wakeUpTime} ,proteinSources ,playsSport,  jobType,  activityTime , healthyFatSources, foodAllergies , exerciseType ,exerciseStatus, carbOption,  dietType ,eatingHabits
  const ResultScreen2 = ({
    Data1,
    Data2,
    Data3,
    Data4,
    Data5,
    Data6,
    Data7,
    Data8,
    Data9,
    Data10,
    Data11,
    Data12,
    Data13,
    Data14,


  }) => {
    const { workoutFrequency } = Data1;
    const { selectedOption } = Data2;
    const {sleepTime, wakeUpTime} = Data3;
    const proteinSources = Data4;
    const playsSport = Data5;
    const jobType= Data6;
    const activityTime = Data7;
    const healthyFatSources = Data8;
    const foodAllergies  = Data9;
    const  exerciseType = Data10;
    const exerciseStatus  = Data11;
    const carbOption = Data12;
    const dietType  = Data13;
    const eatingHabits = Data14;

  

  return (
    <div className="bg-gray-200 mt-10 ml-96 mr-96 rounded-xl p-3 drop-shadow-xl">
    <h1 className="mt-1 text-center font-bold text-2xl mb-4 p-2">Result Screen</h1>
    <p>Workout Frequency: <h1 className="font-bold text-2xl">{workoutFrequency}</h1></p>
    <p>Selected Option: <h1 className="font-bold text-2xl">{selectedOption}</h1></p>
    {/* <p>Sleep Time: <h1 className="font-bold text-2xl">{formattedSleepTime}</h1></p> */}
    <p>Protein Sources: <h1 className="font-bold text-2xl">{proteinSources.join(', ')}</h1></p>
    <p>Plays Sport: <h1 className="font-bold text-2xl">{playsSport}</h1></p>
    <p>Job Type: <h1 className="font-bold text-2xl">{jobType}</h1></p>
    <p>Activity Time: <h1 className="font-bold text-2xl">{activityTime}</h1></p>
    <p>Healthy Fat Sources: <h1 className="font-bold text-2xl">{healthyFatSources.join(', ')}</h1></p>
    <p>Food Allergies: <h1 className="font-bold text-2xl">{foodAllergies.join(', ')}</h1></p>
    <p>Exercise Type: <h1 className="font-bold text-2xl">{exerciseType}</h1></p>
    <p>Exercise Status: <h1 className="font-bold text-2xl">{exerciseStatus}</h1></p>
    <p>Carb Option: <h1 className="font-bold text-2xl">{carbOption}</h1></p>
    <p>Diet Type: <h1 className="font-bold text-2xl">{dietType}</h1></p>
    <p>Eating Habits: <h1 className="font-bold text-2xl">{eatingHabits}</h1></p>
  </div>

  );
};

export default ResultScreen2;
