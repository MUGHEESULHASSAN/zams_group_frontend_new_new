"use client"
import { useState } from "react"
import "./RegionManagement.css"

const RegionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [regions, setRegions] = useState([
    { id: 1, name: "North Region", shortName: "NR", createdDate: "2024-01-15" },
    { id: 2, name: "South Region", shortName: "SR", createdDate: "2024-01-18" },
  ])
  const [formData, setFormData] = useState({ name: "", shortName: "" })
  const [searchTerm, setSearchTerm] = useState("")

  const handleCreateRegion = (e) => {
    e.preventDefault()
    if (formData.name && formData.shortName) {
      const newRegion = {
        id: regions.length + 1,
        name: formData.name,
        shortName: formData.shortName,
        createdDate: new Date().toISOString().split("T")[0],
      }
      setRegions([...regions, newRegion])
      setFormData({ name: "", shortName: "" })
      setIsModalOpen(false)
    }
  }

  const filteredRegions = regions.filter(
    (region) =>
      region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.shortName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Regions</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          + Create Region
        </button>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Region ID</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegions.map((region) => (
              <tr key={region.id}>
                <td>REG-{region.id.toString().padStart(3, "0")}</td>
                <td>{region.name}</td>
                <td>{region.shortName}</td>
                <td>{region.createdDate}</td>
                <td className="actions-cell">
                  <button className="action-btn edit">✏️</button>
                  <button className="action-btn delete">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Region</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateRegion} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="shortName">Short Name</label>
                <input
                  type="text"
                  id="shortName"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Region
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegionManagement
