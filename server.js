const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4860;

app.post('/api/generate', async (req, res) => {
  const { prompt, apiKey } = req.body;
  // TODO: Integrate with GPT Engineer
  console.log('Received prompt:', prompt);
  console.log('Using API Key:', apiKey);
  
  res.json({ message: 'Project generation started' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});