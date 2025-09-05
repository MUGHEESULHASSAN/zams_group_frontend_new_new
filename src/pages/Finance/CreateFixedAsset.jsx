"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateFixedAsset.css";

const CreateFixedAsset = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    assetCode: "",
    assetName: "",
    assetStatus: "Active",
    department: "",
    assignee: "",
    isSaleAllowed: false,
    category: "",
    unitsType: "",
    stockUnit: "",
    locationName: "",
    isPurchaseAllowed: false,
    project: "",
    description: "",
    // Properties
    depreciationRate: "",
    assetAccount: "",
    depExpenseAccount: "",
    depAccumulatedAccount: "",
    depreciationStartDate: "",
    assetOpeningDate: "",
    openingAcquisitionCost: "",
    totalPurchase: "",
    revaluationAmount: "",
    // Calculation
    totalAcquisitionCost: "",
    totalDepreciationCost: "",
    bookValue: "",
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
    console.log("New Asset Created:", formData);
    navigate("/fixed-asset-register");
  };

  return (
    <div className="create-asset-page">
      <button className="back-btn" onClick={() => navigate("/fixed-asset-register")}>
        ← Back
      </button>

      <h2>Create Fixed Asset</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Asset Information</h3>

          <label>
            Asset Code
            <input
              type="text"
              name="assetCode"
              value={formData.assetCode}
              onChange={handleChange}
            />
          </label>

          <label>
            Asset Name *
            <input
              type="text"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Asset Status *
            <select
              name="assetStatus"
              value={formData.assetStatus}
              onChange={handleChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Sale">Sale</option>
              <option value="Writeoff">Writeoff</option>
            </select>
          </label>

          <label>
            Department
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </label>

          <label>
            Assignee
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isSaleAllowed"
              checked={formData.isSaleAllowed}
              onChange={handleChange}
            />
            Is Sale Allowed
          </label>

          <label>
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </label>

          <label>
            Units Type *
            <input
              type="text"
              name="unitsType"
              value={formData.unitsType}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Stock Unit *
            <input
              type="text"
              name="stockUnit"
              value={formData.stockUnit}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Location Name *
            <input
              type="text"
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isPurchaseAllowed"
              checked={formData.isPurchaseAllowed}
              onChange={handleChange}
            />
            Is Purchase Allowed
          </label>

          <label>
            Project
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-section">
          <h3>Properties</h3>

          <label>
            Depreciation Rate
            <input
              type="number"
              name="depreciationRate"
              value={formData.depreciationRate}
              onChange={handleChange}
            />
          </label>

          <label>
            Asset Account
            <input
              type="text"
              name="assetAccount"
              value={formData.assetAccount}
              onChange={handleChange}
            />
          </label>

          <label>
            Dep Expense Account
            <input
              type="text"
              name="depExpenseAccount"
              value={formData.depExpenseAccount}
              onChange={handleChange}
            />
          </label>

          <label>
            Dep Accumulated Account
            <input
              type="text"
              name="depAccumulatedAccount"
              value={formData.depAccumulatedAccount}
              onChange={handleChange}
            />
          </label>

          <label>
            Depreciation Start Date
            <input
              type="date"
              name="depreciationStartDate"
              value={formData.depreciationStartDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Asset Opening Date
            <input
              type="date"
              name="assetOpeningDate"
              value={formData.assetOpeningDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Opening Acquisition Cost
            <input
              type="number"
              name="openingAcquisitionCost"
              value={formData.openingAcquisitionCost}
              onChange={handleChange}
            />
          </label>

          <label>
            Total Purchase
            <input
              type="number"
              name="totalPurchase"
              value={formData.totalPurchase}
              onChange={handleChange}
            />
          </label>

          <label>
            Revaluation Amount
            <input
              type="number"
              name="revaluationAmount"
              value={formData.revaluationAmount}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-section">
          <h3>Calculation</h3>

          <label>
            Total Acquisition Cost
            <input
              type="number"
              name="totalAcquisitionCost"
              value={formData.totalAcquisitionCost}
              onChange={handleChange}
            />
          </label>

          <label>
            Total Depreciation Cost
            <input
              type="number"
              name="totalDepreciationCost"
              value={formData.totalDepreciationCost}
              onChange={handleChange}
            />
          </label>

          <label>
            Book Value
            <input
              type="number"
              name="bookValue"
              value={formData.bookValue}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/fixed-asset-register")}
          >
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFixedAsset;
