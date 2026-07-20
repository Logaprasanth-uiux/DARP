import type { PaymentServiceStub, NotificationServiceStub } from '../types/darp';

export const paymentService: PaymentServiceStub = {
  getSubscriptionPlan() {
    return 'Free AI Assessment';
  }
};

export const notificationService: NotificationServiceStub = {
  notifyUser(message: string) {
    console.log('[DARP Notification]', message);
  }
};
