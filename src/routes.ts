import { Application } from 'express';
import fetchPredictions from './routes/fetchPredictions';

export const addRoutes = (app: Application) => {
  app.get('/predictions/:city/:date?/:time?/:format?', fetchPredictions);
};
