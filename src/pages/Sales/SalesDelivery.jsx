import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SalesDelivery.css";

const SalesDelivery = () => {
  const navigate = useNavigate();

  const allColumns = [
    { key: "edit", label: "Edit" },
    { key: "view", label: "View" },
    { key: "transactionDate", label: "Transaction Date" },
    { key: "transactionNumber", label: "Transaction Number" },
    { key: "customer", label: "Customer" },
    { key: "location", label: "Location" },
    { key: "createdFrom", label: "Created From" },
    { key: "status", label: "Status" },
    { key: "documentStatus", label: "Document Status" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.key)
  );
  const [showFilter, setShowFilter] = useState(false);

  const deliveries = [
    {
      transactionDate: "2025-09-01",
      transactionNumber: "DEL001",
      customer: "John Doe",
      location: "Warehouse A",
      createdFrom: "Sales Order #1001",
      status: "Open",
      documentStatus: "Draft",
    },
    {
      transactionDate: "2025-09-02",
      transactionNumber: "DEL002",
      customer: "Jane Smith",
      location: "Warehouse B",
      createdFrom: "Sales Order #1002",
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
    <div className="sales-delivery-page">
      <div className="actions">
        <button
          className="btn create-btn"
          onClick={() => navigate("/create-delivery-challan")}
        >
          + Create Delivery Challan
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
        <table className="delivery-table">
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
            {deliveries.map((delivery, idx) => (
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
                  <td>{delivery.transactionDate}</td>
                )}
                {visibleColumns.includes("transactionNumber") && (
                  <td>{delivery.transactionNumber}</td>
                )}
                {visibleColumns.includes("customer") && (
                  <td>{delivery.customer}</td>
                )}
                {visibleColumns.includes("location") && (
                  <td>{delivery.location}</td>
                )}
                {visibleColumns.includes("createdFrom") && (
                  <td>{delivery.createdFrom}</td>
                )}
                {visibleColumns.includes("status") && (
                  <td>{delivery.status}</td>
                )}
                {visibleColumns.includes("documentStatus") && (
                  <td>{delivery.documentStatus}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesDelivery;
