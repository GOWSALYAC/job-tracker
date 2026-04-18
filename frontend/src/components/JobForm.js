import React, { useState, useEffect } from 'react';

function JobForm({ addJob, updateJob, editJob, setEditJob }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    location: '',
    notes: '',
    appliedDate: '',
    interviewDate: '',
    priority: 'Medium'
  });

  useEffect(() => {
    if (editJob) {
      setFormData({
        company: editJob.company,
        position: editJob.position,
        status: editJob.status,
        location: editJob.location || '',
        notes: editJob.notes || '',
        appliedDate: editJob.appliedDate ? editJob.appliedDate.split('T')[0] : '',
        interviewDate: editJob.interviewDate ? editJob.interviewDate.split('T')[0] : '',
        priority: editJob.priority || 'Medium'
      });
    }
  }, [editJob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.position) return;
    if (editJob) {
      updateJob(editJob._id, formData);
    } else {
      addJob(formData);
    }
    setFormData({
      company: '',
      position: '',
      status: 'Applied',
      location: '',
      notes: '',
      appliedDate: '',
      interviewDate: '',
      priority: 'Medium'
    });
  };

  const handleCancel = () => {
    setEditJob(null);
    setFormData({
      company: '',
      position: '',
      status: 'Applied',
      location: '',
      notes: '',
      appliedDate: '',
      interviewDate: '',
      priority: 'Medium'
    });
  };

  return (
    <div className="form-container">
      <h2>{editJob ? 'Edit Job' : 'Add New Job'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company Name *"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position *"
          value={formData.position}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="High">🔴 High Priority</option>
          <option value="Medium">🟡 Medium Priority</option>
          <option value="Low">🟢 Low Priority</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <label>Applied Date</label>
        <input
          type="date"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
        />
        <label>Interview Date</label>
        <input
          type="date"
          name="interviewDate"
          value={formData.interviewDate}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
        />
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {editJob ? 'Update Job' : 'Add Job'}
          </button>
          {editJob && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default JobForm;