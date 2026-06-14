const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173,http://localhost')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser tools (curl, health checks) and whitelisted browser origins.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('CORS origin not allowed'));
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', healthRoutes);
app.use('/api', healthRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(port, () => {
  // Keep startup logs concise for container and local runs.
  console.log(`API running on port ${port}`);
});
