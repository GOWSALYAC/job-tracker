import React, { useState } from 'react';
import JobCard from './JobCard';

function JobList({ jobs, deleteJob, setEditJob }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchStatus = filter === 'All' || job.status === filter;
    const matchSearch = job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="list-container">
      <h2>My Applications ({filteredJobs.length})</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search company or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-buttons">
          {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="no-jobs">No applications found!</p>
      ) : (
        filteredJobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            deleteJob={deleteJob}
            setEditJob={setEditJob}
          />
        ))
      )}
    </div>
  );
}

export default JobList;