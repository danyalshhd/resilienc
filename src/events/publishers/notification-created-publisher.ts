import { Publisher } from '@dstransaction/common';
import { Subjects } from '../subjects';
import { NotificationCreatedEvent } from '../notification-created-event';

export class NotificationCreatedPublisher extends Publisher<NotificationCreatedEvent> {
  readonly subject: Subjects.NotificationCreated = Subjects.NotificationCreated;
}
