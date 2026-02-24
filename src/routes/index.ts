import express, { Request, Response } from 'express';
import { notificationsStore } from '../stores/notifications-store';
import { NotFoundError } from '@dstransaction/common/build/errors/not-found-error';
import { ApiResponseBuilder } from '../utils/response';

const router = express.Router();

router.get('/notifications', async (req: Request, res: Response) => {
   const notifications = Array.from(notificationsStore.values())
  
    if (notifications.length === 0) {
      res.send(ApiResponseBuilder.success({ total: 0, notifications: [] }));
      return;
    }
  
    res.send(ApiResponseBuilder.success({ total: notifications.length, notifications }));
});

export { router as indexNotificationRouter };
