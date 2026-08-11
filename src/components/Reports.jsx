import { useState } from 'react';
import { Download, FileText, Calendar, Heart, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

function Reports({ horses, tasks, healthRecords }) {
  const [reportType, setReportType] = useState('tasks');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedHorse, setSelectedHorse] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const horseMatch = selectedHorse === 'all' || task.horseId === selectedHorse;
    const dateMatch = (!dateRange.start || new Date(task.date) >= new Date(dateRange.start)) &&
                     (!dateRange.end || new Date(task.date) <= new Date(dateRange.end));
    return horseMatch && dateMatch;
  });

  const filteredHealth = healthRecords.filter(record => {
    const horseMatch = selectedHorse === 'all' || record.horseId === selectedHorse;
    const dateMatch = (!dateRange.start || new Date(record.date) >= new Date(dateRange.start)) &&
                     (!dateRange.end || new Date(record.date) <= new Date(dateRange.end));
    return horseMatch && dateMatch;
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(201, 162, 39); // Gold color
    doc.text('The Velvet Bridle', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`, 105, 35, { align: 'center' });
    
    // Date range
    if (dateRange.start || dateRange.end) {
      doc.setFontSize(10);
      doc.setTextColor(200, 200, 200);
      const dateText = `Date Range: ${dateRange.start || 'All'} to ${dateRange.end || 'Present'}`;
      doc.text(dateText, 105, 45, { align: 'center' });
    }
    
    // Horse filter
    if (selectedHorse !== 'all') {
      const horse = horses.find(h => h.id === selectedHorse);
      if (horse) {
        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200);
        doc.text(`Horse: ${horse.name}`, 105, 52, { align: 'center' });
      }
    }
    
    // Content based on report type
    let yPosition = 65;
    
    if (reportType === 'tasks') {
      doc.setFontSize(12);
      doc.setTextColor(201, 162, 39);
      doc.text('Task Schedule', 20, yPosition);
      yPosition += 10;
      
      if (filteredTasks.length === 0) {
        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200);
        doc.text('No tasks found for the selected criteria.', 20, yPosition);
      } else {
        filteredTasks.forEach((task, index) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFontSize(10);
          doc.setTextColor(255, 255, 255);
          doc.text(`${index + 1}. ${task.title}`, 20, yPosition);
          yPosition += 6;
          
          doc.setFontSize(8);
          doc.setTextColor(180, 180, 180);
          doc.text(`   Date: ${new Date(task.date).toLocaleDateString()}`, 25, yPosition);
          yPosition += 5;
          
          if (task.time) {
            doc.text(`   Time: ${task.time}`, 25, yPosition);
            yPosition += 5;
          }
          
          doc.text(`   Category: ${task.category}`, 25, yPosition);
          yPosition += 5;
          
          if (task.horseId) {
            const horse = horses.find(h => h.id === task.horseId);
            if (horse) {
              doc.text(`   Horse: ${horse.name}`, 25, yPosition);
              yPosition += 5;
            }
          }
          
          if (task.notes) {
            doc.text(`   Notes: ${task.notes}`, 25, yPosition);
            yPosition += 5;
          }
          
          yPosition += 5;
        });
      }
    } else if (reportType === 'health') {
      doc.setFontSize(12);
      doc.setTextColor(201, 162, 39);
      doc.text('Health Records', 20, yPosition);
      yPosition += 10;
      
      if (filteredHealth.length === 0) {
        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200);
        doc.text('No health records found for the selected criteria.', 20, yPosition);
      } else {
        filteredHealth.forEach((record, index) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFontSize(10);
          doc.setTextColor(255, 255, 255);
          doc.text(`${index + 1}. ${record.type.toUpperCase()}: ${record.description}`, 20, yPosition);
          yPosition += 6;
          
          doc.setFontSize(8);
          doc.setTextColor(180, 180, 180);
          doc.text(`   Date: ${new Date(record.date).toLocaleDateString()}`, 25, yPosition);
          yPosition += 5;
          
          if (record.horseId) {
            const horse = horses.find(h => h.id === record.horseId);
            if (horse) {
              doc.text(`   Horse: ${horse.name}`, 25, yPosition);
              yPosition += 5;
            }
          }
          
          if (record.veterinarian) {
            doc.text(`   Veterinarian: ${record.veterinarian}`, 25, yPosition);
            yPosition += 5;
          }
          
          if (record.weight) {
            doc.text(`   Weight: ${record.weight} kg`, 25, yPosition);
            yPosition += 5;
          }
          
          if (record.cost) {
            doc.text(`   Cost: $${record.cost}`, 25, yPosition);
            yPosition += 5;
          }
          
          if (record.notes) {
            doc.text(`   Notes: ${record.notes}`, 25, yPosition);
            yPosition += 5;
          }
          
          yPosition += 5;
        });
      }
    } else if (reportType === 'horses') {
      doc.setFontSize(12);
      doc.setTextColor(201, 162, 39);
      doc.text('Horse Profiles', 20, yPosition);
      yPosition += 10;
      
      const filteredHorses = selectedHorse === 'all' 
        ? horses 
        : horses.filter(h => h.id === selectedHorse);
      
      if (filteredHorses.length === 0) {
        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200);
        doc.text('No horses found.', 20, yPosition);
      } else {
        filteredHorses.forEach((horse, index) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFontSize(10);
          doc.setTextColor(255, 255, 255);
          doc.text(`${index + 1}. ${horse.name}`, 20, yPosition);
          yPosition += 6;
          
          doc.setFontSize(8);
          doc.setTextColor(180, 180, 180);
          doc.text(`   Breed: ${horse.breed}`, 25, yPosition);
          yPosition += 5;
          doc.text(`   Age: ${horse.age} years`, 25, yPosition);
          yPosition += 5;
          doc.text(`   Gender: ${horse.gender}`, 25, yPosition);
          yPosition += 5;
          
          if (horse.color) {
            doc.text(`   Color: ${horse.color}`, 25, yPosition);
            yPosition += 5;
          }
          
          if (horse.medicalHistory) {
            doc.text(`   Medical History: ${horse.medicalHistory}`, 25, yPosition);
            yPosition += 5;
          }
          
          if (horse.feedingSchedule) {
            doc.text(`   Feeding Schedule: ${horse.feedingSchedule}`, 25, yPosition);
            yPosition += 5;
          }
          
          if (horse.trainingNotes) {
            doc.text(`   Training Notes: ${horse.trainingNotes}`, 25, yPosition);
            yPosition += 5;
          }
          
          yPosition += 5;
        });
      }
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 285, { align: 'center' });
    
    // Save
    doc.save(`velvet-bridle-${reportType}-report.pdf`);
  };

  const exportToCSV = () => {
    let csvData = [];
    let filename = '';
    
    if (reportType === 'tasks') {
      csvData = filteredTasks.map(task => ({
        Title: task.title,
        Category: task.category,
        Date: task.date,
        Time: task.time || '',
        Duration: task.duration || '',
        Horse: task.horseId ? (horses.find(h => h.id === task.horseId)?.name || 'Unknown') : 'All',
        Notes: task.notes || '',
        Completed: task.completed ? 'Yes' : 'No',
        Recurring: task.recurring ? `Yes (${task.recurringType})` : 'No'
      }));
      filename = 'velvet-bridle-tasks.csv';
    } else if (reportType === 'health') {
      csvData = filteredHealth.map(record => ({
        Type: record.type,
        Description: record.description,
        Date: record.date,
        Horse: record.horseId ? (horses.find(h => h.id === record.horseId)?.name || 'Unknown') : 'Unknown',
        Veterinarian: record.veterinarian || '',
        Cost: record.cost || '',
        Weight: record.weight || '',
        Temperature: record.temperature || '',
        NextDueDate: record.nextDueDate || '',
        Notes: record.notes || ''
      }));
      filename = 'velvet-bridle-health-records.csv';
    } else if (reportType === 'horses') {
      const filteredHorses = selectedHorse === 'all' 
        ? horses 
        : horses.filter(h => h.id === selectedHorse);
      
      csvData = filteredHorses.map(horse => ({
        Name: horse.name,
        Breed: horse.breed,
        Age: horse.age,
        Gender: horse.gender,
        Color: horse.color || '',
        MedicalHistory: horse.medicalHistory || '',
        FeedingSchedule: horse.feedingSchedule || '',
        TrainingNotes: horse.trainingNotes || '',
        SpecialRequirements: horse.specialRequirements || '',
        EmergencyContact: horse.emergencyContact || ''
      }));
      filename = 'velvet-bridle-horses.csv';
    }
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getReportSummary = () => {
    switch (reportType) {
      case 'tasks':
        return `${filteredTasks.length} tasks`;
      case 'health':
        return `${filteredHealth.length} health records`;
      case 'horses':
        const filteredHorses = selectedHorse === 'all' ? horses : horses.filter(h => h.id === selectedHorse);
        return `${filteredHorses.length} horses`;
      default:
        return '';
    }
  };

  return (
    <div className="page-container">
      <h2 className="section-title">Reports & Exports</h2>
      
      <div className="reports-container">
        <div className="report-filters">
          <h3 className="gothic-subheading">
            <Filter size={20} className="inline-icon" />
            Report Settings
          </h3>
          
          <div className="filter-grid">
            <div className="form-group">
              <label className="form-label">Report Type</label>
              <select
                className="gothic-input"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="tasks">Task Schedule</option>
                <option value="health">Health Records</option>
                <option value="horses">Horse Profiles</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Horse Filter</label>
              <select
                className="gothic-input"
                value={selectedHorse}
                onChange={(e) => setSelectedHorse(e.target.value)}
              >
                <option value="all">All Horses</option>
                {horses.map(horse => (
                  <option key={horse.id} value={horse.id}>{horse.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="gothic-input"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="gothic-input"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="report-preview">
          <div className="report-summary-card">
            <div className="summary-icon">
              {reportType === 'tasks' && <Calendar size={32} />}
              {reportType === 'health' && <Heart size={32} />}
              {reportType === 'horses' && <span className="text-3xl">🐴</span>}
            </div>
            <div className="summary-content">
              <h4>Report Summary</h4>
              <p>{getReportSummary()}</p>
              {(dateRange.start || dateRange.end) && (
                <small>
                  {dateRange.start && `From ${new Date(dateRange.start).toLocaleDateString()}`}
                  {dateRange.start && dateRange.end && ' to '}
                  {dateRange.end && `To ${new Date(dateRange.end).toLocaleDateString()}`}
                </small>
              )}
            </div>
          </div>

          <div className="export-buttons">
            <button 
              className="gothic-button export-button"
              onClick={exportToPDF}
            >
              <Download size={20} />
              Export as PDF
            </button>
            
            <button 
              className="gothic-button export-button"
              onClick={exportToCSV}
            >
              <Download size={20} />
              Export as CSV
            </button>
          </div>

          <div className="report-instructions">
            <h4 className="gothic-subheading">Export Options</h4>
            <ul className="instructions-list">
              <li>
                <FileText size={16} className="inline-icon" />
                <strong>PDF Export:</strong> Generates a formatted document suitable for printing or sharing with veterinarians and trainers.
              </li>
              <li>
                <FileText size={16} className="inline-icon" />
                <strong>CSV Export:</strong> Creates a spreadsheet-compatible file for data analysis and record-keeping.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sample Data Preview */}
      <div className="data-preview-section">
        <h3 className="gothic-subheading">Data Preview</h3>
        <div className="data-preview-content">
          {reportType === 'tasks' && (
            <div className="preview-list">
              {filteredTasks.slice(0, 5).map(task => (
                <div key={task.id} className="preview-item">
                  <span className="preview-title">{task.title}</span>
                  <span className="preview-date">{new Date(task.date).toLocaleDateString()}</span>
                  <span className="preview-category">{task.category}</span>
                </div>
              ))}
              {filteredTasks.length === 0 && <p className="preview-empty">No tasks to display</p>}
            </div>
          )}
          
          {reportType === 'health' && (
            <div className="preview-list">
              {filteredHealth.slice(0, 5).map(record => (
                <div key={record.id} className="preview-item">
                  <span className="preview-title">{record.type}: {record.description}</span>
                  <span className="preview-date">{new Date(record.date).toLocaleDateString()}</span>
                </div>
              ))}
              {filteredHealth.length === 0 && <p className="preview-empty">No health records to display</p>}
            </div>
          )}
          
          {reportType === 'horses' && (
            <div className="preview-list">
              {(selectedHorse === 'all' ? horses : horses.filter(h => h.id === selectedHorse)).slice(0, 5).map(horse => (
                <div key={horse.id} className="preview-item">
                  <span className="preview-title">{horse.name}</span>
                  <span className="preview-breed">{horse.breed}</span>
                  <span className="preview-age">{horse.age} years</span>
                </div>
              ))}
              {(selectedHorse === 'all' ? horses : horses.filter(h => h.id === selectedHorse)).length === 0 && (
                <p className="preview-empty">No horses to display</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;