"use client"
import { useState } from "react"
import "./RegionManagement.css"

const RouteManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [routes, setRoutes] = useState([
    { id: 1, name: "Route Alpha-1", shortName: "RA1", area: "North Area One", createdDate: "2024-02-05" },
    { id: 2, name: "Route Beta-2", shortName: "RB2", area: "South Area Two", createdDate: "2024-02-07" },
  ])
  const [formData, setFormData] = useState({ name: "", shortName: "", area: "" })
  const [searchTerm, setSearchTerm] = useState("")

  // Mock areas data - in real app this would come from props or API
  const availableAreas = [
    { id: 1, name: "North Area One", shortName: "NAO" },
    { id: 2, name: "South Area Two", shortName: "SAT" },
  ]

  const handleCreateRoute = (e) => {
    e.preventDefault()
    if (formData.name && formData.shortName && formData.area) {
      const newRoute = {
        id: routes.length + 1,
        name: formData.name,
        shortName: formData.shortName,
        area: formData.area,
        createdDate: new Date().toISOString().split("T")[0],
      }
      setRoutes([...routes, newRoute])
      setFormData({ name: "", shortName: "", area: "" })
      setIsModalOpen(false)
    }
  }

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.area.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Routes</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          + Create Route
        </button>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search routes..."
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
              <th>Route ID</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>Area</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route) => (
              <tr key={route.id}>
                <td>ROU-{route.id.toString().padStart(3, "0")}</td>
                <td>{route.name}</td>
                <td>{route.shortName}</td>
                <td>{route.area}</td>
                <td>{route.createdDate}</td>
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
              <h2>Create New Route</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateRoute} className="modal-form">
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
                <label htmlFor="area">Area</label>
                <select
                  id="area"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  required
                  className="form-select"
                >
                  <option value="">Select an area</option>
                  {availableAreas.map((area) => (
                    <option key={area.id} value={area.name}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default RouteManagement
