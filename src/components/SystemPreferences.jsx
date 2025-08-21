"use client"

import { useState } from "react"
import "./SystemPreferences.css"

const SystemPreferences = ({ onBack }) => {
  const [regionValue, setRegionValue] = useState("")
  const [zoneValue, setZoneValue] = useState("")
  const [territoryValue, setTerritoryValue] = useState("")
  const [areaValue, setAreaValue] = useState("")
  const [routeValue, setRouteValue] = useState("")

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("")
  const [formData, setFormData] = useState({ id: "", name: "" })

  const [addedItems, setAddedItems] = useState({
    regions: [],
    zones: [],
    territories: [],
    areas: [],
    routes: [],
  })

  const handleAddClick = (type) => {
    setModalType(type)
    setFormData({ id: "", name: "" })
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setModalType("")
    setFormData({ id: "", name: "" })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.id || !formData.name) return

    const newItem = {
      id: formData.id,
      name: formData.name,
    }

    setAddedItems((prev) => ({
      ...prev,
      [`${modalType}s`]: [...prev[`${modalType}s`], newItem],
    }))

    handleModalClose()
  }

  const handleSave = () => {
    const preferences = {
      region: regionValue,
      zone: zoneValue,
      territory: territoryValue,
      area: areaValue,
      route: routeValue,
      addedItems: addedItems,
    }
    console.log("Saving system preferences:", preferences)
    alert("System preferences saved successfully!")
  }

  return (
    <div className="system-preferences">
      <div className="page-header">
        <h1>System Preferences</h1>
        <button className="back-button" onClick={onBack}>
          ← Back to Settings
        </button>
      </div>

      <div className="preferences-form">
        <div className="form-section">
          <h2>Location Hierarchy</h2>

          <div className="form-group">
            <label htmlFor="region">Region</label>
            <div className="input-with-button">
              <input
                type="text"
                id="region"
                value={regionValue}
                onChange={(e) => setRegionValue(e.target.value)}
                className="form-input"
                placeholder="Enter region name"
              />
              <button className="add-button" onClick={() => handleAddClick("region")} type="button">
                + Add Region
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="zone">Zone</label>
            <div className="input-with-button">
              <input
                type="text"
                id="zone"
                value={zoneValue}
                onChange={(e) => setZoneValue(e.target.value)}
                className="form-input"
                placeholder="Enter zone name"
              />
              <button className="add-button" onClick={() => handleAddClick("zone")} type="button">
                + Add Zone
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="territory">Territory</label>
            <div className="input-with-button">
              <input
                type="text"
                id="territory"
                value={territoryValue}
                onChange={(e) => setTerritoryValue(e.target.value)}
                className="form-input"
                placeholder="Enter territory name"
              />
              <button className="add-button" onClick={() => handleAddClick("territory")} type="button">
                + Add Territory
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="area">Area</label>
            <div className="input-with-button">
              <input
                type="text"
                id="area"
                value={areaValue}
                onChange={(e) => setAreaValue(e.target.value)}
                className="form-input"
                placeholder="Enter area name"
              />
              <button className="add-button" onClick={() => handleAddClick("area")} type="button">
                + Add Area
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="route">Route</label>
            <div className="input-with-button">
              <input
                type="text"
                id="route"
                value={routeValue}
                onChange={(e) => setRouteValue(e.target.value)}
                className="form-input"
                placeholder="Enter route name"
              />
              <button className="add-button" onClick={() => handleAddClick("route")} type="button">
                + Add Route
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="save-button" onClick={handleSave}>
            Save Preferences
          </button>
          <button className="cancel-button" onClick={onBack}>
            Cancel
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New {modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h3>
              <button className="modal-close" onClick={handleModalClose}>
                ×
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="modal-form-group">
                <label htmlFor="modal-id">ID</label>
                <input
                  type="text"
                  id="modal-id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder={`Enter ${modalType} ID`}
                  required
                />
              </div>
              <div className="modal-form-group">
                <label htmlFor="modal-name">Name</label>
                <input
                  type="text"
                  id="modal-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={`Enter ${modalType} name`}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="modal-save-button">
                  Add {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
                </button>
                <button type="button" className="modal-cancel-button" onClick={handleModalClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SystemPreferences
