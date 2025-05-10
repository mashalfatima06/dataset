npx create-react-app ai-prediction-app
cd ai-prediction-app
npm install axios
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send input data to the backend API
      const response = await axios.post('http://localhost:5000/api/predict', { inputData: input });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Data:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Prediction'}
        </button>
      </form>

      {prediction && <div>Prediction: {prediction}</div>}
    </div>
  );
}

export default App;
