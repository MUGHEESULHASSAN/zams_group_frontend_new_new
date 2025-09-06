"use client"
import { useState } from "react"
import "./RegionManagement.css"

const TerritoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [territories, setTerritories] = useState([
    { id: 1, name: "North Territory Alpha", shortName: "NTA", zone: "North Zone A", createdDate: "2024-01-25" },
    { id: 2, name: "South Territory Beta", shortName: "STB", zone: "South Zone B", createdDate: "2024-01-28" },
  ])
  const [formData, setFormData] = useState({ name: "", shortName: "", zone: "" })
  const [searchTerm, setSearchTerm] = useState("")

  // Mock zones data - in real app this would come from props or API
  const availableZones = [
    { id: 1, name: "North Zone A", shortName: "NZA" },
    { id: 2, name: "South Zone B", shortName: "SZB" },
  ]

  const handleCreateTerritory = (e) => {
    e.preventDefault()
    if (formData.name && formData.shortName && formData.zone) {
      const newTerritory = {
        id: territories.length + 1,
        name: formData.name,
        shortName: formData.shortName,
        zone: formData.zone,
        createdDate: new Date().toISOString().split("T")[0],
      }
      setTerritories([...territories, newTerritory])
      setFormData({ name: "", shortName: "", zone: "" })
      setIsModalOpen(false)
    }
  }

  const filteredTerritories = territories.filter(
    (territory) =>
      territory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      territory.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      territory.zone.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Territories</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          + Create Territory
        </button>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search territories..."
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
              <th>Territory ID</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>Zone</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTerritories.map((territory) => (
              <tr key={territory.id}>
                <td>TER-{territory.id.toString().padStart(3, "0")}</td>
                <td>{territory.name}</td>
                <td>{territory.shortName}</td>
                <td>{territory.zone}</td>
                <td>{territory.createdDate}</td>
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
              <h2>Create New Territory</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateTerritory} className="modal-form">
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
                <label htmlFor="zone">Zone</label>
                <select
                  id="zone"
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  required
                  className="form-select"
                >
                  <option value="">Select a zone</option>
                  {availableZones.map((zone) => (
                    <option key={zone.id} value={zone.name}>
                      {zone.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Territory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TerritoryManagement
