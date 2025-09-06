"use client"
import { useState } from "react"
import AddEditAccountModal from "../Finance/AddEditAccountModal"
import "./RegionManagement.css"

const TaxControlAccountManagement = ({ onBack }) => {
  const [showModal, setShowModal] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Sample tax control account data based on the image
  const [accounts, setAccounts] = useState([
    {
      id: 282,
      accountNumber: "10011102",
      description: "ADVANCE TO EMPLOYEES",
      isInactive: false,
      name: "ADVANCE TO EMPLOYEES",
      typeName: "Current Asset",
      subsidiaryId: "",
      taxAccountType: "Sale",
      nexusId: 5,
    },
    {
      id: 104,
      accountNumber: "20010705",
      description: "GST ON SALES",
      isInactive: "N",
      name: "GST ON SALES",
      typeName: "Current Liability",
      subsidiaryId: "",
      taxAccountType: "Sale",
      nexusId: 5,
    },
    {
      id: 354,
      accountNumber: "10011303",
      description: "GST ON PURCHASES",
      isInactive: false,
      name: "GST ON PURCHASES",
      typeName: "Current Asset",
      subsidiaryId: "",
      taxAccountType: "Purchase",
      nexusId: "",
    },
    {
      id: 296,
      accountNumber: "20010703",
      description: "ADVANCE INCOME TAX PAYABLE",
      isInactive: false,
      name: "ADVANCE INCOME TAX PAYABLE",
      typeName: "Current Liability",
      subsidiaryId: "",
      taxAccountType: "Sale",
      nexusId: "",
    },
  ])

  const handleCreate = () => {
    setEditingAccount(null)
    setShowModal(true)
  }

  const handleEdit = (account) => {
    setEditingAccount(account)
    setShowModal(true)
  }

  const handleSave = (accountData) => {
    if (editingAccount) {
      setAccounts(accounts.map((acc) => (acc.id === editingAccount.id ? { ...acc, ...accountData } : acc)))
    } else {
      const newAccount = {
        id: Math.max(...accounts.map((a) => a.id)) + 1,
        ...accountData,
      }
      setAccounts([...accounts, newAccount])
    }
    setShowModal(false)
  }

  const handleSearch = () => {
    // Search functionality would be implemented here
    console.log("Searching for:", searchTerm)
  }

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm),
  )

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Tax Control Account</h1>
        <div className="header-left">
          <button className="create-btn" onClick={handleCreate}>
            <span className="plus-icon">+</span>
            Add
          </button>
        </div>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search: All Text Columns"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-dropdown">
            <span className="search-icon">🔍</span>
          </button>
          <button className="actions-btn">Actions ▼</button>
          <button className="reset-btn">Reset</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Edit</th>
              <th>Account Id</th>
              <th>Account Number</th>
              <th>Description</th>
              <th>Is Inactive</th>
              <th>Name</th>
              <th>Type Name</th>
              <th>Subsidiary Id</th>
              <th>Tax Account Type</th>
              <th>Nexus Id</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account) => (
              <tr key={account.id}>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(account)}>
                    ✏️
                  </button>
                </td>
                <td>{account.id}</td>
                <td>{account.accountNumber}</td>
                <td>{account.description}</td>
                <td>{account.isInactive === "N" ? "N" : account.isInactive ? "Y" : ""}</td>
                <td>{account.name}</td>
                <td>{account.typeName}</td>
                <td>{account.subsidiaryId}</td>
                <td>{account.taxAccountType}</td>
                <td>{account.nexusId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <span>Total {filteredAccounts.length}</span>
        </div>
      </div>

      {onBack && (
        <button className="back-btn" onClick={onBack}>
          ← Back to Setup Taxes
        </button>
      )}

      {showModal && (
        <AddEditAccountModal account={editingAccount} onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  )
}

export default TaxControlAccountManagement
