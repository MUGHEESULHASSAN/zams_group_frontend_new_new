// PurchaseInvoice.jsx
import React, { useState } from "react";
import "./PurchaseInvoice.css"; // reuse the same css
import CreatePurchaseInvoice from "./CreatePurchaseInvoice"; // import your create page

const PurchaseInvoice = () => {
  const allColumns = [
    { key: "purchaseCode", label: "Purchase Code" },
    { key: "purchaseDate", label: "Purchase Date" },
    { key: "vendor", label: "Vendor" },
    { key: "dueDate", label: "Due Date" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "status", label: "Status" },
    { key: "payment", label: "Payment" },
    { key: "paymentStatus", label: "Payment Status" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.key)
  );
  const [showFilter, setShowFilter] = useState(false);
  const [showCreatePage, setShowCreatePage] = useState(false);

  const purchases = [
    {
      purchaseCode: "PUR001",
      purchaseDate: "2025-09-01",
      vendor: "ABC Suppliers",
      dueDate: "2025-09-15",
      totalAmount: "$1200",
      status: "Open",
      payment: "$600",
      paymentStatus: "Partial",
    },
    {
      purchaseCode: "PUR002",
      purchaseDate: "2025-09-02",
      vendor: "XYZ Traders",
      dueDate: "2025-09-20",
      totalAmount: "$2000",
      status: "Closed",
      payment: "$2000",
      paymentStatus: "Paid",
    },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };

  if (showCreatePage) {
    return <CreatePurchaseInvoice onBack={() => setShowCreatePage(false)} />;
  }

  return (
    <div className="sales-invoice-page">
      <div className="actions">
        <button
          className="btn create-btn"
          onClick={() => setShowCreatePage(true)}
        >
          + Create New Purchase Invoice
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
            {purchases.map((purchase, idx) => (
              <tr key={idx}>
                {allColumns
                  .filter((col) => visibleColumns.includes(col.key))
                  .map((col) => (
                    <td key={col.key}>{purchase[col.key]}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseInvoice;
