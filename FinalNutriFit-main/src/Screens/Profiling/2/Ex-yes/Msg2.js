import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Msg2 = () => {
    const totalSteps = 10;
    const [currentStep, setCurrentStep] = useState(1);

    const [name, setName] = useState('');




    const handleNext = () => {
        // Handle the next step logic here
    };

    return (
        <div>
            <div className='bg-green-400 p-8 text-center text-3xl text-white font-bold'>Name</div>
            <div className="mt-6 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2">
            
                <div className=''>
                    <h1 className='font-bold text-lg text-center'>Well done! You've taken a significant stride in the right direction</h1><br/>
                  
                  
                    <h1 className='text-center'>   Did you know that keeping track of what you eat can really help you succeed? It's like watching out for yourself, and the more you do it, the better your chances of reaching your goals.
                   <br/>  <br/>   Now, let's discuss your aim to increase your weight.</h1>
                </div>
                <br />
                <div className="flex justify-around mt-10 ml-5 mr-5">
                    <Link
                        className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
                        to={"/NameCall"}
                    >
                        Back
                    </Link>

                    <Link
                        className="bg-green-400  text-white text-xl pl-7 pr-7 pt-1 pb-1 rounded-sm"
                        to={"/Gender2"} // Navigate to Option screen
                    // Pass name as state
                    >
                        Next
                    </Link>


                </div>
            </div>
        </div>
    );
};

export default Msg2;
