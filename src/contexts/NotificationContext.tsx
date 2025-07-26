import React, { createContext, useContext, useState, useCallback } from 'react';
import NotificationContainer from '../components/NotificationContainer';
import type { NotificationData, NotificationType } from '../components/Notification';

interface NotificationContextType {
  showNotification: (
    type: NotificationType,
    title: string,
    message: string,
    duration?: number
  ) => void;
  showComingSoon: (feature?: string) => void;
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const showNotification = useCallback((
    type: NotificationType,
    title: string,
    message: string,
    duration: number = 5000
  ) => {
    const id = generateId();
    const notification: NotificationData = {
      id,
      type,
      title,
      message,
      duration
    };

    setNotifications(prev => [...prev, notification]);
  }, []);

  const showComingSoon = useCallback((feature: string = 'This feature') => {
    showNotification(
      'info',
      'Coming Soon! 🚀',
      `${feature} will be available in a future update. Stay tuned for exciting new features!`,
      4000
    );
  }, [showNotification]);

  const showSuccess = useCallback((title: string, message: string) => {
    showNotification('success', title, message);
  }, [showNotification]);

  const showError = useCallback((title: string, message: string) => {
    showNotification('error', title, message);
  }, [showNotification]);

  const showInfo = useCallback((title: string, message: string) => {
    showNotification('info', title, message);
  }, [showNotification]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const value: NotificationContextType = {
    showNotification,
    showComingSoon,
    showSuccess,
    showError,
    showInfo,
    removeNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
