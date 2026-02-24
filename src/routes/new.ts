import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@dstransaction/common';
import { v4 as uuidv4 } from 'uuid';
import { NotificationCreatedPublisher } from '../events/publishers/notification-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { NotificationStatus } from '../enums/notification-status';
import { ApiResponseBuilder } from '../utils/response';

const router = express.Router();

router.post(
  '/notifications',
  [
    body('recipient').not().isEmpty().withMessage('recipient is required').isEmail().withMessage('recipient must be a valid email'),
    body('message').not().isEmpty().withMessage('Message is required'),
    body('type').not().isEmpty().withMessage('Type is required').isIn(['email', 'sms', 'push']).withMessage('Type must be email, sms, or push'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { recipient, message, type } = req.body;
    
    try {
      const id = uuidv4();
      const notification = {
        id,
        recipient,
        message,
        type,
        status: NotificationStatus.Queued,
        version: 0,
        createdAt: Date.now(),
      };

      new NotificationCreatedPublisher(natsWrapper.client).publish({
        id: notification.id,
        recipient: notification.recipient,
        message: notification.message,
        type: notification.type,
        status: notification.status,
        version: notification.version,
        createdAt: notification.createdAt,
      });
      
      res.status(202).send(ApiResponseBuilder.success(notification, 202));
    } catch (err) {
      console.error('Error publishing notification created event:', err);
      throw new BadRequestError('Failed to create notification');
    }
  }
);

export { router as createNotificationRouter };
