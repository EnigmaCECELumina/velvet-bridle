import { useState, useCallback } from 'react';
import { Plus, Edit, Trash2, Filter, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';

function TaskScheduler({ tasks, horses, addTask, updateTask, deleteTask }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterHorse, setFilterHorse] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    category: 'feeding',
    horseId: '',
    date: '',
    time: '',
    duration: '',
    recurring: false,
    recurringType: 'weekly',
    recurringInterval: 1,
    notes: '',
    completed: false
  });

  const categoryColors = {
    feeding: '#c9a227',
    grooming: '#d4af37',
    training: '#4a0e1a',
    medical: '#8b0000',
    farrier: '#c9a227',
    other: '#f5f0e8'
  };

  const filteredTasks = tasks.filter(task => {
    const categoryMatch = filterCategory === 'all' || task.category === filterCategory;
    const horseMatch = filterHorse === 'all' || task.horseId === filterHorse;
    return categoryMatch && horseMatch;
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: format(date, 'yyyy-MM-dd')
    });
    setShowModal(true);
  };

  const handleQuickAdd = () => {
    const today = new Date();
    setSelectedDate(today);
    setFormData({
      ...formData,
      date: format(today, 'yyyy-MM-dd')
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let tasksToAdd = [];
    
    if (formData.recurring) {
      // Generate recurring tasks
      const startDate = new Date(formData.date);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 3); // Generate 3 months of recurring tasks
      
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        tasksToAdd.push({
          ...formData,
          id: Date.now() + Math.random(),
          date: format(currentDate, 'yyyy-MM-dd')
        });
        
        // Add interval based on recurring type
        switch (formData.recurringType) {
          case 'daily':
            currentDate.setDate(currentDate.getDate() + formData.recurringInterval);
            break;
          case 'weekly':
            currentDate.setDate(currentDate.getDate() + (7 * formData.recurringInterval));
            break;
          case 'monthly':
            currentDate.setMonth(currentDate.getMonth() + formData.recurringInterval);
            break;
          default:
            currentDate.setDate(currentDate.getDate() + 7);
        }
      }
    } else {
      tasksToAdd.push({
        ...formData,
        id: Date.now()
      });
    }

    tasksToAdd.forEach(task => addTask(task));
    
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData(task);
    setSelectedDate(new Date(task.date));
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const toggleComplete = (task) => {
    updateTask(task.id, { completed: !task.completed });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'feeding',
      horseId: '',
      date: '',
      time: '',
      duration: '',
      recurring: false,
      recurringType: 'weekly',
      recurringInterval: 1,
      notes: '',
      completed: false
    });
    setEditingTask(null);
  };

  const getTasksForDate = (date) => {
    return filteredTasks.filter(task => isSameDay(new Date(task.date), date));
  };

  const isToday = (date) => isSameDay(date, new Date());

  return (
    <div className="page-container">
      <div className="scheduler-header">
        <h2 className="section-title">Task Scheduler</h2>
        
        <div className="scheduler-controls">
          <div className="filter-group">
            <Filter size={20} className="filter-icon" />
            <select 
              className="gothic-input filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="feeding">Feeding</option>
              <option value="grooming">Grooming</option>
              <option value="training">Training</option>
              <option value="medical">Medical</option>
              <option value="farrier">Farrier</option>
              <option value="other">Other</option>
            </select>
            
            <select 
              className="gothic-input filter-select"
              value={filterHorse}
              onChange={(e) => setFilterHorse(e.target.value)}
            >
              <option value="all">All Horses</option>
              {horses.map(horse => (
                <option key={horse.id} value={horse.id}>{horse.name}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="gothic-button quick-add-button"
            onClick={handleQuickAdd}
          >
            <Plus size={20} />
            Quick Add
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          <button className="calendar-nav" onClick={previousMonth}>
            <ChevronLeft size={24} />
          </button>
          <h3 className="calendar-title">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <button className="calendar-nav" onClick={nextMonth}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
          
          {calendarDays.map(date => {
            const dayTasks = getTasksForDate(date);
            const isCurrentMonth = isSameMonth(date, currentDate);
            
            return (
              <div
                key={date.toISOString()}
                className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday(date) ? 'today' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                <div className="calendar-day-number">
                  {format(date, 'd')}
                </div>
                <div className="calendar-day-tasks">
                  {dayTasks.slice(0, 3).map(task => (
                    <div
                      key={task.id}
                      className="calendar-task"
                      style={{ 
                        borderLeftColor: categoryColors[task.category],
                        backgroundColor: task.completed ? 'rgba(201, 162, 39, 0.1)' : 'rgba(74, 14, 26, 0.3)'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(task);
                      }}
                    >
                      <span className="calendar-task-title">{task.title}</span>
                      {task.completed && <Check size={12} className="task-check" />}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="calendar-more-tasks">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task List View */}
      <div className="task-list-section">
        <h3 className="gothic-subheading">All Tasks</h3>
        <div className="task-list-container">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <h3>No Tasks Found</h3>
              <p>Create tasks to keep track of your horse care schedule.</p>
            </div>
          ) : (
            <div className="task-list-grid">
              {filteredTasks
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(task => (
                  <div key={task.id} className="task-card">
                    <div className="task-card-header">
                      <div 
                        className="task-category-bar"
                        style={{ backgroundColor: categoryColors[task.category] }}
                      />
                      <div className="task-card-content">
                        <h4 className="task-card-title">{task.title}</h4>
                        <div className="task-card-meta">
                          <span className="task-date">
                            {format(new Date(task.date), 'MMM d, yyyy')}
                          </span>
                          {task.time && <span className="task-time">{task.time}</span>}
                          <span className="task-category-badge" style={{ 
                            color: categoryColors[task.category],
                            borderColor: categoryColors[task.category]
                          }}>
                            {task.category}
                          </span>
                        </div>
                        {task.horseId && (
                          <span className="task-horse-name">
                            {horses.find(h => h.id === task.horseId)?.name || 'Unknown'}
                          </span>
                        )}
                      </div>
                      <div className="task-card-actions">
                        <button
                          className="task-action-btn complete-btn"
                          onClick={() => toggleComplete(task)}
                          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          <Check size={18} />
                        </button>
                        <button
                          className="task-action-btn edit-btn"
                          onClick={() => handleEdit(task)}
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="task-action-btn delete-btn"
                          onClick={() => handleDelete(task.id)}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    {task.notes && (
                      <p className="task-notes">{task.notes}</p>
                    )}
                    {task.recurring && (
                      <span className="recurring-badge">
                        Recurring ({task.recurringType})
                      </span>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            
            <h3 className="gothic-heading">
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Task Title *</label>
                <input
                  type="text"
                  className="gothic-input"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  placeholder="e.g., Morning feeding, Grooming session"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="gothic-input"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="feeding">Feeding</option>
                    <option value="grooming">Grooming</option>
                    <option value="training">Training</option>
                    <option value="medical">Medical</option>
                    <option value="farrier">Farrier</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Horse</label>
                  <select
                    className="gothic-input"
                    value={formData.horseId}
                    onChange={(e) => setFormData({...formData, horseId: e.target.value})}
                  >
                    <option value="">All Horses</option>
                    {horses.map(horse => (
                      <option key={horse.id} value={horse.id}>{horse.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    className="gothic-input"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="gothic-input"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  className="gothic-input"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="e.g., 30 minutes, 1 hour"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="gothic-input"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows="3"
                  placeholder="Additional details or instructions..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <input
                    type="checkbox"
                    checked={formData.recurring}
                    onChange={(e) => setFormData({...formData, recurring: e.target.checked})}
                    style={{ marginRight: '0.5rem' }}
                  />
                  Recurring Task
                </label>
              </div>
              
              {formData.recurring && (
                <div className="recurring-options">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Repeat</label>
                      <select
                        className="gothic-input"
                        value={formData.recurringType}
                        onChange={(e) => setFormData({...formData, recurringType: e.target.value})}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Every</label>
                      <input
                        type="number"
                        className="gothic-input"
                        value={formData.recurringInterval}
                        onChange={(e) => setFormData({...formData, recurringInterval: parseInt(e.target.value) || 1})}
                        min="1"
                        max="12"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="action-buttons">
                <button 
                  type="button" 
                  className="gothic-button secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="gothic-button">
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskScheduler;