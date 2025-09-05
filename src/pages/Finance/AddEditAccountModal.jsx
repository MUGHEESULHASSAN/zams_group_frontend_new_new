"use client"

import { useState, useEffect } from "react"
import "./AddEditAccountModal.css"

const AddEditAccountModal = ({ account, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    accountNo: "",
    description: "",
    parentAccount: "",
    accountType: "",
    subType: "", // Added subType field
    taxAccountType: "",
    isSummary: false,
    restrictedToSubsidiarie: "",
  })

  const parentAccountMapping = {
    "Cash and Bank": {
      accountType: "Assets",
      subType: "Bank",
      codePrefix: "100101",
    },
    "Accounts Receivable": {
      accountType: "Assets",
      subType: "Current Assets",
      codePrefix: "100102",
    },
    Inventory: {
      accountType: "Assets",
      subType: "Current Assets",
      codePrefix: "100103",
    },
    "Fixed Assets": {
      accountType: "Assets",
      subType: "Non-Current Assets",
      codePrefix: "100200",
    },
    "Accounts Payable": {
      accountType: "Liabilities",
      subType: "Current Liabilities",
      codePrefix: "200101",
    },
    "Long Term Debt": {
      accountType: "Liabilities",
      subType: "Non-Current Liabilities",
      codePrefix: "200200",
    },
    "Common Stock": {
      accountType: "Equity",
      subType: "Equity",
      codePrefix: "300101",
    },
    "Retained Earnings": {
      accountType: "Equity",
      subType: "Equity",
      codePrefix: "300102",
    },
    "Sales Revenue": {
      accountType: "Revenue",
      subType: "Operating Revenue",
      codePrefix: "400101",
    },
    "Cost of Goods Sold": {
      accountType: "Expenses",
      subType: "Cost of Sales",
      codePrefix: "500101",
    },
    "Operating Expenses": {
      accountType: "Expenses",
      subType: "Expenses",
      codePrefix: "500200",
    },
  }

  const generateAccountCode = (prefix) => {
    // Generate a random 2-digit suffix for demo purposes
    const suffix = Math.floor(Math.random() * 99) + 1
    return `${prefix}${suffix.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name || "",
        accountNo: account.accountNo || "",
        description: account.description || "",
        parentAccount: account.parentAccount || "",
        accountType: account.accountType || "",
        subType: account.subType || "", // Added subType
        taxAccountType: account.taxAccountType || "",
        isSummary: account.isSummary || false,
        restrictedToSubsidiarie: account.restrictedToSubsidiarie || "",
      })
    }
  }, [account])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "parentAccount" && value && parentAccountMapping[value]) {
      const mapping = parentAccountMapping[value]
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        accountType: mapping.accountType,
        subType: mapping.subType,
        accountNo: generateAccountCode(mapping.codePrefix),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add/ Edit Account</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="account-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <span className="required-asterisk">*</span> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountNo">
                <span className="required-asterisk">*</span> Account Code
              </label>
              <input
                type="text"
                id="accountNo"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="parentAccount">
                <span className="required-asterisk">*</span> Parent Account - Level 2
              </label>
              <select
                id="parentAccount"
                name="parentAccount"
                value={formData.parentAccount}
                onChange={handleInputChange}
              >
                <option value="">Select Parent Account</option>
                <option value="Cash and Bank">Cash and Bank</option>
                <option value="Accounts Receivable">Accounts Receivable</option>
                <option value="Inventory">Inventory</option>
                <option value="Fixed Assets">Fixed Assets</option>
                <option value="Accounts Payable">Accounts Payable</option>
                <option value="Long Term Debt">Long Term Debt</option>
                <option value="Common Stock">Common Stock</option>
                <option value="Retained Earnings">Retained Earnings</option>
                <option value="Sales Revenue">Sales Revenue</option>
                <option value="Cost of Goods Sold">Cost of Goods Sold</option>
                <option value="Operating Expenses">Operating Expenses</option>
              </select>
            </div>
            <div className="form-group checkbox-group">
              <label>Is Group</label>
              <input type="checkbox" name="isSummary" checked={formData.isSummary} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="accountType">
                <span className="required-asterisk">*</span> Account Type - Level 1
              </label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Account Type</option>
                <option value="Assets">Assets</option>
                <option value="Liabilities">Liabilities</option>
                <option value="Equity">Equity</option>
                <option value="Revenue">Revenue</option>
                <option value="Expenses">Expenses</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="subType">
                <span className="required-asterisk">*</span> Sub Type - Level 3
              </label>
              <select id="subType" name="subType" value={formData.subType} onChange={handleInputChange} required>
                <option value="">Select Sub Type</option>
                <option value="Current Assets">Current Assets</option>
                <option value="Non-Current Assets">Non-Current Assets</option>
                <option value="Bank">Bank</option>
                <option value="Current Liabilities">Current Liabilities</option>
                <option value="Non-Current Liabilities">Non-Current Liabilities</option>
                <option value="Equity">Equity</option>
                <option value="Operating Revenue">Operating Revenue</option>
                <option value="Cost of Sales">Cost of Sales</option>
                <option value="Expenses">Expenses</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" name="isSummary" checked={formData.isSummary} onChange={handleInputChange} />
                Is Summary
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="taxAccountType">Tax Account Type</label>
              <select
                id="taxAccountType"
                name="taxAccountType"
                value={formData.taxAccountType}
                onChange={handleInputChange}
              >
                <option value="">Select Tax Account Type</option>
                <option value="taxable">Taxable</option>
                <option value="non-taxable">Non-Taxable</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="restrictedToSubsidiarie">Restricted to Subsidiarie</label>
              <select
                id="restrictedToSubsidiarie"
                name="restrictedToSubsidiarie"
                value={formData.restrictedToSubsidiarie}
                onChange={handleInputChange}
              >
                <option value="">Select Subsidiarie</option>
                <option value="main">Main Company</option>
                <option value="subsidiary1">Subsidiary 1</option>
                <option value="subsidiary2">Subsidiary 2</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-back" onClick={onClose}>
              ← Back
            </button>
            <button type="submit" className="btn-create">
              <span className="create-icon">+</span>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditAccountModal
