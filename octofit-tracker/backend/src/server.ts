import express from 'express';
import './config/database';
import apiRoutes from './routes/api';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    baseUrl,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
