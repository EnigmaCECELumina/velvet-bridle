import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Heart, FileText } from 'lucide-react';
import NotificationSystem from './NotificationSystem';

function Navbar({ tasks, healthRecords }) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/horses', label: 'Horses', icon: '🐴' },
    { path: '/scheduler', label: 'Scheduler', icon: Calendar },
    { path: '/health', label: 'Health', icon: Heart },
    { path: '/reports', label: 'Reports', icon: FileText },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🐴</span>
          <span className="brand-text">The Velvet Bridle</span>
        </div>
        <ul className="navbar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <NotificationSystem tasks={tasks} healthRecords={healthRecords} />
      </div>
    </nav>
  );
}

export default Navbar;