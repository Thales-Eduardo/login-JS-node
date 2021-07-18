import express from 'express';
import cors from 'cors';

import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import 'express-async-errors';
import router from './routes';
const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
  })
);

app.use(router);

app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('No ar http://localhost:3333 🔥🔥🚒');
});
