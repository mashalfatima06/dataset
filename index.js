npm init -y
npm install express python-shell body-parser
const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const app = express();
const port = 5000;

app.use(bodyParser.json()); // For parsing application/json

// Endpoint to get AI predictions
app.post('/api/predict', (req, res) => {
  const inputData = req.body; // Assuming the input data comes in as a JSON object

  // Call Python script to get predictions
  PythonShell.run('predict_model.py', {
    args: [JSON.stringify(inputData)]
  }, (err, results) => {
    if (err) {
      console.error('Error running model:', err);
      return res.status(500).send('Error with prediction');
    }
    
    // Send the result from the model back to the frontend
    res.json({ prediction: results[0] });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
