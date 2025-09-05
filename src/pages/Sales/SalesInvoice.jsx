// SalesInvoice.jsx
import React, { useState } from "react";
import "./SalesInvoice.css";
import CreateSaleInvoice from "./CreateSaleInvoice"; // import your create page

const SalesInvoice = () => {
  const allColumns = [
    { key: "invoiceCode", label: "Invoice Code" },
    { key: "invoiceDate", label: "Invoice Date" },
    { key: "customer", label: "Customer" },
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
  const [showCreatePage, setShowCreatePage] = useState(false); // state to toggle pages

  const invoices = [
    {
      invoiceCode: "INV001",
      invoiceDate: "2025-09-01",
      customer: "John Doe",
      dueDate: "2025-09-10",
      totalAmount: "$500",
      status: "Open",
      payment: "$200",
      paymentStatus: "Partial",
    },
    {
      invoiceCode: "INV002",
      invoiceDate: "2025-09-02",
      customer: "Jane Smith",
      dueDate: "2025-09-12",
      totalAmount: "$1000",
      status: "Closed",
      payment: "$1000",
      paymentStatus: "Paid",
    },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };

  // If create page is open → show CreateSaleInvoice component
  if (showCreatePage) {
    return <CreateSaleInvoice onBack={() => setShowCreatePage(false)} />;
  }

  // Otherwise → show invoice list
  return (
    <div className="sales-invoice-page">
      <div className="actions">
        <button
          className="btn create-btn"
          onClick={() => setShowCreatePage(true)}
        >
          + Create New Sale Invoice
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
            {invoices.map((invoice, idx) => (
              <tr key={idx}>
                {allColumns
                  .filter((col) => visibleColumns.includes(col.key))
                  .map((col) => (
                    <td key={col.key}>{invoice[col.key]}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesInvoice;
