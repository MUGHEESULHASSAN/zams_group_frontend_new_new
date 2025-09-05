// SalesReturn.jsx
import React, { useState } from "react";
import "./SalesInvoice.css"; // reuse same styles
import CreateSalesReturn from "./CreateSalesReturn"; // create page for sales return

const SalesReturn = () => {
  const allColumns = [
    { key: "returnCode", label: "Return Code" },
    { key: "returnDate", label: "Return Date" },
    { key: "customer", label: "Customer" },
    { key: "dueDate", label: "Due Date" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "status", label: "Status" },
    { key: "refund", label: "Refund" },
    { key: "refundStatus", label: "Refund Status" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.key)
  );
  const [showFilter, setShowFilter] = useState(false);
  const [showCreatePage, setShowCreatePage] = useState(false);

  const returns = [
    {
      returnCode: "RET001",
      returnDate: "2025-09-01",
      customer: "John Doe",
      dueDate: "2025-09-10",
      totalAmount: "$300",
      status: "Open",
      refund: "$150",
      refundStatus: "Partial",
    },
    {
      returnCode: "RET002",
      returnDate: "2025-09-02",
      customer: "Jane Smith",
      dueDate: "2025-09-12",
      totalAmount: "$800",
      status: "Closed",
      refund: "$800",
      refundStatus: "Refunded",
    },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };

  if (showCreatePage) {
    return <CreateSalesReturn onBack={() => setShowCreatePage(false)} />;
  }

  return (
    <div className="sales-invoice-page">
      <div className="actions">
        <button
          className="btn create-btn"
          onClick={() => setShowCreatePage(true)}
        >
          + Create New Sales Return
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
            {returns.map((ret, idx) => (
              <tr key={idx}>
                {allColumns
                  .filter((col) => visibleColumns.includes(col.key))
                  .map((col) => (
                    <td key={col.key}>{ret[col.key]}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReturn;
