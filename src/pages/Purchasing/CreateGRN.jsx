"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateGRN.css"

const CreateGRN = ({ grn, onSave, onCancel, onBack }) => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    transactionNumber: "GRN-001",
    transactionDate: "",
    vendor: "",
    location: "",
    status: "Draft",
    subsidiary: "",
    department: "",
    referenceNo: "",
    project: "",
    attachments: [],
    items: [
      {
        description: "",
        uom: "",
        quantity: 1,
        unitPrice: 0,
        amount: 0,
        taxCode: "",
        memo: "",
      },
    ],
    totalAmount: 0,
    taxAmount: 0,
    grossAmount: 0,
  })

  useEffect(() => {
    if (grn) setFormData(grn)
  }, [grn])

  // Recalculate totals
  useEffect(() => {
    const total = formData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = total * 0.1 // Example: 10% tax
    setFormData((prev) => ({
      ...prev,
      totalAmount: total,
      taxAmount: tax,
      grossAmount: total + tax,
    }))
  }, [formData.items])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items]
    updatedItems[index][field] =
      field === "quantity" || field === "unitPrice" ? Number(value) : value

    updatedItems[index].amount =
      (updatedItems[index].quantity || 0) * (updatedItems[index].unitPrice || 0)

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          uom: "",
          quantity: 1,
          unitPrice: 0,
          amount: 0,
          taxCode: "",
          memo: "",
        },
      ],
    }))
  }

  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, items: updatedItems }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form className="grn-form" onSubmit={handleSubmit}>
      <h2>Create Goods Received Note (GRN)</h2>

      {/* --- Transaction Info --- */}
      <div className="form-group">
        <label>Transaction Number</label>
        <input type="text" name="transactionNumber" value={formData.transactionNumber} disabled />
      </div>

      <div className="form-group">
        <label>Transaction Date</label>
        <input
          type="date"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Vendor</label>
        <input
          type="text"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Draft">Draft</option>
          <option value="Approved">Approved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="form-group">
        <label>Subsidiary</label>
        <input type="text" name="subsidiary" value={formData.subsidiary} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Department</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Reference No</label>
        <input type="text" name="referenceNo" value={formData.referenceNo} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Project</label>
        <input type="text" name="project" value={formData.project} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Attachments</label>
        <input
          type="file"
          multiple
          onChange={(e) => setFormData({ ...formData, attachments: e.target.files })}
        />
      </div>

      {/* --- Items --- */}
      <h3>GRN Lines</h3>
      <div className="items-section">
        {formData.items.map((item, index) => (
          <div key={index} className="form-row">
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleItemChange(index, "description", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>UOM</label>
              <input
                type="text"
                value={item.uom}
                onChange={(e) => handleItemChange(index, "uom", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Unit Price</label>
              <input
                type="number"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input type="number" value={item.amount} readOnly />
            </div>

            <div className="form-group">
              <label>Tax Code</label>
              <input
                type="text"
                value={item.taxCode}
                onChange={(e) => handleItemChange(index, "taxCode", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Memo</label>
              <input
                type="text"
                value={item.memo}
                onChange={(e) => handleItemChange(index, "memo", e.target.value)}
              />
            </div>

            <button type="button" className="remove-item-btn" onClick={() => handleRemoveItem(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" className="add-item-btn" onClick={handleAddItem}>
          + Add Line
        </button>
      </div>

      {/* --- Summary --- */}
      <h3>Summary</h3>
      <div className="form-group">
        <label>Total Amount</label>
        <input type="number" value={formData.totalAmount} readOnly />
      </div>

      <div className="form-group">
        <label>Tax Amount</label>
        <input type="number" value={formData.taxAmount} readOnly />
      </div>

      <div className="form-group">
        <label>Gross Amount</label>
        <input type="number" value={formData.grossAmount} readOnly />
      </div>

      {/* --- Actions --- */}
      <div className="form-actions">
        <button type="button" className="secondary-btn" onClick={() => navigate("/goods-received-notes")}>
          Back
        </button>
        <button type="button" className="secondary-btn" onClick={() => navigate("/goods-received-notes")}>
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          {grn ? "Update GRN" : "Create GRN"}
        </button>
      </div>
    </form>
  )
}

export default CreateGRN
