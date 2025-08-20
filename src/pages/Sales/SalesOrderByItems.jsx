"use client"

import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './SalesOrderByItems.css';

const SalesOrderByItems = () => {
  const dummySalesData = [
    {
      transactionDate: '2024-07-24',
      transactionType: 'SALE-ORDER',
      transactionCode: 'SO-0002',
      itemName: 'Jumbo Roll - Facial Tissue',
      quantity: 5000,
      unitPrice: 262.0,
      taxAmount: 235800.0,
      grossAmount: 1545800.0,
      memo: 'First Order',
      dueDate: '2024-07-24',
      accountName: 'Main Store',
      status: 'Draft',
      entityName: 'Entity A',
      warehouseName: 'Main Store',
      taxableAmount: 1310000.0,
    },
    {
      transactionDate: '2024-07-24',
      transactionType: 'SALE-ORDER',
      transactionCode: 'SO-0002',
      itemName: 'Jumbo Roll - Toilet Tissue',
      quantity: 3500,
      unitPrice: 260.0,
      taxAmount: 163800.0,
      grossAmount: 1073800.0,
      memo: 'Urgent Order',
      dueDate: '2024-07-24',
      accountName: 'Main Store',
      status: 'Draft',
      entityName: 'Entity B',
      warehouseName: 'Main Store',
      taxableAmount: 910000.0,
    },
  ];

  const initialColumns = [
    { key: 'transactionDate', label: 'Transaction Date', visible: true },
    { key: 'transactionType', label: 'Transaction Type', visible: true },
    { key: 'transactionCode', label: 'Transaction Code', visible: true },
    { key: 'itemName', label: 'Item Name', visible: true },
    { key: 'quantity', label: 'Quantity', visible: true },
    { key: 'unitPrice', label: 'Unit Price', visible: true },
    { key: 'taxAmount', label: 'Tax Amount', visible: true },
    { key: 'grossAmount', label: 'Gross Amount', visible: true },
    { key: 'memo', label: 'Memo', visible: true },
    { key: 'dueDate', label: 'Due Date', visible: true },
    { key: 'accountName', label: 'Account Name', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'entityName', label: 'Entity Name', visible: true },
    { key: 'warehouseName', label: 'Warehouse Name', visible: true },
    { key: 'taxableAmount', label: 'Taxable Amount', visible: true },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [filteredData, setFilteredData] = useState(dummySalesData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setFilteredData(dummySalesData);
  }, []);

  const handleColumnVisibility = (key) => {
    setColumns(columns.map(col =>
      col.key === key ? { ...col, visible: !col.visible } : col
    ));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const tableColumns = columns.filter(col => col.visible).map(col => col.label);
    const tableRows = filteredData.map(order =>
      columns.filter(col => col.visible).map(col => order[col.key])
    );

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
    });

    doc.save('sales-order-by-items.pdf');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  if (!filteredData || filteredData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="table-container">
      <h3>Sales Order by Items</h3>
      <div className="filter-controls">
        <button onClick={handleDownloadPDF}>Download as PDF</button>

        {/* Filter Button + Dropdown */}
        <div className="filter-button-container">
          <button className="filter-btn" onClick={toggleDropdown}>
            Filter Columns
          </button>
          {isDropdownOpen && (
            <div className="filter-dropdown">
              {columns.map(col => (
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

      {/* Table rendering */}
      <table>
        <thead>
          <tr>
            {columns.filter(col => col.visible).map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((order, index) => (
            <tr key={index}>
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

export default SalesOrderByItems;
