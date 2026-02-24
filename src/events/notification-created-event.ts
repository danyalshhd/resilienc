import { Subjects } from './subjects';

export interface NotificationCreatedEvent {
  subject: Subjects.NotificationCreated;
  data: {
    id: string;
    recipient: string;
    message: string;
    type: 'email' | 'sms' | 'push';
    status: string;
    version: number;
    createdAt: number;
  };
}
