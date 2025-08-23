"use client"

import { useState } from "react"
import SearchBar from "../../components/Common/SearchBar"
import DataTable from "../../components/Common/DataTable"
import Modal from "../../components/Common/Modal"
import "./ExpenseEntry.css"

const ExpenseEntry = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    transactionCode: "",
    transactionDate: "",
    cashBank: "",
    referenceNo: "",
    memo: "",
    totalAmount: "",
    status: "Draft",
  })

  const columns = [
    {
      key: "checkbox",
      header: "",
      render: () => <input type="checkbox" />,
    },
    {
      key: "transactionCode",
      header: "Transaction Code",
      render: (value) => (
        <span>
          {value} <span className="sort-icon">↕</span>
        </span>
      ),
    },
    { key: "transactionDate", header: "Transaction Date" },
    { key: "cashBank", header: "Cash/Bank" },
    { key: "referenceNo", header: "Reference No" },
    { key: "memo", header: "Memo" },
    { key: "totalAmount", header: "Total Amount" },
    {
      key: "status",
      header: "Status",
      render: (value) => <span className={`status-badge ${value?.toLowerCase()}`}>{value}</span>,
    },
  ]

  const expenseEntries = []

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Expense Entry Data:", formData)
    setIsModalOpen(false)
    setFormData({
      transactionCode: "",
      transactionDate: "",
      cashBank: "",
      referenceNo: "",
      memo: "",
      totalAmount: "",
      status: "Draft",
    })
  }

  return (
    <div className="expense-entry-page">
      <div className="page-header">
        <h1>Expense Entry Details</h1>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
        ➕ Create Expense Entry
        </button>
      </div>

      <div className="page-controls">
        <SearchBar placeholder="Search by Name" value={searchTerm} onChange={setSearchTerm} />
      </div>

      <DataTable
        columns={columns}
        data={expenseEntries}
        onEdit={(entry) => {
          // Handle edit functionality
        }}
        onDelete={(entry) => {
          // Handle delete functionality
        }}
        emptyMessage="No Records Found"
        pagination={{
          entriesPerPage,
          setEntriesPerPage,
          currentPage,
          setCurrentPage,
          totalPages: 0,
        }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Expense Entry" size="large">
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="transactionCode">Transaction Code *</label>
              <input
                type="text"
                id="transactionCode"
                name="transactionCode"
                value={formData.transactionCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="transactionDate">Transaction Date *</label>
              <input
                type="date"
                id="transactionDate"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cashBank">Cash/Bank *</label>
            <select id="cashBank" name="cashBank" value={formData.cashBank} onChange={handleInputChange} required>
              <option value="">Select Cash/Bank Account</option>
              <option value="Cash">Cash</option>
              <option value="Bank - Checking">Bank - Checking</option>
              <option value="Bank - Savings">Bank - Savings</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="referenceNo">Reference No</label>
            <input
              type="text"
              id="referenceNo"
              name="referenceNo"
              value={formData.referenceNo}
              onChange={handleInputChange}
              placeholder="Enter reference number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="memo">Memo</label>
            <textarea
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter expense description..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount *</label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Expense Entry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ExpenseEntry