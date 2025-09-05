import React, { useState } from "react";
import "./CreateAccountingPeriod.css";

const CreateAccountingPeriod = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    parent: "",
    starting: "",
    ending: "",
    lockedPeriod: false,
    year: false,
    quarter: false,
    month: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Created Accounting Period:", formData);
    if (onBack) onBack();
  };

  return (
    <div className="create-accounting-period-page">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <h2>Create Accounting Period</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Name *
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Parent
          <input
            type="text"
            name="parent"
            value={formData.parent}
            onChange={handleChange}
          />
        </label>

        <label>
          Starting *
          <input
            type="date"
            name="starting"
            value={formData.starting}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Ending *
          <input
            type="date"
            name="ending"
            value={formData.ending}
            onChange={handleChange}
            required
          />
        </label>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="lockedPeriod"
              checked={formData.lockedPeriod}
              onChange={handleChange}
            />
            Locked Period
          </label>
          <label>
            <input
              type="checkbox"
              name="year"
              checked={formData.year}
              onChange={handleChange}
            />
            Year
          </label>
          <label>
            <input
              type="checkbox"
              name="quarter"
              checked={formData.quarter}
              onChange={handleChange}
            />
            Quarter
          </label>
          <label>
            <input
              type="checkbox"
              name="month"
              checked={formData.month}
              onChange={handleChange}
            />
            Month
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onBack}
          >
            Cancel
          </button>
          <button type="submit" className="create-btn">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountingPeriod;
