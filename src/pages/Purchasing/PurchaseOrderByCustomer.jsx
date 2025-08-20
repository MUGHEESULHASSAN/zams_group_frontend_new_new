"use client";

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PurchaseOrderByCustomer = () => {
  const dummyPurchaseData = [
    {
      transactionDate: "2024-07-24",
      transactionType: "PURCHASE-ORDER",
      transactionCode: "PO-0002",
      itemName: "Kraft Paper - Raw Material",
      quantity: 8000,
      unitPrice: 150.0,
      taxAmount: 180000.0,
      grossAmount: 1180000.0,
      memo: "First Purchase",
      dueDate: "2024-07-30",
      accountName: "Supplier A",
      status: "Open",
      warehouseName: "Raw Material Store",
      taxableAmount: 1000000.0,
    },
    {
      transactionDate: "2024-07-25",
      transactionType: "PURCHASE-ORDER",
      transactionCode: "PO-0003",
      itemName: "Packaging Material",
      quantity: 4000,
      unitPrice: 120.0,
      taxAmount: 96000.0,
      grossAmount: 576000.0,
      memo: "Urgent Stock",
      dueDate: "2024-07-28",
      accountName: "Supplier B",
      status: "Draft",
      warehouseName: "Packaging Store",
      taxableAmount: 480000.0,
    },
  ];

  const initialColumns = [
    { key: "transactionDate", label: "Transaction Date", visible: true },
    { key: "transactionType", label: "Transaction Type", visible: true },
    { key: "transactionCode", label: "Transaction Code", visible: true },
    { key: "itemName", label: "Item Name", visible: true },
    { key: "quantity", label: "Quantity", visible: true },
    { key: "unitPrice", label: "Unit Price", visible: true },
    { key: "taxAmount", label: "Tax Amount", visible: true },
    { key: "grossAmount", label: "Gross Amount", visible: true },
    { key: "memo", label: "Memo", visible: true },
    { key: "dueDate", label: "Due Date", visible: true },
    { key: "accountName", label: "Account Name", visible: true },
    { key: "status", label: "Status", visible: true },
    { key: "warehouseName", label: "Warehouse Name", visible: true },
    { key: "taxableAmount", label: "Taxable Amount", visible: true },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [filteredData, setFilteredData] = useState(dummyPurchaseData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setFilteredData(dummyPurchaseData);
  }, []);

  const handleColumnVisibility = (key) => {
    setColumns(
      columns.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const tableColumns = columns
      .filter((col) => col.visible)
      .map((col) => col.label);
    const tableRows = filteredData.map((order) =>
      columns.filter((col) => col.visible).map((col) => order[col.key])
    );

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
    });

    doc.save("purchase-order-by-customer.pdf");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  if (!filteredData || filteredData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="table-container">
      <h3>Purchase Order by Customer</h3>

      <div className="filter-controls">
        <button onClick={handleDownloadPDF}>Download as PDF</button>

        {/* Filter Button + Dropdown */}
        <div className="filter-button-container">
          <button className="filter-btn" onClick={toggleDropdown}>
            Filter Columns
          </button>
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
            {columns
              .filter((col) => col.visible)
              .map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((order, index) => (
            <tr key={index}>
              {columns
                .filter((col) => col.visible)
                .map((col) => (
                  <td key={col.key}>{order[col.key]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrderByCustomer;
