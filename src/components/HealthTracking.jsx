import { useState } from 'react';
import { Plus, Edit, Trash2, Activity, Pill, Syringe, Bone, Scale } from 'lucide-react';

function HealthTracking({ healthRecords, horses, addHealthRecord, updateHealthRecord, deleteHealthRecord }) {
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterHorse, setFilterHorse] = useState('all');

  const [formData, setFormData] = useState({
    type: 'vaccination',
    horseId: '',
    date: '',
    description: '',
    veterinarian: '',
    cost: '',
    notes: '',
    weight: '',
    temperature: '',
    nextDueDate: ''
  });

  const recordTypes = [
    { value: 'vaccination', label: 'Vaccination', icon: Syringe, color: '#c9a227' },
    { value: 'injury', label: 'Injury', icon: Bone, color: '#8b0000' },
    { value: 'illness', label: 'Illness', icon: Activity, color: '#ff6b6b' },
    { value: 'checkup', label: 'Checkup', icon: Activity, color: '#4a0e1a' },
    { value: 'supplement', label: 'Supplement', icon: Pill, color: '#d4af37' },
    { value: 'weight', label: 'Weight', icon: Scale, color: '#c9a227' },
    { value: 'other', label: 'Other', icon: Activity, color: '#f5f0e8' }
  ];

  const filteredRecords = healthRecords.filter(record => {
    const typeMatch = filterType === 'all' || record.type === filterType;
    const horseMatch = filterHorse === 'all' || record.horseId === filterHorse;
    return typeMatch && horseMatch;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingRecord) {
      updateHealthRecord(editingRecord.id, formData);
      setEditingRecord(null);
    } else {
      addHealthRecord(formData);
    }
    
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData(record);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this health record?')) {
      deleteHealthRecord(id);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'vaccination',
      horseId: '',
      date: '',
      description: '',
      veterinarian: '',
      cost: '',
      notes: '',
      weight: '',
      temperature: '',
      nextDueDate: ''
    });
    setEditingRecord(null);
  };

  const getRecordTypeInfo = (type) => {
    return recordTypes.find(t => t.value === type) || recordTypes[recordTypes.length - 1];
  };

  const isUrgent = (record) => {
    return record.type === 'injury' || record.type === 'illness';
  };

  const isUpcoming = (record) => {
    if (!record.nextDueDate) return false;
    const dueDate = new Date(record.nextDueDate);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  return (
    <div className="page-container">
      <h2 className="section-title">Health Tracking</h2>
      
      <div className="health-header">
        <div className="filter-group">
          <select 
            className="gothic-input filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            {recordTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
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
          className="gothic-button"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus size={20} />
          Add Record
        </button>
      </div>

      {/* Quick Stats */}
      <div className="health-stats">
        <div className="health-stat-card">
          <Activity size={24} className="stat-icon" />
          <div>
            <h4>Total Records</h4>
            <p>{healthRecords.length}</p>
          </div>
        </div>
        <div className="health-stat-card urgent">
          <Activity size={24} className="stat-icon" />
          <div>
            <h4>Urgent Cases</h4>
            <p>{healthRecords.filter(r => isUrgent(r)).length}</p>
          </div>
        </div>
        <div className="health-stat-card upcoming">
          <Activity size={24} className="stat-icon" />
          <div>
            <h4>Upcoming Due</h4>
            <p>{healthRecords.filter(r => isUpcoming(r)).length}</p>
          </div>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏥</div>
          <h3>No Health Records Found</h3>
          <p>Add health records to track vaccinations, injuries, and wellness checks.</p>
        </div>
      ) : (
        <div className="health-records-grid">
          {filteredRecords.map(record => {
            const typeInfo = getRecordTypeInfo(record.type);
            const Icon = typeInfo.icon;
            const urgent = isUrgent(record);
            const upcoming = isUpcoming(record);
            
            return (
              <div 
                key={record.id} 
                className={`health-record-card ${urgent ? 'urgent' : ''} ${upcoming ? 'upcoming' : ''}`}
              >
                <div className="health-record-header">
                  <div 
                    className="health-record-icon"
                    style={{ backgroundColor: typeInfo.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="health-record-info">
                    <h4 className="health-record-title">{typeInfo.label}</h4>
                    <p className="health-record-date">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="health-record-actions">
                    <button 
                      className="icon-button"
                      onClick={() => handleEdit(record)}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="icon-button delete"
                      onClick={() => handleDelete(record.id)}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="health-record-body">
                  {record.horseId && (
                    <div className="health-record-field">
                      <span className="field-label">Horse:</span>
                      <span className="field-value">
                        {horses.find(h => h.id === record.horseId)?.name || 'Unknown'}
                      </span>
                    </div>
                  )}
                  
                  {record.description && (
                    <div className="health-record-field">
                      <span className="field-label">Description:</span>
                      <span className="field-value">{record.description}</span>
                    </div>
                  )}
                  
                  {record.veterinarian && (
                    <div className="health-record-field">
                      <span className="field-label">Veterinarian:</span>
                      <span className="field-value">{record.veterinarian}</span>
                    </div>
                  )}
                  
                  {record.weight && (
                    <div className="health-record-field">
                      <span className="field-label">Weight:</span>
                      <span className="field-value">{record.weight} kg</span>
                    </div>
                  )}
                  
                  {record.temperature && (
                    <div className="health-record-field">
                      <span className="field-label">Temperature:</span>
                      <span className="field-value">{record.temperature}°C</span>
                    </div>
                  )}
                  
                  {record.cost && (
                    <div className="health-record-field">
                      <span className="field-label">Cost:</span>
                      <span className="field-value">${record.cost}</span>
                    </div>
                  )}
                  
                  {record.nextDueDate && (
                    <div className="health-record-field">
                      <span className="field-label">Next Due:</span>
                      <span className="field-value">
                        {new Date(record.nextDueDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {record.notes && (
                    <div className="health-record-notes">
                      <span className="field-label">Notes:</span>
                      <p>{record.notes}</p>
                    </div>
                  )}
                </div>

                {urgent && (
                  <div className="health-record-badge urgent-badge">
                    ⚠️ Urgent
                  </div>
                )}
                
                {upcoming && !urgent && (
                  <div className="health-record-badge upcoming-badge">
                    📅 Due Soon
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

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
              {editingRecord ? 'Edit Health Record' : 'Add Health Record'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Record Type *</label>
                  <select
                    className="gothic-input"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    {recordTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Horse</label>
                  <select
                    className="gothic-input"
                    value={formData.horseId}
                    onChange={(e) => setFormData({...formData, horseId: e.target.value})}
                  >
                    <option value="">Select Horse</option>
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
                  <label className="form-label">Next Due Date</label>
                  <input
                    type="date"
                    className="gothic-input"
                    value={formData.nextDueDate}
                    onChange={(e) => setFormData({...formData, nextDueDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Description *</label>
                <input
                  type="text"
                  className="gothic-input"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  placeholder="e.g., Annual flu vaccination, Leg injury treatment"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Veterinarian</label>
                  <input
                    type="text"
                    className="gothic-input"
                    value={formData.veterinarian}
                    onChange={(e) => setFormData({...formData, veterinarian: e.target.value})}
                    placeholder="Dr. Smith"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Cost</label>
                  <input
                    type="number"
                    className="gothic-input"
                    value={formData.cost}
                    onChange={(e) => setFormData({...formData, cost: e.target.value})}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    className="gothic-input"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="500"
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Temperature (°C)</label>
                  <input
                    type="number"
                    className="gothic-input"
                    value={formData.temperature}
                    onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                    placeholder="37.5"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="gothic-input"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows="3"
                  placeholder="Additional details, observations, follow-up instructions..."
                />
              </div>
              
              <div className="action-buttons">
                <button 
                  type="button" 
                  className="gothic-button secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="gothic-button">
                  {editingRecord ? 'Update Record' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthTracking;