import { Link } from 'react-router-dom';
import { Horse, Calendar, Heart, AlertCircle, TrendingUp } from 'lucide-react';

function Dashboard({ horses, tasks, healthRecords }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTasks = tasks
    .filter(task => new Date(task.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const overdueTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate < today && !task.completed;
  });

  const recentHealthRecords = healthRecords
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const urgentHealth = healthRecords.filter(record => 
    record.type === 'injury' || record.type === 'illness'
  ).slice(0, 3);

  const getTaskCategoryColor = (category) => {
    const colors = {
      feeding: '#c9a227',
      grooming: '#d4af37',
      training: '#4a0e1a',
      medical: '#8b0000',
      farrier: '#c9a227',
      other: '#f5f0e8'
    };
    return colors[category] || colors.other;
  };

  const stats = [
    {
      label: 'Total Horses',
      value: horses.length,
      icon: Horse,
      color: 'var(--color-antique-gold)',
      link: '/horses'
    },
    {
      label: 'Active Tasks',
      value: tasks.filter(t => !t.completed).length,
      icon: Calendar,
      color: 'var(--color-rich-burgundy)',
      link: '/scheduler'
    },
    {
      label: 'Health Records',
      value: healthRecords.length,
      icon: Heart,
      color: 'var(--color-antique-gold)',
      link: '/health'
    },
    {
      label: 'Overdue Tasks',
      value: overdueTasks.length,
      icon: AlertCircle,
      color: '#ff6b6b',
      link: '/scheduler'
    }
  ];

  return (
    <div className="page-container">
      <h2 className="section-title">Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} to={stat.link} className="stat-card">
              <div className="stat-icon" style={{ color: stat.color }}>
                <Icon size={32} />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="filigree-divider" />

      {/* Two Column Layout */}
      <div className="two-column">
        {/* Upcoming Tasks */}
        <div className="gothic-card">
          <h3 className="gothic-subheading">
            <Calendar size={20} className="inline-icon" />
            Upcoming Tasks
          </h3>
          {upcomingTasks.length === 0 ? (
            <p className="empty-state-text">No upcoming tasks scheduled</p>
          ) : (
            <ul className="task-list">
              {upcomingTasks.map(task => (
                <li key={task.id} className="task-item">
                  <div 
                    className="task-category-indicator"
                    style={{ backgroundColor: getTaskCategoryColor(task.category) }}
                  />
                  <div className="task-info">
                    <span className="task-title">{task.title}</span>
                    <span className="task-date">
                      {new Date(task.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  {task.horseId && (
                    <span className="task-horse">
                      {horses.find(h => h.id === task.horseId)?.name || 'Unknown'}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <Link to="/scheduler" className="view-all-link">View All Tasks →</Link>
        </div>

        {/* Health Alerts */}
        <div className="gothic-card">
          <h3 className="gothic-subheading">
            <Heart size={20} className="inline-icon" />
            Health Alerts
          </h3>
          {urgentHealth.length === 0 ? (
            <p className="empty-state-text">No urgent health concerns</p>
          ) : (
            <ul className="health-alert-list">
              {urgentHealth.map(record => (
                <li key={record.id} className="health-alert-item">
                  <AlertCircle size={16} className="alert-icon" />
                  <div className="alert-info">
                    <span className="alert-title">{record.type}</span>
                    <span className="alert-date">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                  </div>
                  {record.horseId && (
                    <span className="alert-horse">
                      {horses.find(h => h.id === record.horseId)?.name || 'Unknown'}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <Link to="/health" className="view-all-link">View Health Records →</Link>
        </div>
      </div>

      {/* Overdue Tasks Alert */}
      {overdueTasks.length > 0 && (
        <div className="gothic-card alert-card">
          <h3 className="gothic-subheading text-burgundy">
            <AlertCircle size={20} className="inline-icon" />
            Overdue Tasks
          </h3>
          <ul className="task-list">
            {overdueTasks.map(task => (
              <li key={task.id} className="task-item overdue">
                <div 
                  className="task-category-indicator"
                  style={{ backgroundColor: '#ff6b6b' }}
                />
                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  <span className="task-date">
                    Due: {new Date(task.date).toLocaleDateString()}
                  </span>
                </div>
                {task.horseId && (
                  <span className="task-horse">
                    {horses.find(h => h.id === task.horseId)?.name || 'Unknown'}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Activity */}
      <div className="gothic-card">
        <h3 className="gothic-subheading">
          <TrendingUp size={20} className="inline-icon" />
          Recent Activity
        </h3>
        {recentHealthRecords.length === 0 ? (
          <p className="empty-state-text">No recent health records</p>
        ) : (
          <ul className="activity-list">
            {recentHealthRecords.map(record => (
              <li key={record.id} className="activity-item">
                <span className="activity-type">{record.type}</span>
                <span className="activity-date">
                  {new Date(record.date).toLocaleDateString()}
                </span>
                {record.horseId && (
                  <span className="activity-horse">
                    {horses.find(h => h.id === record.horseId)?.name || 'Unknown'}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;