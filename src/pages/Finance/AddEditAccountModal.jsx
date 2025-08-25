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
    taxAccountType: "",
    isSummary: false,
    restrictedToSubsidiarie: "",
  })

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name || "",
        accountNo: account.accountNo || "",
        description: account.description || "",
        parentAccount: account.parentAccount || "",
        accountType: account.accountType || "",
        taxAccountType: account.taxAccountType || "",
        isSummary: account.isSummary || false,
        restrictedToSubsidiarie: account.restrictedToSubsidiarie || "",
      })
    }
  }, [account])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
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
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              <span className="required-text">Required</span>
            </div>
            <div className="form-group">
              <label htmlFor="accountNo">Account No</label>
              <input
                type="text"
                id="accountNo"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                required
              />
              <span className="required-text">Required</span>
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
              <label htmlFor="parentAccount">Parent Account</label>
              <select
                id="parentAccount"
                name="parentAccount"
                value={formData.parentAccount}
                onChange={handleInputChange}
              >
                <option value="">Select Parent Account</option>
                <option value="asset">ASSET</option>
                <option value="liability">LIABILITY</option>
                <option value="equity">STOCKHOLDER EQUITY</option>
                <option value="revenue">REVENUE</option>
                <option value="expense">EXPENSE</option>
              </select>
            </div>
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
              <label htmlFor="accountType">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Account Type</option>
                <option value="asset">Asset</option>
                <option value="liability">Liability</option>
                <option value="equity">Equity</option>
                <option value="revenue">Revenue</option>
                <option value="expense">Expense</option>
              </select>
              <span className="required-text">Required</span>
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
              <span className="create-icon">📄</span>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditAccountModal
