"use client"

import { useState } from "react"
import "./AccountTable.css"

const AccountTable = ({ searchTerm, onEditAccount, onAddAccount }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  // Sample data matching the image structure
  const accounts = [
    {
      code: "200101",
      name: "Accounts Payable",
      parent: "Current Liabilities",
      type: "Liabilities",
      subType: "Current Liabilities",
      createdDate: "1/1/1970",
      isGroup: false,
      company: "J Khanz Enterprises",
    },
    {
      code: "100102",
      name: "Accounts Receivable",
      parent: "Current Assets",
      type: "Assets",
      subType: "Current Assets",
      createdDate: "1/1/1970",
      isGroup: false,
      company: "J Khanz Enterprises",
    },
    {
      code: "100202",
      name: "Accumulated Depreciation",
      parent: "Non-Current Assets",
      type: "Assets",
      subType: "Non-Current Assets",
      createdDate: "1/1/1970",
      isGroup: false,
      company: "J Khanz Enterprises",
    },
    {
      code: "3003",
      name: "Additional Paid-in Capital",
      parent: "Equity",
      type: "Equity",
      subType: "Equity",
      createdDate: "1/1/1970",
      isGroup: false,
      company: "J Khanz Enterprises",
    },
    {
      code: "500205",
      name: "Amortization Expense",
      parent: "Operating Expenses",
      type: "Expenses",
      subType: "Expenses",
      createdDate: "1/1/1970",
      isGroup: false,
      company: "J Khanz Enterprises",
    },
    {
      code: "10",
      name: "Assets",
      parent: "",
      type: "Assets",
      subType: "Assets",
      createdDate: "1/1/1970",
      isGroup: true,
      company: "J Khanz Enterprises",
    },
    {
      code: "100101",
      name: "Cash and Bank",
      parent: "Current Assets",
      type: "Assets",
      subType: "Bank",
      createdDate: "1/1/1970",
      isGroup: true,
      company: "J Khanz Enterprises",
    },
    {
      code: "10010101",
      name: "Cash in Hand",
      parent: "Cash and Bank",
      type: "Assets",
      subType: "Bank",
      createdDate: "1/1/1970",
      isGroup: false,
      company: "J Khanz Enterprises",
    },
    {
      code: "3001",
      name: "Common Stock",
      parent: "Equity",
      type: "Equity",
      subType: "Equity",
      createdDate: "1/1/1970",
      isGroup: false,
      company: "J Khanz Enterprises",
    },
    {
      code: "5001",
      name: "Cost of Goods Sold (COGS)",
      parent: "Expenses",
      type: "Expenses",
      subType: "Cost of Sales",
      createdDate: "1/1/1970",
      isGroup: true,
      company: "J Khanz Enterprises",
    },
  ]

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(
    (account) => account.name.toLowerCase().includes(searchTerm.toLowerCase()) || account.code.includes(searchTerm),
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredAccounts.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const currentAccounts = filteredAccounts.slice(startIndex, endIndex)

  return (
    <div className="account-table-container">
      <div className="table-wrapper">
        <table className="account-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="checkbox" />
              </th>
              <th>Account Code ↕</th>
              <th>Account Name</th>
              <th>Parent Account</th>
              <th>Account Type</th>
              <th>Sub Type</th>
              <th>Created Date</th>
              <th>Is Group</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {currentAccounts.map((account, index) => (
              <tr key={account.code}>
                <td>
                  <input type="checkbox" className="checkbox" />
                </td>
                <td>{account.code}</td>
                <td>{account.name}</td>
                <td>{account.parent}</td>
                <td>{account.type}</td>
                <td>{account.subType}</td>
                <td>{account.createdDate}</td>
                <td>
                  <span className={`badge ${account.isGroup ? "badge-yes" : "badge-no"}`}>
                    {account.isGroup ? "Yes" : "No"}
                  </span>
                </td>
                <td>{account.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-actions">
        <div className="entries-control">
          <span className="entries-label">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="entries-select"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="entries-label">Entries</span>
        </div>

        <div className="pagination-controls">
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>

          <div className="pagination-buttons">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="pagination-btn">
              ≪
            </button>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              ›
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              ≫
            </button>
          </div>

          <div className="page-input-control">
            <span className="page-input-label">Go to Page:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = Math.max(1, Math.min(totalPages, Number(e.target.value)))
                setCurrentPage(page)
              }}
              className="page-input"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountTable
