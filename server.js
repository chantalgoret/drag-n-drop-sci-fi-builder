const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4860;
let clients = new Set();

// SSE endpoint for real-time updates
app.get('/api/status', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.add(res);

  req.on('close', () => clients.delete(res));
});

function sendUpdateToClients(message) {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify({ message })}\n\n`);
  });
}

app.post('/api/generate', async (req, res) => {
  const { prompt, apiKey, mode } = req.body;
  console.log('Received prompt:', prompt);
  console.log('Mode:', mode);

  // Send initial response
  res.json({ message: 'Project generation started' });

  if (mode === 'local') {
    // Run GPT Engineer locally
    const gptEngineer = spawn('gpt-engineer', ['--prompt', prompt], {
      env: { ...process.env, OPENAI_API_KEY: apiKey }
    });

    gptEngineer.stdout.on('data', (data) => {
      sendUpdateToClients(data.toString());
    });

    gptEngineer.stderr.on('data', (data) => {
      sendUpdateToClients(`Error: ${data.toString()}`);
    });

    gptEngineer.on('close', (code) => {
      sendUpdateToClients(`Process exited with code ${code}`);
    });
  } else {
    // Server mode - you can implement remote server logic here
    sendUpdateToClients('Server mode: Processing prompt...');
    // TODO: Implement server-side processing
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});