"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBankCashReceiptVoucher.css";

const CreateBankCashReceiptVoucher = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    transactionNumber: "RCP-001",
    transactionDate: "",
    account: "",
    paymentType: "",
    customer: "",
    status: "Draft",
    subsidiary: "",
    location: "",
    referenceNo: "",
    department: "",
    project: "",
    memo: "",
    attachments: [],
    receiptLines: [
      {
        entity: "",
        account: "",
        receiptAmount: 0,
        memo: "",
        category: "",
        whtItem: "",
        whtAccount: "",
      },
    ],
    totalAmount: 0,
    taxAmount: 0,
    grossAmount: 0,
  });

  // 🔹 Handle general form changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files : value,
    }));
  };

  // 🔹 Handle changes inside receipt lines
  const handleLineChange = (index, field, value) => {
    const updated = [...formData.receiptLines];
    updated[index][field] =
      field === "receiptAmount" ? Number(value) : value;

    const totalAmount = updated.reduce(
      (sum, l) => sum + (l.receiptAmount || 0),
      0
    );
    const taxAmount = totalAmount * 0.1; // Example: 10% tax
    const grossAmount = totalAmount + taxAmount;

    setFormData((prev) => ({
      ...prev,
      receiptLines: updated,
      totalAmount,
      taxAmount,
      grossAmount,
    }));
  };

  // 🔹 Add new receipt line
  const addLine = () => {
    setFormData((prev) => ({
      ...prev,
      receiptLines: [
        ...prev.receiptLines,
        {
          entity: "",
          account: "",
          receiptAmount: 0,
          memo: "",
          category: "",
          whtItem: "",
          whtAccount: "",
        },
      ],
    }));
  };

  // 🔹 Remove a receipt line
  const removeLine = (index) => {
    const updated = formData.receiptLines.filter((_, i) => i !== index);
    const totalAmount = updated.reduce(
      (sum, l) => sum + (l.receiptAmount || 0),
      0
    );
    const taxAmount = totalAmount * 0.1;
    const grossAmount = totalAmount + taxAmount;

    setFormData((prev) => ({
      ...prev,
      receiptLines: updated,
      totalAmount,
      taxAmount,
      grossAmount,
    }));
  };

  // 🔹 Save form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Receipt Voucher:", formData);
    navigate("/bank-cash-receipt-vouchers");
  };

  return (
    <div className="voucher-form-page">
      <button
        className="back-btn"
        onClick={() => navigate("/bank-cash-receipt-voucher")}
      >
        ← Back
      </button>

      <h2>Create Bank / Cash Receipt Voucher</h2>

      <form onSubmit={handleSubmit}>
        {/* Form Section */}
        <div className="form-section">
          <label>
            Transaction Number
            <input type="text" value={formData.transactionNumber} disabled />
          </label>

          <label>
            Transaction Date *
            <input
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Account *
            <input
              type="text"
              name="account"
              value={formData.account}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Payment Type *
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Bank">Bank</option>
              <option value="Cash">Cash</option>
            </select>
          </label>

          <label>
            Customer
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
            />
          </label>

          <label>
            Status *
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Draft">Draft</option>
              <option value="Approved">Approved</option>
              <option value="Closed">Closed</option>
            </select>
          </label>

          <label>
            Subsidiary
            <input
              type="text"
              name="subsidiary"
              value={formData.subsidiary}
              onChange={handleChange}
            />
          </label>

          <label>
            Location
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          <label>
            Reference No
            <input
              type="text"
              name="referenceNo"
              value={formData.referenceNo}
              onChange={handleChange}
            />
          </label>

          <label>
            Department
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </label>

          <label>
            Project
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
            />
          </label>

          <label>
            Memo
            <textarea
              name="memo"
              value={formData.memo}
              onChange={handleChange}
            />
          </label>

          <label>
            Attachments
            <input
              type="file"
              multiple
              onChange={handleChange}
              name="attachments"
            />
          </label>
        </div>

        {/* Receipt Lines */}
        <div className="receipt-lines">
          <h3>Receipt Lines</h3>
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Entity</th>
                <th>Account</th>
                <th>Receipt Amount</th>
                <th>Memo</th>
                <th>Category</th>
                <th>WHT Item</th>
                <th>WHT Account</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.receiptLines.map((line, idx) => (
                <tr key={idx}>
                  <td>
                    <input
                      type="text"
                      value={line.entity}
                      onChange={(e) =>
                        handleLineChange(idx, "entity", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.account}
                      onChange={(e) =>
                        handleLineChange(idx, "account", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={line.receiptAmount}
                      onChange={(e) =>
                        handleLineChange(idx, "receiptAmount", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.memo}
                      onChange={(e) =>
                        handleLineChange(idx, "memo", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.category}
                      onChange={(e) =>
                        handleLineChange(idx, "category", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.whtItem}
                      onChange={(e) =>
                        handleLineChange(idx, "whtItem", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.whtAccount}
                      onChange={(e) =>
                        handleLineChange(idx, "whtAccount", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="remove-line-btn"
                      onClick={() => removeLine(idx)}
                    >
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="add-line-btn"
            onClick={addLine}
          >
            + Add Line
          </button>
        </div>

        {/* Summary */}
        <div className="summary">
          <h3>Summary</h3>
          <div className="summary-item">
            <span>Total Amount:</span>
            <span>{formData.totalAmount}</span>
          </div>
          <div className="summary-item">
            <span>Tax Amount:</span>
            <span>{formData.taxAmount}</span>
          </div>
          <div className="summary-item">
            <span>Gross Amount:</span>
            <span>{formData.grossAmount}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/bank-cash-receipt-voucher")}
          >
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBankCashReceiptVoucher;
