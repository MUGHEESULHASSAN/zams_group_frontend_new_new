"use client"

import { useState, useEffect } from "react"
import "./CreateDeliveryChallan.css"

const CreateDeliveryChallan = ({ challan, onSave, onCancel, onBack }) => {
  const [formData, setFormData] = useState({
    transactionNumber: "AUTO-001",
    transactionDate: "",
    customer: "",
    location: "",
    status: "Draft",
    subsidiary: "",
    department: "",
    driverName: "",
    driverMobile: "",
    vehicleNo: "",
    outboundShipment: false,
    memo: "",
    referenceNo: "",
    project: "",
    salesman: "",
    salesRep: "",
    vehicleLoadoutNo: "",
    attachments: [],
    items: [
      {
        description: "",
        balance: "",
        uom: "",
        quantity: 1,
        unitPrice: 0,
        details: "",
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
    if (challan) setFormData(challan)
  }, [challan])

  // Recalculate totals
  useEffect(() => {
    const total = formData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = total * 0.1 // 10% tax example
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
          balance: "",
          uom: "",
          quantity: 1,
          unitPrice: 0,
          details: "",
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
    <form className="delivery-form" onSubmit={handleSubmit}>
      <h2>Create Delivery Challan</h2>

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
        <label>Customer</label>
        <input
          type="text"
          name="customer"
          value={formData.customer}
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
        <label>Driver Name</label>
        <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Driver Mobile Number</label>
        <input type="text" name="driverMobile" value={formData.driverMobile} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Vehicle No</label>
        <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Outbound Shipment</label>
        <input type="checkbox" name="outboundShipment" checked={formData.outboundShipment} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Memo</label>
        <textarea name="memo" value={formData.memo} onChange={handleChange} />
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
        <label>Salesman</label>
        <input type="text" name="salesman" value={formData.salesman} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Sales Rep</label>
        <input type="text" name="salesRep" value={formData.salesRep} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Vehicle Loadout No</label>
        <input type="text" name="vehicleLoadoutNo" value={formData.vehicleLoadoutNo} onChange={handleChange} />
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
      <h3>Transaction Lines</h3>
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
              <label>Balance</label>
              <input
                type="text"
                value={item.balance}
                onChange={(e) => handleItemChange(index, "balance", e.target.value)}
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
              <label>Details</label>
              <input
                type="text"
                value={item.details}
                onChange={(e) => handleItemChange(index, "details", e.target.value)}
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
        <button type="button" className="secondary-btn" onClick={onBack}>
          Back
        </button>
        <button type="button" className="secondary-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          {challan ? "Update Challan" : "Create Challan"}
        </button>
      </div>
    </form>
  )
}

export default CreateDeliveryChallan
