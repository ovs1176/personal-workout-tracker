import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkoutDashboard from './pages/WorkoutDashboard';
import LogWorkout from './pages/LogWorkout';
import Progress from './pages/Progress';
import History from './pages/History';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#111827', color: '#f9fafb', fontFamily: 'system-ui, sans-serif' }}>
        <Navbar />
        <main style={{ paddingBottom: 48 }}>
          <Routes>
            <Route path="/" element={<WorkoutDashboard />} />
            <Route path="/log/:exercise" element={<LogWorkout />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
