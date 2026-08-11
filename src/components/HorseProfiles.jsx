import { useState } from 'react';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

function HorseProfiles({ horses, addHorse, updateHorse, deleteHorse }) {
  const [showModal, setShowModal] = useState(false);
  const [editingHorse, setEditingHorse] = useState(null);
  const [expandedHorse, setExpandedHorse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    color: '',
    gender: '',
    medicalHistory: '',
    feedingSchedule: '',
    trainingNotes: '',
    specialRequirements: '',
    emergencyContact: '',
    photo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingHorse) {
      updateHorse(editingHorse.id, formData);
      setEditingHorse(null);
    } else {
      addHorse(formData);
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (horse) => {
    setEditingHorse(horse);
    setFormData(horse);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this horse profile?')) {
      deleteHorse(id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      breed: '',
      age: '',
      color: '',
      gender: '',
      medicalHistory: '',
      feedingSchedule: '',
      trainingNotes: '',
      specialRequirements: '',
      emergencyContact: '',
      photo: ''
    });
  };

  const toggleExpand = (horseId) => {
    setExpandedHorse(expandedHorse === horseId ? null : horseId);
  };

  return (
    <div className="page-container">
      <h2 className="section-title">Horse Profiles</h2>
      
      <div className="action-bar">
        <button 
          className="gothic-button"
          onClick={() => {
            resetForm();
            setEditingHorse(null);
            setShowModal(true);
          }}
        >
          <Plus size={20} />
          Add New Horse
        </button>
      </div>

      {horses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🐴</div>
          <h3>No Horse Profiles Yet</h3>
          <p>Create your first horse profile to begin tracking their care and management.</p>
        </div>
      ) : (
        <div className="grid-layout">
          {horses.map((horse) => (
            <div key={horse.id} className="gothic-card horse-card">
              <div className="horse-card-header">
                <div className="horse-avatar">
                  {horse.photo ? (
                    <img src={horse.photo} alt={horse.name} />
                  ) : (
                    <span className="avatar-placeholder">🐴</span>
                  )}
                </div>
                <div className="horse-basic-info">
                  <h3 className="horse-name">{horse.name}</h3>
                  <p className="horse-details">{horse.breed} • {horse.age} years • {horse.gender}</p>
                </div>
                <div className="horse-actions">
                  <button 
                    className="icon-button"
                    onClick={() => toggleExpand(horse.id)}
                    title="View Details"
                  >
                    {expandedHorse === horse.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <button 
                    className="icon-button"
                    onClick={() => handleEdit(horse)}
                    title="Edit"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    className="icon-button delete"
                    onClick={() => handleDelete(horse.id)}
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              {expandedHorse === horse.id && (
                <div className="horse-details-expand">
                  <div className="detail-section">
                    <h4 className="detail-title">Medical History</h4>
                    <p className="detail-content">{horse.medicalHistory || 'No medical history recorded'}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4 className="detail-title">Feeding Schedule</h4>
                    <p className="detail-content">{horse.feedingSchedule || 'No feeding schedule set'}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4 className="detail-title">Training Notes</h4>
                    <p className="detail-content">{horse.trainingNotes || 'No training notes recorded'}</p>
                  </div>
                  
                  {horse.specialRequirements && (
                    <div className="detail-section">
                      <h4 className="detail-title">Special Requirements</h4>
                      <p className="detail-content">{horse.specialRequirements}</p>
                    </div>
                  )}
                  
                  {horse.emergencyContact && (
                    <div className="detail-section">
                      <h4 className="detail-title">Emergency Contact</h4>
                      <p className="detail-content">{horse.emergencyContact}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
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
              {editingHorse ? 'Edit Horse Profile' : 'Add New Horse'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="gothic-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Breed *</label>
                  <input
                    type="text"
                    className="gothic-input"
                    value={formData.breed}
                    onChange={(e) => setFormData({...formData, breed: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input
                    type="number"
                    className="gothic-input"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    required
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select
                    className="gothic-input"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Stallion">Stallion</option>
                    <option value="Mare">Mare</option>
                    <option value="Gelding">Gelding</option>
                    <option value="Colt">Colt</option>
                    <option value="Filly">Filly</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Color</label>
                <input
                  type="text"
                  className="gothic-input"
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  placeholder="e.g., Bay, Chestnut, Black"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Medical History</label>
                <textarea
                  className="gothic-input"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                  rows="3"
                  placeholder="Past illnesses, surgeries, treatments..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Feeding Schedule</label>
                <textarea
                  className="gothic-input"
                  value={formData.feedingSchedule}
                  onChange={(e) => setFormData({...formData, feedingSchedule: e.target.value})}
                  rows="3"
                  placeholder="Morning, afternoon, evening feed times and amounts..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Training Notes</label>
                <textarea
                  className="gothic-input"
                  value={formData.trainingNotes}
                  onChange={(e) => setFormData({...formData, trainingNotes: e.target.value})}
                  rows="3"
                  placeholder="Training progress, goals, achievements..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Special Requirements</label>
                <textarea
                  className="gothic-input"
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
                  rows="2"
                  placeholder="Dietary restrictions, behavioral needs, etc."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Emergency Contact</label>
                <input
                  type="text"
                  className="gothic-input"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  placeholder="Name and phone number"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Photo URL</label>
                <input
                  type="url"
                  className="gothic-input"
                  value={formData.photo}
                  onChange={(e) => setFormData({...formData, photo: e.target.value})}
                  placeholder="https://example.com/horse-photo.jpg"
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
                  {editingHorse ? 'Update Horse' : 'Add Horse'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HorseProfiles;