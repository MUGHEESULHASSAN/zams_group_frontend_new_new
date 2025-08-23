"use client"

import { useState } from "react"
import SearchBar from "../../components/Common/SearchBar"
import DataTable from "../../components/Common/DataTable"
import Modal from "./Modal"
import "./JournalEntry.css"

const JournalEntry = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    transactionCode: "",
    transactionDate: "",
    memo: "",
    referenceNo: "",
    totalDebit: "",
    totalCredit: "",
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
    { key: "memo", header: "Memo" },
    { key: "referenceNo", header: "Reference No" },
    { key: "totalDebit", header: "Total Debit" },
    { key: "totalCredit", header: "Total Credit" },
    {
      key: "status",
      header: "Status",
      render: (value) => <span className={`status-badge ${value?.toLowerCase()}`}>{value}</span>,
    },
  ]

  const journalEntries = []

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Journal Entry Data:", formData)
    setIsModalOpen(false)
    setFormData({
      transactionCode: "",
      transactionDate: "",
      memo: "",
      referenceNo: "",
      totalDebit: "",
      totalCredit: "",
      status: "Draft",
    })
  }

  return (
    <div className="journal-entry-page">
      <div className="page-header">
        <h1>Journal Entry Details</h1>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
        ➕ Create Journal Entry
        </button>
      </div>

      <div className="page-controls">
        <SearchBar placeholder="Search by Name" value={searchTerm} onChange={setSearchTerm} />
      </div>

      <DataTable
        columns={columns}
        data={journalEntries}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Journal Entry" size="large">
        <form onSubmit={handleSubmit} className="journal-form">
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
            <label htmlFor="memo">Memo</label>
            <textarea
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter memo details..."
            />
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="totalDebit">Total Debit</label>
              <input
                type="number"
                id="totalDebit"
                name="totalDebit"
                value={formData.totalDebit}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label htmlFor="totalCredit">Total Credit</label>
              <input
                type="number"
                id="totalCredit"
                name="totalCredit"
                value={formData.totalCredit}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
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
              Create Journal Entry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default JournalEntry
