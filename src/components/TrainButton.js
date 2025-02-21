import React from 'react';
import axios from 'axios';

function TrainButton() {
  const handleTrain = () => {
    axios.post('http://127.0.0.1:5000/train')
      .then(response => {
        alert(response.data.status || 'Training completed successfully.');
      })
      .catch(err => {
        console.error("Training error:", err);
        alert("Training failed: " + (err.response?.data?.error || err.message));
      });
  };

  return (
    <div>
      <button onClick={handleTrain}>Train Models</button>
    </div>
  );
}

export default TrainButton;
