"use client"
import { useState } from "react"
import "./RegionManagement.css"

const TaxTypesManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taxTypes, setTaxTypes] = useState([
    {
      id: 26,
      name: "GST",
      description: "GST",
      nexus: "",
      liabilitySalesTaxAct: "20010705 - GST ON S...",
      assetPurchaseTaxAct: "10011303 - GST ON PU...",
    },
    {
      id: 27,
      name: "W.H.T",
      description: "W.H.T",
      nexus: "",
      liabilitySalesTaxAct: "10011301 - WHT RECEI...",
      assetPurchaseTaxAct: "20010707 - WHT PAYA...",
    },
    {
      id: 34,
      name: "Adv Tax",
      description: "Adv Tax",
      nexus: "",
      liabilitySalesTaxAct: "20010703 - ADVANCE...",
      assetPurchaseTaxAct: "10011301 - WHT RECEI...",
    },
  ])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    nexus: "",
    liabilitySalesTaxAct: "",
    assetPurchaseTaxAct: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const handleCreateTaxType = (e) => {
    e.preventDefault()
    if (formData.name && formData.description) {
      const newTaxType = {
        id: Math.max(...taxTypes.map((t) => t.id)) + 1,
        name: formData.name,
        description: formData.description,
        nexus: formData.nexus,
        liabilitySalesTaxAct: formData.liabilitySalesTaxAct,
        assetPurchaseTaxAct: formData.assetPurchaseTaxAct,
      }
      setTaxTypes([...taxTypes, newTaxType])
      setFormData({ name: "", description: "", nexus: "", liabilitySalesTaxAct: "", assetPurchaseTaxAct: "" })
      setIsModalOpen(false)
    }
  }

  const filteredTaxTypes = taxTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Tax Types</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          + Create
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
              <th>Tax Type Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Nexus</th>
              <th>Liability Sales Tax Act</th>
              <th>Asset Purchase Tax Act</th>
            </tr>
          </thead>
          <tbody>
            {filteredTaxTypes.map((type) => (
              <tr key={type.id}>
                <td>
                  <button className="action-btn edit">✏️</button>
                </td>
                <td>{type.id}</td>
                <td>{type.name}</td>
                <td>{type.description}</td>
                <td>{type.nexus}</td>
                <td>{type.liabilitySalesTaxAct}</td>
                <td>{type.assetPurchaseTaxAct}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <span>Total {filteredTaxTypes.length}</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add/Edit Tax Type</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateTaxType} className="modal-form">
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
                    required
                  />
                  <small>Required</small>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="nexus">Nexus</label>
                <input
                  type="text"
                  id="nexus"
                  value={formData.nexus}
                  onChange={(e) => setFormData({ ...formData, nexus: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="liabilitySalesTaxAct">Liability Sales Tax Act</label>
                  <select
                    id="liabilitySalesTaxAct"
                    value={formData.liabilitySalesTaxAct}
                    onChange={(e) => setFormData({ ...formData, liabilitySalesTaxAct: e.target.value })}
                  >
                    <option value="">Select Account...</option>
                    <option value="20010705 - GST ON S...">20010705 - GST ON SALES</option>
                    <option value="10011301 - WHT RECEI...">10011301 - WHT RECEIVABLE</option>
                    <option value="20010703 - ADVANCE...">20010703 - ADVANCE TAX</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="assetPurchaseTaxAct">Asset Purchase Tax Act</label>
                  <select
                    id="assetPurchaseTaxAct"
                    value={formData.assetPurchaseTaxAct}
                    onChange={(e) => setFormData({ ...formData, assetPurchaseTaxAct: e.target.value })}
                  >
                    <option value="">Select Account...</option>
                    <option value="10011303 - GST ON PU...">10011303 - GST ON PURCHASE</option>
                    <option value="20010707 - WHT PAYA...">20010707 - WHT PAYABLE</option>
                    <option value="10011301 - WHT RECEI...">10011301 - WHT RECEIVABLE</option>
                  </select>
                </div>
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

export default TaxTypesManagement
