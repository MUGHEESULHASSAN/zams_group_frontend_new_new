"use client"

import { useState, useEffect } from "react"
import SearchBar from "../../components/Common/SearchBar"
import DataTable from "../../components/Common/DataTable"
import Modal from "../../components/Common/Modal"

const Purchasing = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    vendor: "",
    deliveryDate: "",
    items: [],
    notes: "",
    priority: "Normal",
  })

  useEffect(() => {
    const mockOrders = [
      {
        id: "PO-001",
        vendor: "Office Supplies Inc",
        date: "2024-01-15",
        total: 2500,
        status: "Pending",
        deliveryDate: "2024-01-25",
      },
      {
        id: "PO-002",
        vendor: "Tech Equipment Ltd",
        date: "2024-01-14",
        total: 15000,
        status: "Approved",
        deliveryDate: "2024-01-30",
      },
    ]
    setPurchaseOrders(mockOrders)
    setFilteredOrders(mockOrders)
  }, [])

  useEffect(() => {
    const filtered = purchaseOrders.filter(
      (order) =>
        order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredOrders(filtered)
  }, [searchTerm, purchaseOrders])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPO = {
      id: `PO-${String(purchaseOrders.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      total: 0,
      status: "Draft",
      ...formData,
    }
    setPurchaseOrders((prev) => [...prev, newPO])
    setFormData({
      vendor: "",
      deliveryDate: "",
      items: [],
      notes: "",
      priority: "Normal",
    })
    setIsModalOpen(false)
  }

  const PurchaseOrderForm = () => (
    <form onSubmit={handleSubmit} className="po-form">
      <div className="form-group">
        <label htmlFor="vendor">Vendor *</label>
        <select id="vendor" name="vendor" value={formData.vendor} onChange={handleInputChange} required>
          <option value="">Select Vendor</option>
          <option value="Office Supplies Inc">Office Supplies Inc</option>
          <option value="Tech Equipment Ltd">Tech Equipment Ltd</option>
          <option value="Furniture World">Furniture World</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="deliveryDate">Expected Delivery Date *</label>
        <input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange}>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
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
          placeholder="Additional notes or requirements..."
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => setIsModalOpen(false)} className="secondary-btn">
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          Create PO
        </button>
      </div>
    </form>
  )

  const columns = [
    { key: "id", header: "PO Number" },
    { key: "vendor", header: "Vendor" },
    { key: "date", header: "Order Date" },
    {
      key: "total",
      header: "Total",
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: "status",
      header: "Status",
      render: (value) => <span className={`status-badge ${value.toLowerCase()}`}>{value}</span>,
    },
    { key: "deliveryDate", header: "Delivery Date" },
  ]

  return (
    <div className="purchasing-page">
      <div className="page-header">
        <h1>Purchase Orders</h1>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
          ➕ Create PO
        </button>
      </div>

      <div className="page-controls">
        <SearchBar placeholder="Search purchase orders..." value={searchTerm} onChange={setSearchTerm} />
      </div>

      <DataTable columns={columns} data={filteredOrders} onEdit={() => {}} onDelete={() => {}} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Purchase Order">
        <PurchaseOrderForm />
      </Modal>
    </div>
  )
}

export default Purchasing
