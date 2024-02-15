import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// -------------------------------8


const Diet = () => {
  const totalSteps = 21; // Total number of steps/screens
  const [currentStep, setCurrentStep] = useState(8);

  const [selectedOption, setSelectedOption] = useState('');
  const [isFieldSelected, setIsFieldSelected] = useState(false);

  useEffect(() => {
    setIsFieldSelected(selectedOption !== '');
  }, [selectedOption]);


    function handleChange(event) {
        setSelectedOption(event.target.value);
    }
    const handleNext = () => {
        // Handle the next step logic here
      };

    return (
        <div>
            <div className='bg-green-400 p-4 text-center text-2xl text-white font-bold'>Diet </div>



            <div className=" mt-10 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">
     
            <div className="bg-gray-400 h-2 rounded-xl">
        <div
          className="bg-green-400 h-full  rounded-xl"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
            
                <h1 className="mt-6 text-center font-bold text-2xl mb-4 p-2">Select Diet </h1>
                <hr style={{ background: "gray", height: "2px",marginBottom:"40px" }}/>
               
                <h1 className="mt-5 font-bold text-xl mb-5  ">Choose Diet:</h1>
                <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
                    <label>
                        <input type="checkbox" value="Vegetarian" checked={selectedOption === 'Vegetarian'} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                      Vegetarian
                    </label>
                </div>

                <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
                    <label>
                        <input type="checkbox" value="Vegan" checked={selectedOption === 'Vegan'} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        Vegan
                    </label>
                </div>

                <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
                    <label>
                        <input type="checkbox" value="Gluten Free" checked={selectedOption === 'Gluten Free'} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        Gluten Free
                    </label>
                </div>

                <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
                    <label>
                        <input type="checkbox" value="Low Carb" checked={selectedOption === 'Low Carb'} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        Low Carb
                    </label>
                </div>

                <div className="text-xl ml-5 mb-3 border-2 rounded-lg p-1 hover:bg-green-400 ">
                    <label>
                        <input type="checkbox" value="Low Fat" checked={selectedOption === 'Low Fat'} onChange={handleChange} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                       Low Fat
                    </label>
                </div>






                <div className="flex justify-around mt-10 ml-5 mr-5">
          <Link className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm" to={"/ActivityLevel"}>Back</Link>
          {isFieldSelected ? (
            <Link className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm" to={"/HeatlhFitness"} onClick={handleNext}>
              Next
            </Link>
          ) : (
            <span className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm opacity-50 cursor-not-allowed">
              Next
            </span>
          )}
        </div>


            </div>



        </div>
    );
}

export default Diet;

