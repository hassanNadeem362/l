import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const ExerciseModal = ({ exercise, closeModal }) => {
  const [timeSpent, setTimeSpent] = useState('00:00:00');
  const [caloriesBurned, setCaloriesBurned] = useState('');

  const handleSave = () => {
    // Handle save logic here, e.g., send data to the server
    console.log('Exercise saved:', {
      name: exercise.name,
      timeSpent,
      caloriesBurned,
    });
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Exercise Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{exercise.name}</h2>
      <p>Time Spent: {timeSpent}</p>
      <p>Calories Burned: {caloriesBurned}</p>
      <button onClick={handleSave}>Save</button>
      <button onClick={closeModal}>Close</button>
    </Modal>
  )
};

export default ExerciseModal;
