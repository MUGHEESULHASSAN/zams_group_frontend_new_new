import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GoodsReceivedNotes.css";

const GoodsReceivedNotes = () => {
  const navigate = useNavigate();

  const allColumns = [
    { key: "edit", label: "Edit" },
    { key: "view", label: "View" },
    { key: "transactionDate", label: "Transaction Date" },
    { key: "transactionNumber", label: "GRN Number" },
    { key: "vendor", label: "Vendor" },
    { key: "location", label: "Location" },
    { key: "createdFrom", label: "Created From" },
    { key: "status", label: "Status" },
    { key: "documentStatus", label: "Document Status" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.key)
  );
  const [showFilter, setShowFilter] = useState(false);

  const grns = [
    {
      transactionDate: "2025-09-01",
      transactionNumber: "GRN001",
      vendor: "ABC Suppliers",
      location: "Warehouse A",
      createdFrom: "Purchase Order #2001",
      status: "Open",
      documentStatus: "Draft",
    },
    {
      transactionDate: "2025-09-02",
      transactionNumber: "GRN002",
      vendor: "XYZ Traders",
      location: "Warehouse B",
      createdFrom: "Purchase Order #2002",
      status: "Closed",
      documentStatus: "Submitted",
    },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };

  return (
    <div className="grn-page">
      <div className="actions">
        <button
          className="btn create-btn"
          onClick={() => navigate("/create-goods-received-note")}
        >
          + Create GRN
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
        <table className="grn-table">
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
            {grns.map((grn, idx) => (
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
                {visibleColumns.includes("transactionDate") && (
                  <td>{grn.transactionDate}</td>
                )}
                {visibleColumns.includes("transactionNumber") && (
                  <td>{grn.transactionNumber}</td>
                )}
                {visibleColumns.includes("vendor") && <td>{grn.vendor}</td>}
                {visibleColumns.includes("location") && (
                  <td>{grn.location}</td>
                )}
                {visibleColumns.includes("createdFrom") && (
                  <td>{grn.createdFrom}</td>
                )}
                {visibleColumns.includes("status") && <td>{grn.status}</td>}
                {visibleColumns.includes("documentStatus") && (
                  <td>{grn.documentStatus}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoodsReceivedNotes;
