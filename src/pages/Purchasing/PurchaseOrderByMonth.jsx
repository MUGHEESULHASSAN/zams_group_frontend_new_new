"use client";

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PurchaseOrderByMonth = () => {
  const dummyData = [
    {
      month: "July 2024",
      transactionCode: "PO-0002",
      itemName: "Kraft Paper - Raw Material",
      quantity: 8000,
      unitPrice: 150.0,
      taxAmount: 180000.0,
      grossAmount: 1180000.0,
      memo: "First Purchase",
      accountName: "Supplier A",
      status: "Open",
    },
    {
      month: "July 2024",
      transactionCode: "PO-0003",
      itemName: "Packaging Material",
      quantity: 4000,
      unitPrice: 120.0,
      taxAmount: 96000.0,
      grossAmount: 576000.0,
      memo: "Urgent Stock",
      accountName: "Supplier B",
      status: "Draft",
    },
  ];

  const initialColumns = [
    { key: "month", label: "Month", visible: true },
    { key: "transactionCode", label: "Purchase Code", visible: true },
    { key: "itemName", label: "Item Name", visible: true },
    { key: "quantity", label: "Quantity", visible: true },
    { key: "unitPrice", label: "Unit Price", visible: true },
    { key: "taxAmount", label: "Tax Amount", visible: true },
    { key: "grossAmount", label: "Gross Amount", visible: true },
    { key: "memo", label: "Memo", visible: true },
    { key: "accountName", label: "Account Name", visible: true },
    { key: "status", label: "Status", visible: true },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [filteredData, setFilteredData] = useState(dummyData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleColumnVisibility = (key) => {
    setColumns(
      columns.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumns = columns.filter((col) => col.visible).map((col) => col.label);
    const tableRows = filteredData.map((order) =>
      columns.filter((col) => col.visible).map((col) => order[col.key])
    );

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
    });

    doc.save("purchase-order-by-month.pdf");
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="table-container" style={{ overflowX: "auto", padding: "20px" }}>
      <h3>Purchase Order by Month</h3>

      <div className="filter-controls">
        <button onClick={handleDownloadPDF}>Download as PDF</button>

        <div className="filter-button-container">
          <button className="filter-btn" onClick={toggleDropdown}>Filter Columns</button>
          {isDropdownOpen && (
            <div className="filter-dropdown">
              {columns.map((col) => (
                <div key={col.key}>
                  <input
                    type="checkbox"
                    checked={col.visible}
                    onChange={() => handleColumnVisibility(col.key)}
                  />
                  <label>{col.label}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {columns.filter(col => col.visible).map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((order, idx) => (
            <tr key={idx}>
              {columns.filter(col => col.visible).map(col => (
                <td key={col.key}>{order[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrderByMonth;
