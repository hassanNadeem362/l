import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Medical = () => {

    const [medical, setMedical] = useState('');
    return (
        <div>

            <div className='bg-green-400 p-4 text-center text-2xl text-white font-bold'>Medical </div>
            <div className=" mt-6 ml-96 mr-96 rounded-xl p-16 drop-shadow-2xl border-2 ">

                <h1 className="mt-2 text-center font-bold text-2xl mb-5">Medical History</h1>
                <p className='text-center mb-5'>Do you have any medical history or isssue which prohibits you FROM any specific physical activity or diet.</p>

            


            <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
                <label>
                    <input
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                        type="radio"
                        name="medical"
                        value="Diabetes"
                        checked={medical === 'Diabetes'}
                        onChange={(e) => setMedical(e.target.value)}
                    />
                    Diabetes
                </label>
            </div>


            <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
                <label>
                    <input
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                        type="radio"
                        name="medical"
                        value="Hypertension"
                        checked={medical === 'Hypertension'}
                        onChange={(e) => setMedical(e.target.value)}
                    />
                    Hypertension (high blood pressure)
                </label>
            </div>


            <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
                <label>
                    <input
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                        type="radio"
                        name="medical"
                        value="Asthma"
                        checked={medical === 'Asthma'}
                        onChange={(e) => setMedical(e.target.value)}
                    />
                    Asthma
                </label>
            </div>


            <div className="text-xl ml-5 mb-5 border-2 rounded-lg p-1 hover:bg-green-400 ">
                <label>
                    <input
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                        type="radio"
                        name="medical"
                        value="Heart disease"
                        checked={medical === 'Heart disease'}
                        onChange={(e) => setMedical(e.target.value)}
                    />
                    Heart disease
                </label>
            </div>

            </div>
        </div>
    )
}

export default Medical