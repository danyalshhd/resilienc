import express, { Request, Response } from 'express';
import { NotFoundError } from '@dstransaction/common';
import { notificationsStore } from '../stores/notifications-store';
import { ApiResponseBuilder } from '../utils/response';

const router = express.Router();

router.get('/notifications/:id', async (req: Request, res: Response) => {
  const notification = notificationsStore.get(req.params.id);

  if (!notification) {
    throw new NotFoundError();
  }

  res.send(ApiResponseBuilder.success(notification));
});

export { router as showNotificationRouter };
