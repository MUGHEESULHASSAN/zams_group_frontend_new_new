"use client"
import { useState } from "react"
import "./RegionManagement.css"

const ZoneManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [zones, setZones] = useState([
    { id: 1, name: "North Zone A", shortName: "NZA", region: "North Region", createdDate: "2024-01-20" },
    { id: 2, name: "South Zone B", shortName: "SZB", region: "South Region", createdDate: "2024-01-22" },
  ])
  const [formData, setFormData] = useState({ name: "", shortName: "", region: "" })
  const [searchTerm, setSearchTerm] = useState("")

  // Mock regions data - in real app this would come from props or API
  const availableRegions = [
    { id: 1, name: "North Region", shortName: "NR" },
    { id: 2, name: "South Region", shortName: "SR" },
  ]

  const handleCreateZone = (e) => {
    e.preventDefault()
    if (formData.name && formData.shortName && formData.region) {
      const newZone = {
        id: zones.length + 1,
        name: formData.name,
        shortName: formData.shortName,
        region: formData.region,
        createdDate: new Date().toISOString().split("T")[0],
      }
      setZones([...zones, newZone])
      setFormData({ name: "", shortName: "", region: "" })
      setIsModalOpen(false)
    }
  }

  const filteredZones = zones.filter(
    (zone) =>
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.region.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Zones</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          + Create Zone
        </button>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search zones..."
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
              <th>Zone ID</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>Region</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredZones.map((zone) => (
              <tr key={zone.id}>
                <td>ZON-{zone.id.toString().padStart(3, "0")}</td>
                <td>{zone.name}</td>
                <td>{zone.shortName}</td>
                <td>{zone.region}</td>
                <td>{zone.createdDate}</td>
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
              <h2>Create New Zone</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateZone} className="modal-form">
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
                <label htmlFor="region">Region</label>
                <select
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  required
                  className="form-select"
                >
                  <option value="">Select a region</option>
                  {availableRegions.map((region) => (
                    <option key={region.id} value={region.name}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Zone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ZoneManagement
