"use client"

import { useState, useEffect } from "react"
import SearchBar from "../../components/Common/SearchBar"
import DataTable from "../../components/Common/DataTable"
import Modal from "../../components/Common/Modal"

const Receipts = () => {
  const [receipts, setReceipts] = useState([])
  const [filteredReceipts, setFilteredReceipts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    poNumber: "",
    vendor: "",
    receivedDate: "",
    receivedBy: "",
    items: [],
    notes: "",
    condition: "Good",
  })

  useEffect(() => {
    const mockReceipts = [
      {
        id: "REC-001",
        poNumber: "PO-001",
        vendor: "Office Supplies Inc",
        receivedDate: "2024-01-20",
        items: 15,
        status: "Complete",
      },
      {
        id: "REC-002",
        poNumber: "PO-002",
        vendor: "Tech Equipment Ltd",
        receivedDate: "2024-01-22",
        items: 5,
        status: "Partial",
      },
    ]
    setReceipts(mockReceipts)
    setFilteredReceipts(mockReceipts)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newReceipt = {
      id: `REC-${String(receipts.length + 1).padStart(3, "0")}`,
      items: 0,
      status: "Complete",
      ...formData,
    }
    setReceipts((prev) => [...prev, newReceipt])
    setFormData({
      poNumber: "",
      vendor: "",
      receivedDate: "",
      receivedBy: "",
      items: [],
      notes: "",
      condition: "Good",
    })
    setIsModalOpen(false)
  }

  const ReceiptForm = () => (
    <form onSubmit={handleSubmit} className="receipt-form">
      <div className="form-group">
        <label htmlFor="poNumber">PO Number *</label>
        <select id="poNumber" name="poNumber" value={formData.poNumber} onChange={handleInputChange} required>
          <option value="">Select PO Number</option>
          <option value="PO-001">PO-001</option>
          <option value="PO-002">PO-002</option>
          <option value="PO-003">PO-003</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="vendor">Vendor *</label>
        <input
          type="text"
          id="vendor"
          name="vendor"
          value={formData.vendor}
          onChange={handleInputChange}
          required
          placeholder="Vendor name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="receivedDate">Received Date *</label>
        <input
          type="date"
          id="receivedDate"
          name="receivedDate"
          value={formData.receivedDate}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="receivedBy">Received By *</label>
        <input
          type="text"
          id="receivedBy"
          name="receivedBy"
          value={formData.receivedBy}
          onChange={handleInputChange}
          required
          placeholder="Person who received the items"
        />
      </div>

      <div className="form-group">
        <label htmlFor="condition">Condition</label>
        <select id="condition" name="condition" value={formData.condition} onChange={handleInputChange}>
          <option value="Good">Good</option>
          <option value="Damaged">Damaged</option>
          <option value="Partial">Partial</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows="3"
          placeholder="Any additional notes about the receipt..."
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => setIsModalOpen(false)} className="secondary-btn">
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          Record Receipt
        </button>
      </div>
    </form>
  )

  const columns = [
    { key: "id", header: "Receipt ID" },
    { key: "poNumber", header: "PO Number" },
    { key: "vendor", header: "Vendor" },
    { key: "receivedDate", header: "Received Date" },
    { key: "items", header: "Items" },
    {
      key: "status",
      header: "Status",
      render: (value) => <span className={`status-badge ${value.toLowerCase()}`}>{value}</span>,
    },
  ]

  return (
    <div className="receipts-page">
      <div className="page-header">
        <h1>Receipts</h1>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
          ➕ Record Receipt
        </button>
      </div>

      <div className="page-controls">
        <SearchBar placeholder="Search receipts..." value={searchTerm} onChange={setSearchTerm} />
      </div>

      <DataTable columns={columns} data={filteredReceipts} onEdit={() => {}} onDelete={() => {}} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record New Receipt">
        <ReceiptForm />
      </Modal>
    </div>
  )
}

export default Receipts
