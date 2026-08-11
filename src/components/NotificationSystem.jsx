import { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle } from 'lucide-react';

function NotificationSystem({ tasks, healthRecords }) {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState('default');
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Generate notifications
    generateNotifications();

    // Check for notifications every minute
    const interval = setInterval(generateNotifications, 60000);

    return () => clearInterval(interval);
  }, [tasks, healthRecords]);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        showBrowserNotification('Notifications Enabled', 'You will now receive alerts for upcoming tasks.');
      }
    }
  };

  const generateNotifications = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const newNotifications = [];

    // Check for overdue tasks
    tasks.forEach(task => {
      if (!task.completed) {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        
        if (taskDate < today) {
          newNotifications.push({
            id: `overdue-${task.id}`,
            type: 'overdue',
            title: 'Overdue Task',
            message: task.title,
            taskId: task.id,
            time: 'Overdue'
          });
        } else if (taskDate.getTime() === today.getTime()) {
          newNotifications.push({
            id: `today-${task.id}`,
            type: 'today',
            title: 'Task Due Today',
            message: task.title,
            taskId: task.id,
            time: task.time || 'All day'
          });
        } else if (taskDate.getTime() === tomorrow.getTime()) {
          newNotifications.push({
            id: `tomorrow-${task.id}`,
            type: 'upcoming',
            title: 'Task Due Tomorrow',
            message: task.title,
            taskId: task.id,
            time: task.time || 'All day'
          });
        }
      }
    });

    // Check for upcoming health reminders
    healthRecords.forEach(record => {
      if (record.nextDueDate) {
        const dueDate = new Date(record.nextDueDate);
        const diffTime = dueDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7 && diffDays >= 0) {
          newNotifications.push({
            id: `health-${record.id}`,
            type: 'health',
            title: 'Health Reminder',
            message: `${record.type} due in ${diffDays} days`,
            recordId: record.id,
            time: diffDays === 0 ? 'Today' : `In ${diffDays} days`
          });
        }
      }
    });

    setNotifications(newNotifications.slice(0, 10)); // Limit to 10 notifications
  };

  const showBrowserNotification = (title, body) => {
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.svg',
        badge: '/favicon.svg'
      });
    }
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const dismissAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'overdue':
        return <AlertCircle size={16} className="notification-icon overdue" />;
      case 'today':
        return <Bell size={16} className="notification-icon today" />;
      case 'upcoming':
        return <Bell size={16} className="notification-icon upcoming" />;
      case 'health':
        return <Check size={16} className="notification-icon health" />;
      default:
        return <Bell size={16} />;
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="notification-system">
      <button
        className="notification-bell"
        onClick={() => setShowPanel(!showPanel)}
        title="Notifications"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {showPanel && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              {permission === 'default' && (
                <button
                  className="enable-notifications-btn"
                  onClick={requestPermission}
                >
                  Enable Alerts
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  className="dismiss-all-btn"
                  onClick={dismissAll}
                >
                  Dismiss All
                </button>
              )}
              <button
                className="close-panel-btn"
                onClick={() => setShowPanel(false)}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <Bell size={48} className="empty-icon" />
                <p>No notifications</p>
                <small>You're all caught up!</small>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.type}`}
                >
                  <div className="notification-content">
                    {getNotificationIcon(notification.type)}
                    <div className="notification-text">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <small>{notification.time}</small>
                    </div>
                  </div>
                  <button
                    className="dismiss-btn"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationSystem;