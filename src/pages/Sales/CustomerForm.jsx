import { useState, useEffect } from "react"

const CustomerForm = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
    category: "",
    address: "",
    cnic: "",
    customerCode: "",
    priceType: "",
    ntnNumber: "",
    nature: "",
    subnature: "",
    regionId: "",
    region: "",
    zoneId: "",
    zone: "",
    territoryId: "",
    territory: "",
    areaId: "",
    area: "",
    routeId: "",
    routeName: "",
  })

  const natureOptions = [
    { value: "generalTrade", label: "General Trade" },
    { value: "modernTrade", label: "Modern Trade" },
    { value: "horeca", label: "Horeca" },
    { value: "wholesale", label: "Wholesale" },
  ]

  const subnatureOptions = {
    generalTrade: [
      { value: "generalStore", label: "General Store" },
      { value: "pharmacies", label: "Pharmacies" },
      { value: "panShop", label: "Pan Shop/Tuck Shop" },
      { value: "groceryStore", label: "Grocery Store" },
      { value: "bakery", label: "Bakery/Sweets" },
    ],
    modernTrade: [
      { value: "superstore", label: "Superstore" },
      { value: "mart", label: "Mart" },
      { value: "localModernTrade", label: "Local Modern Trade" },
      { value: "utilityStores", label: "Utility Stores" },
      { value: "petroMarts", label: "Petro Marts" },
    ],
    horeca: [
      { value: "hotel", label: "Hotel" },
      { value: "restaurant", label: "Restaurant" },
      { value: "canteen", label: "Canteen" },
      { value: "marque", label: "Marque" },
    ],
    wholesale: [
      { value: "wholesale", label: "Wholesale" },
    ],
  }

  const regionData = [
    ["R01", "NORTH"]
  ]
  const zoneData = [
    ["NZ01", "ISLAMABAD"],
    ["NZ02", "RAWALPINDI"],
    ["NZ03", "WAH CANTT"]
  ]
  const territoryData = [
    ["NT01", "ISLAMABAD"],
    ["NT02", "RAWALPINDI"],
    ["NT03", "WAH CANTT"]
  ]
  const areaData = [
    ["NA01", "ALI PUR FARASH"],
    ["NA02", "BAHRIA ENCLAVE"],
    ["NA03", "BANI GALA"],
    ["NA04", "BARI IMAM"],
    ["NA05", "BHARA KAHU"]
  ]
  const routeData = [
    ["NR01", "ALI PUR FARASH"],
    ["NR02", "BAHRIA ENCLAVE"],
    ["NR03", "BANI GALA"],
    ["NR04", "BARI IMAM"],
    ["NR05", "QUAID E AZAM UNIVERSITY"]
  ]

  useEffect(() => {
    if (customer) {
      setFormData(customer)
    }
  }, [customer])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Reset subnature if nature changes
    if (name === "nature") {
      setFormData((prev) => ({
        ...prev,
        subnature: "", // Reset subnature when nature changes
      }))
    }
  }

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Customer Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="category">Customer Category</label>
        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="nature">Nature</label>
        <select id="nature" name="nature" value={formData.nature} onChange={handleChange} required>
          <option value="">Select Nature</option>
          {natureOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="subnature">Subnature</label>
        <select id="subnature" name="subnature" value={formData.subnature} onChange={handleChange} required>
          <option value="">Select Subnature</option>
          {formData.nature && subnatureOptions[formData.nature].map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="regionId">Region</label>
        <select id="regionId" name="regionId" value={formData.regionId} onChange={handleChange}>
          <option value="">Select Region</option>
          {regionData.map((region) => (
            <option key={region[0]} value={region[0]}>{region[1]}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="zoneId">Zone</label>
        <select id="zoneId" name="zoneId" value={formData.zoneId} onChange={handleChange}>
          <option value="">Select Zone</option>
          {zoneData.map((zone) => (
            <option key={zone[0]} value={zone[0]}>{zone[1]}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="territoryId">Territory</label>
        <select id="territoryId" name="territoryId" value={formData.territoryId} onChange={handleChange}>
          <option value="">Select Territory</option>
          {territoryData.map((territory) => (
            <option key={territory[0]} value={territory[0]}>{territory[1]}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="areaId">Area</label>
        <select id="areaId" name="areaId" value={formData.areaId} onChange={handleChange}>
          <option value="">Select Area</option>
          {areaData.map((area) => (
            <option key={area[0]} value={area[0]}>{area[1]}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="routeId">Route</label>
        <select id="routeId" name="routeId" value={formData.routeId} onChange={handleChange}>
          <option value="">Select Route</option>
          {routeData.map((route) => (
            <option key={route[0]} value={route[0]}>{route[1]}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="cnic">CNIC Number</label>
        <input type="text" id="cnic" name="cnic" value={formData.cnic} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="customerCode">Customer Code</label>
        <input type="text" id="customerCode" name="customerCode" value={formData.customerCode} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="priceType">Price Type</label>
        <input type="text" id="priceType" name="priceType" value={formData.priceType} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="ntnNumber">NTN Number</label>
        <input type="text" id="ntnNumber" name="ntnNumber" value={formData.ntnNumber} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="secondary-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          {customer ? "Update Customer" : "Add Customer"}
        </button>
      </div>
    </form>
  )
}

export default CustomerForm
