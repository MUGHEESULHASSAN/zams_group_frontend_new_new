"use client"

import { useState } from "react"
import AccountTable from "./AccountTable.jsx"
import AddEditAccountModal from "./AddEditAccountModal.jsx"
import "./ChartOfAccounts.css"

const ChartOfAccounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddAccount = () => {
    setSelectedAccount(null)
    setIsModalOpen(true)
  }

  const handleEditAccount = (account) => {
    setSelectedAccount(account)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAccount(null)
  }

  const handleSaveAccount = (accountData) => {
    console.log("Saving account:", accountData)
    handleCloseModal()
  }

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <h1 className="page-title">Account Details</h1>

          {/* Action Bar */}
          <div className="action-bar">
            <div className="action-buttons">
              <button onClick={handleAddAccount} className="btn-primary">
                <span className="plus-icon">+</span>
                Create Account
              </button>
              <button className="btn-secondary">
                <span>↑</span>
                Import
              </button>
              <button className="btn-secondary">
                <span>↓</span>
                Export
              </button>
            </div>

            <div className="action-controls">
              <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="btn-secondary">
                <span>⚙</span>
                Filters
              </button>
              <button className="btn-icon">☰</button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <AccountTable searchTerm={searchTerm} onEditAccount={handleEditAccount} onAddAccount={handleAddAccount} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddEditAccountModal account={selectedAccount} onClose={handleCloseModal} onSave={handleSaveAccount} />
      )}
    </div>
  )
}

export default ChartOfAccounts
