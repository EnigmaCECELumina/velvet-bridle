import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/gothic-theme.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import HorseProfiles from './components/HorseProfiles';
import TaskScheduler from './components/TaskScheduler';
import HealthTracking from './components/HealthTracking';
import Reports from './components/Reports';
import { loadSampleData } from './utils/sampleData';

function App() {
  const [horses, setHorses] = useState(() => {
    const saved = localStorage.getItem('velvet-bridle-horses');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('velvet-bridle-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [healthRecords, setHealthRecords] = useState(() => {
    const saved = localStorage.getItem('velvet-bridle-health');
    return saved ? JSON.parse(saved) : [];
  });

  // Load sample data on first visit
  useEffect(() => {
    loadSampleData();
    // Reload data after sample data is loaded
    const horsesData = localStorage.getItem('velvet-bridle-horses');
    const tasksData = localStorage.getItem('velvet-bridle-tasks');
    const healthData = localStorage.getItem('velvet-bridle-health');
    
    if (horsesData && horses.length === 0) {
      setHorses(JSON.parse(horsesData));
    }
    if (tasksData && tasks.length === 0) {
      setTasks(JSON.parse(tasksData));
    }
    if (healthData && healthRecords.length === 0) {
      setHealthRecords(JSON.parse(healthData));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('velvet-bridle-horses', JSON.stringify(horses));
  }, [horses]);

  useEffect(() => {
    localStorage.setItem('velvet-bridle-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('velvet-bridle-health', JSON.stringify(healthRecords));
  }, [healthRecords]);

  const addHorse = (horse) => {
    setHorses([...horses, { ...horse, id: Date.now() }]);
  };

  const updateHorse = (id, updatedHorse) => {
    setHorses(horses.map(horse => 
      horse.id === id ? { ...horse, ...updatedHorse } : horse
    ));
  };

  const deleteHorse = (id) => {
    setHorses(horses.filter(horse => horse.id !== id));
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addHealthRecord = (record) => {
    setHealthRecords([...healthRecords, { ...record, id: Date.now() }]);
  };

  const updateHealthRecord = (id, updatedRecord) => {
    setHealthRecords(healthRecords.map(record => 
      record.id === id ? { ...record, ...updatedRecord } : record
    ));
  };

  const deleteHealthRecord = (id) => {
    setHealthRecords(healthRecords.filter(record => record.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Navbar tasks={tasks} healthRecords={healthRecords} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <Dashboard 
                horses={horses}
                tasks={tasks}
                healthRecords={healthRecords}
              />
            } />
            <Route path="/horses" element={
              <HorseProfiles 
                horses={horses}
                addHorse={addHorse}
                updateHorse={updateHorse}
                deleteHorse={deleteHorse}
              />
            } />
            <Route path="/scheduler" element={
              <TaskScheduler 
                tasks={tasks}
                horses={horses}
                addTask={addTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            } />
            <Route path="/health" element={
              <HealthTracking 
                healthRecords={healthRecords}
                horses={horses}
                addHealthRecord={addHealthRecord}
                updateHealthRecord={updateHealthRecord}
                deleteHealthRecord={deleteHealthRecord}
              />
            } />
            <Route path="/reports" element={
              <Reports 
                horses={horses}
                tasks={tasks}
                healthRecords={healthRecords}
              />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;