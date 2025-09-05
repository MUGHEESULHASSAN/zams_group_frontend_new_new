// CreateSalesReturn.jsx
import React, { useState } from "react";
import "./CreateSaleInvoice.css"; // reuse same styles

const CreateSalesReturn = ({ onBack }) => {
  const [formData, setFormData] = useState({
    customer: "",
    returnDate: "",
    memo: "",
    warehouse: "",
    dueDate: "",
    project: "",
    reference: "",
    refundTerms: "",
    attachments: null,
    terms: "",
  });

  const [returnLines, setReturnLines] = useState([
    { item: "", account: "", uom: "", quantity: "", rate: "", discount: "", tax: "", total: "" },
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleLineChange = (index, field, value) => {
    const updated = [...returnLines];
    updated[index][field] = value;

    const qty = parseFloat(updated[index].quantity || 0);
    const rate = parseFloat(updated[index].rate || 0);
    const discount = parseFloat(updated[index].discount || 0);
    const tax = parseFloat(updated[index].tax || 0);

    let subtotal = qty * rate;
    let discountAmt = (subtotal * discount) / 100;
    let taxableAmt = subtotal - discountAmt;
    let taxAmt = (taxableAmt * tax) / 100;
    updated[index].total = (taxableAmt + taxAmt).toFixed(2);

    setReturnLines(updated);
  };

  const addLine = () => {
    setReturnLines([
      ...returnLines,
      { item: "", account: "", uom: "", quantity: "", rate: "", discount: "", tax: "", total: "" },
    ]);
  };

  const removeLine = (idx) => {
    setReturnLines(returnLines.filter((_, i) => i !== idx));
  };

  const totalAmount = returnLines.reduce((sum, line) => sum + parseFloat(line.total || 0), 0);
  const totalTax = returnLines.reduce((sum, line) => {
    const qty = parseFloat(line.quantity || 0);
    const rate = parseFloat(line.rate || 0);
    const discount = parseFloat(line.discount || 0);
    const tax = parseFloat(line.tax || 0);
    let subtotal = qty * rate;
    let discountAmt = (subtotal * discount) / 100;
    let taxableAmt = subtotal - discountAmt;
    return sum + (taxableAmt * tax) / 100;
  }, 0);

  return (
    <div className="create-invoice-page">
      <h2>Create Sales Return</h2>

      <div className="form-grid">
        <label>
          Customer*:
          <input type="text" name="customer" value={formData.customer} onChange={handleChange} required />
        </label>
        <label>
          Return Date*:
          <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
        </label>
        <label>
          Memo:
          <input type="text" name="memo" value={formData.memo} onChange={handleChange} />
        </label>
        <label>
          Warehouse*:
          <input type="text" name="warehouse" value={formData.warehouse} onChange={handleChange} required />
        </label>
        <label>
          Due Date:
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        </label>
        <label>
          Project:
          <input type="text" name="project" value={formData.project} onChange={handleChange} />
        </label>
        <label>
          Reference:
          <input type="text" name="reference" value={formData.reference} onChange={handleChange} />
        </label>
        <label>
          Refund Terms:
          <input type="text" name="refundTerms" value={formData.refundTerms} onChange={handleChange} />
        </label>
        <label>
          Attachments:
          <input type="file" name="attachments" onChange={handleChange} />
        </label>
      </div>

      <h3>Return Lines</h3>
      <table className="invoice-lines">
        <thead>
          <tr>
            <th>Item</th>
            <th>Account</th>
            <th>UOM</th>
            <th>Quantity*</th>
            <th>Rate*</th>
            <th>Discount %</th>
            <th>Tax %</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {returnLines.map((line, idx) => (
            <tr key={idx}>
              <td><input value={line.item} onChange={(e) => handleLineChange(idx, "item", e.target.value)} /></td>
              <td><input value={line.account} onChange={(e) => handleLineChange(idx, "account", e.target.value)} /></td>
              <td><input value={line.uom} onChange={(e) => handleLineChange(idx, "uom", e.target.value)} /></td>
              <td><input type="number" value={line.quantity} onChange={(e) => handleLineChange(idx, "quantity", e.target.value)} /></td>
              <td><input type="number" value={line.rate} onChange={(e) => handleLineChange(idx, "rate", e.target.value)} /></td>
              <td><input type="number" value={line.discount} onChange={(e) => handleLineChange(idx, "discount", e.target.value)} /></td>
              <td><input type="number" value={line.tax} onChange={(e) => handleLineChange(idx, "tax", e.target.value)} /></td>
              <td>{line.total}</td>
              <td><button onClick={() => removeLine(idx)}>❌</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn add-line" onClick={addLine}>+ Add Line</button>

      <h3>Terms and Conditions</h3>
      <textarea
        name="terms"
        value={formData.terms}
        onChange={handleChange}
        placeholder="Enter terms and conditions..."
      ></textarea>

      <div className="totals">
        <p>Total Tax Amount: <strong>${totalTax.toFixed(2)}</strong></p>
        <p>Total Gross Amount: <strong>${totalAmount.toFixed(2)}</strong></p>
      </div>

      <div className="form-actions">
        <button className="btn" onClick={onBack}>Back</button>
        <button className="btn submit-btn">Save Return</button>
      </div>
    </div>
  );
};

export default CreateSalesReturn;
