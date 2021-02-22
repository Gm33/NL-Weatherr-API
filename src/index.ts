import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { addRoutes } from './routes';
import cron from 'node-cron';
import updatePredictions from './services/updatePredictions';

// Load PORT value from env file
const PORT = process.env.PORT || 3333;

// Load Express and routes
const app = express();
addRoutes(app);

// Set API security
app.use(helmet());
app.use(cors());
app.use(express.json());

// Update predictions for available cities from all sources.
const task = cron.schedule('* * * * *', () => updatePredictions(task));

// Run API server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
