"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FixedAssetRegister.css";

const FixedAssetRegister = () => {
  const navigate = useNavigate();

  const allColumns = [
    { key: "edit", label: "Edit" },
    { key: "view", label: "View" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "assetStatus", label: "Asset Status" },
    { key: "depreciationRate", label: "Depreciation Rate (%)" },
    { key: "totalPurchase", label: "Total Purchase" },
    { key: "openingAcquisitionCost", label: "Opening Acquisition Cost" },
    { key: "openingDepreciationCost", label: "Opening Depreciation Cost" },
    { key: "totalAcquisitionCost", label: "Total Acquisition Cost" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.key)
  );
  const [showFilter, setShowFilter] = useState(false);

  const assets = [
    {
      name: "Office Building",
      description: "Headquarters main building",
      assetStatus: "Active",
      depreciationRate: 5,
      totalPurchase: 10000000,
      openingAcquisitionCost: 8000000,
      openingDepreciationCost: 2000000,
      totalAcquisitionCost: 10000000,
    },
    {
      name: "Company Car",
      description: "CEO’s official car",
      assetStatus: "In Use",
      depreciationRate: 15,
      totalPurchase: 2500000,
      openingAcquisitionCost: 2000000,
      openingDepreciationCost: 500000,
      totalAcquisitionCost: 2500000,
    },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key)
        ? prev.filter((col) => col !== key)
        : [...prev, key]
    );
  };

  return (
    <div className="far-page">
      <div className="actions">
        <button
          className="btn create-btn"
          onClick={() => navigate("/create-fixed-asset")}
        >
          + Create Asset
        </button>

        <div className="filter-container">
          <button
            className="btn filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter Columns
          </button>
          {showFilter && (
            <div className="filter-dropdown">
              {allColumns.map((col) => (
                <label key={col.key}>
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => toggleColumn(col.key)}
                  />
                  {col.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="table-container">
        <table className="far-table">
          <thead>
            <tr>
              {allColumns
                .filter((col) => visibleColumns.includes(col.key))
                .map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, idx) => (
              <tr key={idx}>
                {visibleColumns.includes("edit") && (
                  <td>
                    <button className="small-btn">✏️</button>
                  </td>
                )}
                {visibleColumns.includes("view") && (
                  <td>
                    <button className="small-btn">👁️</button>
                  </td>
                )}
                {visibleColumns.includes("name") && <td>{asset.name}</td>}
                {visibleColumns.includes("description") && (
                  <td>{asset.description}</td>
                )}
                {visibleColumns.includes("assetStatus") && (
                  <td>{asset.assetStatus}</td>
                )}
                {visibleColumns.includes("depreciationRate") && (
                  <td>{asset.depreciationRate}%</td>
                )}
                {visibleColumns.includes("totalPurchase") && (
                  <td>{asset.totalPurchase.toLocaleString()}</td>
                )}
                {visibleColumns.includes("openingAcquisitionCost") && (
                  <td>{asset.openingAcquisitionCost.toLocaleString()}</td>
                )}
                {visibleColumns.includes("openingDepreciationCost") && (
                  <td>{asset.openingDepreciationCost.toLocaleString()}</td>
                )}
                {visibleColumns.includes("totalAcquisitionCost") && (
                  <td>{asset.totalAcquisitionCost.toLocaleString()}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FixedAssetRegister;
