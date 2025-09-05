"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./BankCashReceiptVoucher.css"

const BankCashReceiptVoucher = () => {
  const navigate = useNavigate()

  const allColumns = [
    { key: "edit", label: "Edit" },
    { key: "view", label: "View" },
    { key: "report", label: "Report" },
    { key: "transactionNumber", label: "Transaction Number" },
    { key: "account", label: "Account" },
    { key: "transactionDate", label: "Transaction Date" },
    { key: "createdFrom", label: "Created From" },
    { key: "memo", label: "Memo" },
    { key: "status", label: "Status" },
    { key: "grossAmount", label: "Gross Amount" },
  ]

  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.key)
  )
  const [showFilter, setShowFilter] = useState(false)

  const vouchers = [
    {
      transactionNumber: "BCRV001",
      account: "Bank B",
      transactionDate: "2025-09-01",
      createdFrom: "Invoice #789",
      memo: "Customer payment",
      status: "Approved",
      grossAmount: 25000,
    },
    {
      transactionNumber: "BCRV002",
      account: "Cash",
      transactionDate: "2025-09-03",
      createdFrom: "Sales Order #56",
      memo: "Cash received",
      status: "Draft",
      grossAmount: 12000,
    },
  ]

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key)
        ? prev.filter((col) => col !== key)
        : [...prev, key]
    )
  }

  return (
    <div className="bcrv-page">
      <div className="actions">
        <button
          className="btn create-btn"
          onClick={() => navigate("/create-bank-cash-receipt-voucher")}
        >
          + Create Voucher
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
        <table className="bcrv-table">
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
            {vouchers.map((voucher, idx) => (
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
                {visibleColumns.includes("report") && (
                  <td>
                    <button className="small-btn">📄</button>
                  </td>
                )}
                {visibleColumns.includes("transactionNumber") && (
                  <td>{voucher.transactionNumber}</td>
                )}
                {visibleColumns.includes("account") && (
                  <td>{voucher.account}</td>
                )}
                {visibleColumns.includes("transactionDate") && (
                  <td>{voucher.transactionDate}</td>
                )}
                {visibleColumns.includes("createdFrom") && (
                  <td>{voucher.createdFrom}</td>
                )}
                {visibleColumns.includes("memo") && <td>{voucher.memo}</td>}
                {visibleColumns.includes("status") && <td>{voucher.status}</td>}
                {visibleColumns.includes("grossAmount") && (
                  <td>{voucher.grossAmount}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BankCashReceiptVoucher
