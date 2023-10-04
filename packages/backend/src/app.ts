import bodyParser from 'body-parser';
import express, { ErrorRequestHandler } from 'express';
import 'dotenv/config';
import cors from 'cors';

import AppRouter from './routes';
import { passportJwt } from './utils/passport';

const app = express();
const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passportJwt);

router.init();

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// eslint-disable-next-line
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
};
app.use(errorHandler);

export default app;
