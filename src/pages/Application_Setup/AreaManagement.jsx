"use client"
import { useState } from "react"
import "./RegionManagement.css"

const AreaManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [areas, setAreas] = useState([
    { id: 1, name: "North Area One", shortName: "NAO", territory: "North Territory Alpha", createdDate: "2024-02-01" },
    { id: 2, name: "South Area Two", shortName: "SAT", territory: "South Territory Beta", createdDate: "2024-02-03" },
  ])
  const [formData, setFormData] = useState({ name: "", shortName: "", territory: "" })
  const [searchTerm, setSearchTerm] = useState("")

  // Mock territories data - in real app this would come from props or API
  const availableTerritories = [
    { id: 1, name: "North Territory Alpha", shortName: "NTA" },
    { id: 2, name: "South Territory Beta", shortName: "STB" },
  ]

  const handleCreateArea = (e) => {
    e.preventDefault()
    if (formData.name && formData.shortName && formData.territory) {
      const newArea = {
        id: areas.length + 1,
        name: formData.name,
        shortName: formData.shortName,
        territory: formData.territory,
        createdDate: new Date().toISOString().split("T")[0],
      }
      setAreas([...areas, newArea])
      setFormData({ name: "", shortName: "", territory: "" })
      setIsModalOpen(false)
    }
  }

  const filteredAreas = areas.filter(
    (area) =>
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.territory.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Areas</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          + Create Area
        </button>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search areas..."
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
              <th>Area ID</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>Territory</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAreas.map((area) => (
              <tr key={area.id}>
                <td>ARE-{area.id.toString().padStart(3, "0")}</td>
                <td>{area.name}</td>
                <td>{area.shortName}</td>
                <td>{area.territory}</td>
                <td>{area.createdDate}</td>
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
              <h2>Create New Area</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateArea} className="modal-form">
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
              <div className="form-group">
                <label htmlFor="territory">Territory</label>
                <select
                  id="territory"
                  value={formData.territory}
                  onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                  required
                  className="form-select"
                >
                  <option value="">Select a territory</option>
                  {availableTerritories.map((territory) => (
                    <option key={territory.id} value={territory.name}>
                      {territory.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Area
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AreaManagement
