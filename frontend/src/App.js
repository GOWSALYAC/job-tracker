import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    try {
      const res = await axios.get('https://job-tracker-backend-2rxu.onrender.com/api/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user && user !== 'login' && user !== 'register') {
      fetchJobs();
    }
  }, [user]);

  const addJob = async (jobData) => {
    await axios.post('https://job-tracker-backend-2rxu.onrender.com/api/jobs', jobData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchJobs();
  };

  const updateJob = async (id, jobData) => {
    await axios.put(`https://job-tracker-backend-2rxu.onrender.com/api/jobs/${id}`, jobData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditJob(null);
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await axios.delete(`https://job-tracker-backend-2rxu.onrender.com/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchJobs();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setJobs([]);
    setPage('login');
  };

  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === 'Applied').length,
    interview: jobs.filter(j => j.status === 'Interview').length,
    offer: jobs.filter(j => j.status === 'Offer').length,
    rejected: jobs.filter(j => j.status === 'Rejected').length,
  };

  // Show login/register
  if (!user || user === 'login' || user === 'register') {
    if (user === 'register' || page === 'register') {
      return <Register setUser={(u) => {
        if (u === 'login') { setPage('login'); setUser(null); }
        else setUser(u);
      }} />;
    }
    return <Login setUser={(u) => {
      if (u === 'register') { setPage('register'); setUser('register'); }
      else setUser(u);
    }} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <h1>Job Application Tracker</h1>
            <p>Track your job applications easily</p>
          </div>
          <div className="header-right">
            <span className="welcome">Hi, {user.name} 👋</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <div className="stats">
        <div className="stat-card total">Total: {stats.total}</div>
        <div className="stat-card applied">Applied: {stats.applied}</div>
        <div className="stat-card interview">Interview: {stats.interview}</div>
        <div className="stat-card offer">Offer: {stats.offer}</div>
        <div className="stat-card rejected">Rejected: {stats.rejected}</div>
      </div>

      <div className="container">
        <JobForm
          addJob={addJob}
          updateJob={updateJob}
          editJob={editJob}
          setEditJob={setEditJob}
        />
        <JobList
          jobs={jobs}
          deleteJob={deleteJob}
          setEditJob={setEditJob}
        />
      </div>
    </div>
  );
}

export default App;