"use client"

import { useState, useEffect } from "react"
import SearchBar from "../../components/Common/SearchBar"
import DataTable from "../../components/Common/DataTable"
import Modal from "../../components/Common/Modal"

const VendorCategory = () => {
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    status: "Active",
  })

  useEffect(() => {
    const mockCategories = [
      {
        id: "CAT-001",
        name: "Office Supplies",
        description: "General office supplies and stationery",
        parentCategory: "",
        vendorCount: 5,
        status: "Active",
        createdDate: "2024-01-10",
      },
      {
        id: "CAT-002",
        name: "Technology",
        description: "IT equipment and software",
        parentCategory: "",
        vendorCount: 8,
        status: "Active",
        createdDate: "2024-01-12",
      },
      {
        id: "CAT-003",
        name: "Furniture",
        description: "Office furniture and fixtures",
        parentCategory: "",
        vendorCount: 3,
        status: "Active",
        createdDate: "2024-01-15",
      },
      {
        id: "CAT-004",
        name: "Computer Hardware",
        description: "Computers, laptops, and peripherals",
        parentCategory: "Technology",
        vendorCount: 4,
        status: "Active",
        createdDate: "2024-01-18",
      },
    ]
    setCategories(mockCategories)
    setFilteredCategories(mockCategories)
  }, [])

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCategories(filtered)
  }, [searchTerm, categories])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newCategory = {
      id: `CAT-${String(categories.length + 1).padStart(3, "0")}`,
      vendorCount: 0,
      createdDate: new Date().toISOString().split("T")[0],
      ...formData,
    }
    setCategories((prev) => [...prev, newCategory])
    setFormData({
      name: "",
      description: "",
      parentCategory: "",
      status: "Active",
    })
    setIsModalOpen(false)
  }

  const CategoryForm = () => (
    <form onSubmit={handleSubmit} className="category-form">
      <div className="form-group">
        <label htmlFor="name">Category Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Enter category name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="3"
          placeholder="Describe what this category includes..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="parentCategory">Parent Category</label>
        <select id="parentCategory" name="parentCategory" value={formData.parentCategory} onChange={handleInputChange}>
          <option value="">None (Top Level)</option>
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
          Add Category
        </button>
      </div>
    </form>
  )

  const columns = [
    { key: "id", header: "Category ID" },
    { key: "name", header: "Category Name" },
    { key: "description", header: "Description" },
    { key: "parentCategory", header: "Parent Category" },
    { key: "vendorCount", header: "Vendors" },
    {
      key: "status",
      header: "Status",
      render: (value) => <span className={`status-badge ${value.toLowerCase()}`}>{value}</span>,
    },
    { key: "createdDate", header: "Created Date" },
  ]

  return (
    <div className="vendor-category-page">
      <div className="page-header">
        <h1>Vendor Categories</h1>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
          ➕ Add Category
        </button>
      </div>

      <div className="page-controls">
        <SearchBar placeholder="Search categories..." value={searchTerm} onChange={setSearchTerm} />
      </div>

      <DataTable columns={columns} data={filteredCategories} onEdit={() => {}} onDelete={() => {}} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Vendor Category">
        <CategoryForm />
      </Modal>
    </div>
  )
}

export default VendorCategory
