"use client"

import "./AccountTable.css"

const AccountTable = ({ searchTerm, onEditAccount, onAddAccount }) => {
  const accounts = [
    {
      id: 1,
      name: "ASSET",
      accountNumber: "10",
      typeName: "ASSETS",
      isSummary: true,
      parentName: "",
      level: 1,
    },
    {
      id: 2,
      name: "CURRENT ASSET",
      accountNumber: "1001",
      typeName: "CURRENT ASSET",
      isSummary: true,
      parentName: "10 - ASSET",
      level: 2,
    },
    {
      id: 3,
      name: "ACCOUNTS RECEIVABLE",
      accountNumber: "100101",
      typeName: "ACCOUNTS RECEIVABLE",
      isSummary: true,
      parentName: "1001 - CURRENT ASSET",
      level: 3,
    },
    {
      id: 4,
      name: "INTER COMPANY ASSET",
      accountNumber: "10010101",
      typeName: "ACCOUNTS RECEIVABLE",
      isSummary: false,
      parentName: "100101 - ACCOUNTS RECEIVABLE",
      level: 4,
    },
    {
      id: 5,
      name: "ACCOUNT RECEIVABLE",
      accountNumber: "10010102",
      typeName: "ACCOUNTS RECEIVABLE",
      isSummary: false,
      parentName: "100101 - ACCOUNTS RECEIVABLE",
      level: 4,
    },
    {
      id: 6,
      name: "CASH & BANK",
      accountNumber: "100102",
      typeName: "CASH & BANK",
      isSummary: true,
      parentName: "1001 - CURRENT ASSET",
      level: 3,
    },
    {
      id: 7,
      name: "CASH IN HAND",
      accountNumber: "10010201",
      typeName: "CASH & BANK",
      isSummary: true,
      parentName: "100102 - CASH & BANK",
      level: 4,
    },
    {
      id: 8,
      name: "LIABILITY",
      accountNumber: "2001",
      typeName: "CURRENT LIABILITY",
      isSummary: true,
      parentName: "",
      level: 1,
    },
    {
      id: 9,
      name: "TAX PAYABLES",
      accountNumber: "200107",
      typeName: "CURRENT LIABILITY",
      isSummary: true,
      parentName: "2001 - CURRENT LIABILITY",
      level: 3,
    },
    {
      id: 10,
      name: "FURTHER TAX PAYABLE",
      accountNumber: "20010702",
      typeName: "CURRENT LIABILITY",
      isSummary: false,
      parentName: "200107 - TAX PAYABLES",
      level: 4,
    },
  ]

  const filteredAccounts = accounts.filter((account) => account.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="account-table-container">
      <table className="account-table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Type Name</th>
            <th>Is Summary</th>
            <th>Parent Name</th>
            <th>Levels</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.id}>
              <td>
                <div className="account-row">
                  <button className="edit-btn" onClick={() => onEditAccount(account)}>
                    ✏️
                  </button>
                  <span className="account-name">{account.name}</span>
                </div>
              </td>
              <td>{account.accountNumber}</td>
              <td>{account.typeName}</td>
              <td>
                <input type="checkbox" checked={account.isSummary} readOnly className="summary-checkbox" />
              </td>
              <td>{account.parentName}</td>
              <td>{account.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AccountTable
