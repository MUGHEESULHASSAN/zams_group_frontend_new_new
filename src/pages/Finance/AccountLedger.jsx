"use client"

import { useState } from "react"
import "./AccountLedger.css"

const AccountLedger = () => {
  const [selectedAccount, setSelectedAccount] = useState("")
  const [dateRange, setDateRange] = useState("Last 6 Months")
  const [fromDate, setFromDate] = useState("2025-02-24")
  const [toDate, setToDate] = useState("2025-08-23")

  // Sample data - replace with actual data
  const transactions = [
    // Add transaction data here when available
  ]

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value)
  }

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value)
    // Update date range based on selection
    const today = new Date()
    const from = new Date()

    switch (e.target.value) {
      case "Last 6 Months":
        from.setMonth(today.getMonth() - 6)
        break
      case "Last 3 Months":
        from.setMonth(today.getMonth() - 3)
        break
      case "Last Year":
        from.setFullYear(today.getFullYear() - 1)
        break
      default:
        from.setMonth(today.getMonth() - 6)
    }

    setFromDate(from.toISOString().split("T")[0])
    setToDate(today.toISOString().split("T")[0])
  }

  const handleDownload = () => {
    console.log("Download report")
  }

  const handleExport = () => {
    console.log("Export report")
  }

  return (
    <div className="account-ledger">
      {/* Top Controls */}
      <div className="ledger-controls">
        <div className="control-group">
          <label htmlFor="account-select" className="control-label">
            Select Account:
          </label>
          <select id="account-select" className="account-select" value={selectedAccount} onChange={handleAccountChange}>
            <option value="">Search</option>
            <option value="cash">Cash Account</option>
            <option value="bank">Bank Account</option>
            <option value="receivables">Accounts Receivable</option>
            <option value="payables">Accounts Payable</option>
          </select>
        </div>

        <div className="control-group">
          <select className="date-range-select" value={dateRange} onChange={handleDateRangeChange}>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Last Year">Last Year</option>
            <option value="Custom">Custom Range</option>
          </select>
        </div>

        <div className="action-buttons">
          <button className="action-btn" onClick={handleDownload} title="Download Report">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          <button className="action-btn" onClick={handleExport} title="Export Report">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Company Header */}
      <div className="company-header">
        <h1 className="company-name">J KHANZ ENTERPRISES</h1>
        <h2 className="report-title">Account Ledger</h2>
        <p className="date-range">
          From: {fromDate} To: {toDate}
        </p>
      </div>

      {/* Ledger Table */}
      <div className="ledger-table-container">
        <table className="ledger-table">
          <thead>
            <tr className="table-header">
              <th>Transaction Date</th>
              <th>Transaction Code</th>
              <th>Memo</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Running Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No transactions found for the selected criteria
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr key={index} className="table-row">
                  <td>{transaction.date}</td>
                  <td>{transaction.code}</td>
                  <td>{transaction.memo}</td>
                  <td>{transaction.debit}</td>
                  <td>{transaction.credit}</td>
                  <td>{transaction.balance}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccountLedger
