import express from 'express';
import './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
