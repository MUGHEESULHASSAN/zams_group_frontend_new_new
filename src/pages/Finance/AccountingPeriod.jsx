import React, { useState } from "react";
import "./AccountingPeriod.css"; // create a CSS file for styling
import CreateAccountingPeriod from "./CreateAccountingPeriod"; // new page for creating a year

const AccountingPeriod = () => {
  const allColumns = [
    { key: "year", label: "Year" },
    { key: "starting", label: "Starting" },
    { key: "ending", label: "Ending" },
    { key: "lockedPeriod", label: "Locked Period" },
    { key: "edit", label: "Edit" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.key)
  );
  const [showFilter, setShowFilter] = useState(false);
  const [showCreatePage, setShowCreatePage] = useState(false);

  const periods = [
    {
      year: "2025",
      starting: "2025-01-01",
      ending: "2025-12-31",
      lockedPeriod: "No",
    },
    {
      year: "2024",
      starting: "2024-01-01",
      ending: "2024-12-31",
      lockedPeriod: "Yes",
    },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };

  if (showCreatePage) {
    return <CreateAccountingPeriod onBack={() => setShowCreatePage(false)} />;
  }

  return (
    <div className="accounting-period-page">
      <div className="actions">
        <button
          className="btn create-btn"
          onClick={() => setShowCreatePage(true)}
        >
          + Create New Year
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
        <table>
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
            {periods.map((period, idx) => (
              <tr key={idx}>
                {visibleColumns.includes("year") && <td>{period.year}</td>}
                {visibleColumns.includes("starting") && (
                  <td>{period.starting}</td>
                )}
                {visibleColumns.includes("ending") && <td>{period.ending}</td>}
                {visibleColumns.includes("lockedPeriod") && (
                  <td>{period.lockedPeriod}</td>
                )}
                {visibleColumns.includes("edit") && (
                  <td>
                    <button className="btn edit-btn">Edit</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountingPeriod;
