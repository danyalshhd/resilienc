import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@dstransaction/common';
import { createNotificationRouter } from './routes/new';
import { showNotificationRouter } from './routes/show';
import { indexNotificationRouter } from './routes/index';
import { healthRouter } from './routes/health';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
    name: 'session'
  })
);

app.use(healthRouter);

app.use(createNotificationRouter);
app.use(indexNotificationRouter);
app.use(showNotificationRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };