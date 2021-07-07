import express from 'express';
import cors from 'cors';

import router from './routes';
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
  })
);

app.use(router);

app.listen(3333, () => {
  console.log('No ar http://localhost:3333 🔥🔥🚒');
});
