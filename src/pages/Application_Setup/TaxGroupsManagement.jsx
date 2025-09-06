"use client"
import { useState } from "react"
import "./RegionManagement.css"

const TaxGroupsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taxItems, setTaxItems] = useState([
    {
      id: 1,
      name: "Advanced Tax 2.5%",
      description: "Advanced Tax 2.5%",
      rate: "2.5",
      availableOn: "Sales",
      taxType: "Advance Tax",
    },
    {
      id: 2,
      name: "Advance Tax .5%",
      description: "Advance Tax .5%",
      rate: "0.5",
      availableOn: "Purchase",
      taxType: "Advance Tax",
    },
  ])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rate: "",
    availableOn: "",
    taxType: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const handleCreateTaxItem = (e) => {
    e.preventDefault()
    if (formData.name && formData.rate && formData.availableOn && formData.taxType) {
      const newTaxItem = {
        id: taxItems.length + 1,
        name: formData.name,
        description: formData.description || formData.name,
        rate: formData.rate,
        availableOn: formData.availableOn,
        taxType: formData.taxType,
      }
      setTaxItems([...taxItems, newTaxItem])
      setFormData({ name: "", description: "", rate: "", availableOn: "", taxType: "" })
      setIsModalOpen(false)
    }
  }

  const filteredTaxItems = taxItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Tax Items</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          + Create Tax Item
        </button>
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
          <button className="search-btn">Go</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Edit</th>
              <th>Name</th>
              <th>Description</th>
              <th>Rate (%)</th>
              <th>Available On</th>
              <th>Tax Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredTaxItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <button className="action-btn edit">✏️</button>
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.rate}%</td>
                <td>{item.availableOn}</td>
                <td>{item.taxType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add/Edit Tax Items</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateTaxItem} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <small>Required</small>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rate">Rate</label>
                  <input
                    type="number"
                    id="rate"
                    step="0.1"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                    required
                  />
                  <small>Required</small>
                </div>
                <div className="form-group">
                  <label htmlFor="availableOn">Available On</label>
                  <select
                    id="availableOn"
                    value={formData.availableOn}
                    onChange={(e) => setFormData({ ...formData, availableOn: e.target.value })}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Sales">Sales</option>
                    <option value="Purchase">Purchase</option>
                    <option value="Both">Both</option>
                  </select>
                  <small>Required</small>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="taxType">Tax Type</label>
                <select
                  id="taxType"
                  value={formData.taxType}
                  onChange={(e) => setFormData({ ...formData, taxType: e.target.value })}
                  required
                >
                  <option value="">Select...</option>
                  <option value="GST">GST</option>
                  <option value="Advance Tax">Advance Tax</option>
                  <option value="Withholding Tax">Withholding Tax</option>
                  <option value="Sales Tax">Sales Tax</option>
                  <option value="Service Tax">Service Tax</option>
                </select>
                <small>Required</small>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaxGroupsManagement
