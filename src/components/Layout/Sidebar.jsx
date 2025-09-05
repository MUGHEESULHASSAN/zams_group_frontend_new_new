"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Sidebar.css"
import "../../pages/Inventory/Settings/BrandManagement"
import "../../pages/Inventory/Settings/CategoryManagement"
import "../../pages/Inventory/Settings/ColorManagement"
import "../../pages/Inventory/Settings/TaxCodeManagement"
import "../../pages/Inventory/Settings/UnitTypeManagement"
import "../../pages/Sales/CustomerCategoryManagement"
import "../../pages/Sales/SalesReports"
import "../../pages/Purchasing/PurchasingReports"
import "../../pages/Sales/SalesInvoice"
import "../../pages/Sales/CreateSaleInvoice"
import "../../pages/Sales/SalesReturn"
import "../../pages/Sales/SalesDelivery"
import "../../pages/Finance/BankCashPaymentVoucher"
import "../../pages/Finance/BankCashReceiptVoucher"
import "../../pages/Finance/AccountingPeriod"
import "../../pages/Finance/FixedAssetRegister"
import path from "path"



const Sidebar = ({ isOpen }) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState({})

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }))
  }

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "🏠" },
    {
      label: "Sales",
      icon: "💰",
      key: "sales",
      submenu: [
        { path: "/sales", label: "Sale Orders" },
        { path: "/sales-delivery", label: "Sale Delivery" },
        { path: "/sales-invoice", label: "Sale Invoice" },
        { path: "/sales-return", label: "Sale Return" },
        { path: "/customers", label: "Customers" },
        { path: "/CustomerCategoryManagement", label: "Customers Category" },
        { path: "/opportunities", label: "Opportunities" },
        { path: "/quotes", label: "Quotes" },
        { path: "/SalesReports", label: "Sales Report" },

      ],
    },
    { path: "/", label: "Inventory", icon: "📦" ,key: "inventory",
        submenu: [
        { path: "/inventory", label: "Inventory" },
        { path: "/BrandManagement", label: "Brand Management" },
        { path: "/CategoryManagement", label: "Category Management" },
        { path: "/ColorManagement", label: "Color Management" },
        { path: "/TaxCodeManagement", label: "Tax Code Management" },
        { path: "/UnitTypeManagement", label: "Unit Type Management" },
      ],

    },

    {
      label: "Purchasing",
      icon: "🛒",
      key: "purchasing",
      submenu: [
        { path: "/purchasing", label: "Purchase Orders" },
        { path: "/goods-received-notes", label: "Goods Received Notes" },
        { path: "/purchase_invoice", label: "Purchase Invoice" },
        { path: "/purchase_return", label: "Purchase Return" },
        { path: "/vendors", label: "Vendors" },
        { path: "/receipts", label: "Receipts" },
        { path: "/vendor-category", label: "Vendor Category" },
        { path: "/purchasing-reports", label: "Purchasing Reports" },
      ],
    },
    {
      label: "Human Resources",
      icon: "👥",
      key: "hr",
      submenu: [
        { path: "/hr", label: "Employees" },
        { path: "/departments", label: "Departments" },
        { path: "/leave", label: "Leave Management" },
      ],
    },
    {
      label: "Finance",
      icon: "💳",
      key: "finance",
      submenu: [
        { path: "/finance", label: "Transactions" },
        { path: "/invoices", label: "Invoices" },
        { path: "/expense-entry", label: "Expense Entry" },
        { path: "/journal-entry", label: "Journal Entry" },
        { path: "/bank-cash-payment-voucher", label: "Bank / Cash Payment Voucher" },
        { path: "/bank-cash-receipt-voucher", label: "Bank / Cash Receipt Voucher" },
        { path: "/accounting-period", label: "Accounting Period" },
        { path: "/fixed-asset-register", label: "Fixed Asset Register" },
        { path: "/finance-reports", label: "Finance Reports" }
      ],
    },
    { path: "/reports", label: "Reports", icon: "📊" },
    { path: "/calendar", label: "Calendar", icon: "📅" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-content">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            {item.submenu ? (
              <>
                <button
                  className={`menu-link submenu-toggle ${expandedMenus[item.key] ? "expanded" : ""}`}
                  onClick={() => toggleMenu(item.key)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  <span className="arrow">▼</span>
                </button>
                {expandedMenus[item.key] && (
                  <div className="submenu">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`submenu-link ${location.pathname === subItem.path ? "active" : ""}`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link to={item.path} className={`menu-link ${location.pathname === item.path ? "active" : ""}`}>
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
