import React from 'react';

function JobCard({ job, deleteJob, setEditJob }) {
  const statusColors = {
    Applied: '#3498db',
    Interview: '#f39c12',
    Offer: '#2ecc71',
    Rejected: '#e74c3c'
  };

  const priorityColors = {
    High: '#e74c3c',
    Medium: '#f39c12',
    Low: '#2ecc71'
  };

  const isInterviewSoon = () => {
    if (!job.interviewDate) return false;
    const today = new Date();
    const interview = new Date(job.interviewDate);
    const diff = (interview - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  };

  return (
    <div className="job-card">
      {isInterviewSoon() && (
        <div className="reminder">
          🔔 Interview coming up on {new Date(job.interviewDate).toLocaleDateString('en-IN')}!
        </div>
      )}
      <div className="job-card-header">
        <div>
          <h3>{job.company}</h3>
          <p className="position">{job.position}</p>
          {job.location && <p className="location">📍 {job.location}</p>}
        </div>
        <div className="badges">
          <span className="status-badge" style={{ backgroundColor: statusColors[job.status] }}>
            {job.status}
          </span>
          <span className="priority-badge" style={{ backgroundColor: priorityColors[job.priority] }}>
            {job.priority}
          </span>
        </div>
      </div>

      <div className="dates">
        {job.appliedDate && (
          <span>📅 Applied: {new Date(job.appliedDate).toLocaleDateString('en-IN')}</span>
        )}
        {job.interviewDate && (
          <span>🗓️ Interview: {new Date(job.interviewDate).toLocaleDateString('en-IN')}</span>
        )}
      </div>

      {job.notes && <p className="notes">📝 {job.notes}</p>}

      <div className="job-card-footer">
        <p className="date">Added: {new Date(job.createdAt).toLocaleDateString('en-IN')}</p>
        <div className="card-buttons">
          <button className="btn-edit" onClick={() => setEditJob(job)}>Edit</button>
          <button className="btn-delete" onClick={() => deleteJob(job._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;