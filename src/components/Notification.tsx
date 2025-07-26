import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Info, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationProps {
  notification: NotificationData;
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  const { id, type, title, message, duration = 5000 } = notification;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-900/90',
          border: 'border-green-500/50',
          icon: 'text-green-400',
          title: 'text-green-100',
          message: 'text-green-200'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-900/90',
          border: 'border-yellow-500/50',
          icon: 'text-yellow-400',
          title: 'text-yellow-100',
          message: 'text-yellow-200'
        };
      case 'error':
        return {
          bg: 'bg-red-900/90',
          border: 'border-red-500/50',
          icon: 'text-red-400',
          title: 'text-red-100',
          message: 'text-red-200'
        };
      default:
        return {
          bg: 'bg-blue-900/90',
          border: 'border-blue-500/50',
          icon: 'text-blue-400',
          title: 'text-blue-100',
          message: 'text-blue-200'
        };
    }
  };

  const colors = getColors();

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        ${colors.bg} ${colors.border}
        border backdrop-blur-sm rounded-lg p-4 shadow-lg
        max-w-sm w-full relative overflow-hidden
      `}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Content */}
      <div className="relative flex items-start space-x-3">
        {/* Icon */}
        <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
          {getIcon()}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h4 className={`${colors.title} font-semibold text-sm leading-tight`}>
            {title}
          </h4>
          <p className={`${colors.message} text-sm mt-1 leading-relaxed`}>
            {message}
          </p>
        </div>

        {/* Close button */}
        <motion.button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

export default Notification;
