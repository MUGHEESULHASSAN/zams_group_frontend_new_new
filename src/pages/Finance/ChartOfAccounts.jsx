"use client"

import { useState } from "react"
import AccountSidebar from "./AccountSidebar.jsx"
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
    <div className="chart-of-accounts">
      <div className="main-content">
        {/* Sidebar */}
        <AccountSidebar />

        {/* Content Area */}
        <div className="content-area">
          <div className="content-header">
            <h1 className="page-title">Control Accounts</h1>
          </div>
          <hr className="divider" />
          <div className="search-section">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search: All Text Columns"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
             <button className="btn-add-account" onClick={handleAddAccount}>
              + Add Account
            </button>
          </div>

          <AccountTable searchTerm={searchTerm} onEditAccount={handleEditAccount} onAddAccount={handleAddAccount} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddEditAccountModal account={selectedAccount} onClose={handleCloseModal} onSave={handleSaveAccount} />
      )}
    </div>
  )
}

export default ChartOfAccounts
