"use client"
import { useState } from "react"
import "./Reports.css"
import AccountLedger from "./AccountLedger"

const Reports = () => {
  const [currentView, setCurrentView] = useState("reports")

  const reportCards = [
    {
      id: "account-ledger",
      title: "Account Ledger",
      description: "Click to view details",
      onClick: () => setCurrentView("account-ledger"),
    },
    {
      id: "trial-balance",
      title: "Trial Balance",
      description: "Click to view details",
      onClick: () => console.log("Navigate to Trial Balance"),
    },
    {
      id: "balance-sheet",
      title: "Balance Sheet",
      description: "Click to view details",
      onClick: () => console.log("Navigate to Balance Sheet"),
    },
    {
      id: "profit-loss",
      title: "Profit Loss Statement",
      description: "Click to view details",
      onClick: () => console.log("Navigate to Profit Loss Statement"),
    },
    {
      id: "cash-bank-summary",
      title: "Cash/Bank Summary",
      description: "Click to view details",
      onClick: () => console.log("Navigate to Cash/Bank Summary"),
    },
  ]

  if (currentView === "account-ledger") {
    return (
      <div>
        <button className="back-button" onClick={() => setCurrentView("reports")}>
          ← Back to Reports
        </button>
        <AccountLedger />
      </div>
    )
  }

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1 className="reports-title">Accounts</h1>
      </div>

      <div className="reports-grid">
        {reportCards.map((report) => (
          <div
            key={report.id}
            className="report-card"
            onClick={report.onClick}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                report.onClick()
              }
            }}
          >
            <h2 className="report-card-title">{report.title}</h2>
            <p className="report-card-description">{report.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reports
