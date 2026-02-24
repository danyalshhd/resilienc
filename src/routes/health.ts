import express, { Request, Response } from 'express';
import { natsWrapper } from '../nats-wrapper';
import { ApiResponseBuilder } from '../utils/response';

const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  let natsConnected = false;

  try {
    if (natsWrapper.client) {
      natsConnected = true;
    }
  } catch (err) {
    natsConnected = false;
  }

  res.status(200).send(ApiResponseBuilder.success({
    status: 'ok',
    nats_connected: natsConnected,
  }));
});

export { router as healthRouter };
