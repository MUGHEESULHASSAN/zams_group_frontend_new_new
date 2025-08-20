"use client"

import { useState, useEffect } from "react"
import SearchBar from "../../components/Common/SearchBar"
import DataTable from "../../components/Common/DataTable"
import Modal from "../../components/Common/Modal"

const Vendors = () => {
  const [vendors, setVendors] = useState([])
  const [filteredVendors, setFilteredVendors] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    status: "Active",
  })

  useEffect(() => {
    const mockVendors = [
      {
        id: "VEN-001",
        name: "Office Supplies Inc",
        contact: "John Manager",
        email: "john@officesupplies.com",
        phone: "+1-555-0100",
        status: "Active",
      },
      {
        id: "VEN-002",
        name: "Tech Equipment Ltd",
        contact: "Sarah Tech",
        email: "sarah@techequip.com",
        phone: "+1-555-0200",
        status: "Active",
      },
    ]
    setVendors(mockVendors)
    setFilteredVendors(mockVendors)
  }, [])

  useEffect(() => {
    const filtered = vendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.contact.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredVendors(filtered)
  }, [searchTerm, vendors])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newVendor = {
      id: `VEN-${String(vendors.length + 1).padStart(3, "0")}`,
      ...formData,
    }
    setVendors((prev) => [...prev, newVendor])
    setFormData({
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      status: "Active",
    })
    setIsModalOpen(false)
  }

  const VendorForm = () => (
    <form onSubmit={handleSubmit} className="vendor-form">
      <div className="form-group">
        <label htmlFor="name">Company Name *</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="contact">Contact Person *</label>
        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows="3" />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
          <option value="">Select Category</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Technology">Technology</option>
          <option value="Furniture">Furniture</option>
          <option value="Services">Services</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => setIsModalOpen(false)} className="secondary-btn">
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          Add Vendor
        </button>
      </div>
    </form>
  )

  const columns = [
    { key: "id", header: "Vendor ID" },
    { key: "name", header: "Company Name" },
    { key: "contact", header: "Contact Person" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    {
      key: "status",
      header: "Status",
      render: (value) => <span className={`status-badge ${value.toLowerCase()}`}>{value}</span>,
    },
  ]

  return (
    <div className="vendors-page">
      <div className="page-header">
        <h1>Vendors</h1>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
          ➕ Add Vendor
        </button>
      </div>

      <div className="page-controls">
        <SearchBar placeholder="Search vendors..." value={searchTerm} onChange={setSearchTerm} />
      </div>

      <DataTable columns={columns} data={filteredVendors} onEdit={() => {}} onDelete={() => {}} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Vendor">
        <VendorForm />
      </Modal>
    </div>
  )
}

export default Vendors
