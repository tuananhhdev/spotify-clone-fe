import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Notification, { type NotificationData } from './Notification';

interface NotificationContainerProps {
  notifications: NotificationData[];
  onClose: (id: string) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ 
  notifications, 
  onClose 
}) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <Notification
              notification={notification}
              onClose={onClose}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
