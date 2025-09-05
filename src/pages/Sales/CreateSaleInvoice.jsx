// CreateSaleInvoice.jsx
import React, { useState } from "react";
import "./CreateSaleInvoice.css";

const CreateSaleInvoice = ({ onBack }) => {
  const [formData, setFormData] = useState({
    customer: "",
    invoiceDate: "",
    memo: "",
    warehouse: "",
    dueDate: "",
    project: "",
    reference: "",
    paymentTerms: "",
    attachments: null,
    terms: "",
  });

  const [invoiceLines, setInvoiceLines] = useState([
    { item: "", account: "", uom: "", quantity: "", rate: "", discount: "", tax: "", total: "" },
  ]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle invoice line input
  const handleLineChange = (index, field, value) => {
    const updatedLines = [...invoiceLines];
    updatedLines[index][field] = value;

    // Auto calculate total per line
    const qty = parseFloat(updatedLines[index].quantity || 0);
    const rate = parseFloat(updatedLines[index].rate || 0);
    const discount = parseFloat(updatedLines[index].discount || 0);
    const tax = parseFloat(updatedLines[index].tax || 0);

    let subtotal = qty * rate;
    let discountAmt = (subtotal * discount) / 100;
    let taxableAmt = subtotal - discountAmt;
    let taxAmt = (taxableAmt * tax) / 100;
    updatedLines[index].total = (taxableAmt + taxAmt).toFixed(2);

    setInvoiceLines(updatedLines);
  };

  // Add new invoice line
  const addLine = () => {
    setInvoiceLines([
      ...invoiceLines,
      { item: "", account: "", uom: "", quantity: "", rate: "", discount: "", tax: "", total: "" },
    ]);
  };

  // Remove line
  const removeLine = (idx) => {
    setInvoiceLines(invoiceLines.filter((_, i) => i !== idx));
  };

  // Totals
  const totalAmount = invoiceLines.reduce((sum, line) => sum + parseFloat(line.total || 0), 0);
  const totalTax = invoiceLines.reduce((sum, line) => {
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
      <h2>Create Sale Invoice</h2>

      <div className="form-grid">
        <label>
          Customer*:
          <input type="text" name="customer" value={formData.customer} onChange={handleChange} required />
        </label>
        <label>
          Invoice Date*:
          <input type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} required />
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
          Payment Terms:
          <input type="text" name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} />
        </label>
        <label>
          Attachments:
          <input type="file" name="attachments" onChange={handleChange} />
        </label>
      </div>

      <h3>Invoice Lines</h3>
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
          {invoiceLines.map((line, idx) => (
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
        <button className="btn submit-btn">Save Invoice</button>
      </div>
    </div>
  );
};

export default CreateSaleInvoice;
