import { Message } from 'node-nats-streaming';
import { Listener } from '@dstransaction/common';
import { Subjects } from '../subjects';
import { notificationsStore } from '../../stores/notifications-store';
import { queueGroupName } from './queue-group-name';
import { NotificationCreatedEvent } from '../notification-created-event';
import { NotificationStatus } from '../../enums/notification-status';

export class NotificationCreatedListener extends Listener<NotificationCreatedEvent> {
  readonly subject: Subjects.NotificationCreated = Subjects.NotificationCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: NotificationCreatedEvent['data'], msg: Message) {
    try {
      const { id, recipient, message, type, status, version, createdAt } = data;

      console.log('Processing notification');
      
      const notification = {
        id,
        recipient,
        message,
        type,
        status: NotificationStatus.Delivered,
        version,
        createdAt,
        deliveredAt: Date.now(),
      };

      notificationsStore.set(id, notification);

      msg.ack();
    } catch (err) {
      console.error('Error processing notification created event:', err);
      msg.ack();
    }
  }
}
