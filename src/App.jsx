import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext" // Import AuthProvider
import PrivateRoute from "./components/Auth/PrivateRoute" // Import PrivateRoute
import Layout from "./components/Layout/Layout"
import Dashboard from "./pages/Dashboard/Dashboard"
import Sales from "./pages/Sales/Sales"
import Customers from "./pages/Sales/Customers"
import Opportunities from "./pages/Sales/Opportunities"
import Quotes from "./pages/Sales/Quotes"
import Inventory from "./pages/Inventory/Inventory"
import Purchasing from "./pages/Purchasing/Purchasing"
import Vendors from "./pages/Purchasing/Vendors"
import Receipts from "./pages/Purchasing/Receipts"
import VendorCategory from "./pages/Purchasing/VendorCategory"
import HumanResources from "./pages/HR/HumanResources"
import Departments from "./pages/HR/Departments"
import LeaveManagement from "./pages/HR/LeaveManagement"
import Finance from "./pages/Finance/Finance"
import Invoices from "./pages/Finance/Invoices"
import Reports from "./pages/Reports/Reports"
import Calendar from "./pages/Calendar/Calendar"
import Settings from "./pages/Settings/Settings"
import Profile from "./pages/Settings/Profile"
import Company from "./pages/Settings/Company"
import LoginPage from "./pages/Auth/LoginPage" // Import LoginPage
import RegisterPage from "./pages/Auth/RegisterPage" // Import RegisterPage
import AttendanceReports from "./pages/HR/AttendanceReports" // Import new AttendanceReports
import PayrollCalculation from "./pages/HR/PayrollCalculation"
import BrandManagement from "./pages/Inventory/Settings/BrandManagement"
import CategoryManagement from "./pages/Inventory/Settings/CategoryManagement"
import ColorManagement from "./pages/Inventory/Settings/ColorManagement"
import TaxCodeManagement from "./pages/Inventory/Settings/TaxCodeManagement"
import UnitTypeManagement from "./pages/Inventory/Settings/UnitTypeManagement"
import CustomerCategoryManagement from "./pages/Sales/CustomerCategoryManagement"
import SalesReport from "./pages/Sales/SalesReports"
import SalesOrderByCustomer from "./pages/Sales/SalesOrderByCustomer"
import SalesOrderByItems from "./pages/Sales/SalesOrderByItems"
import SalesOrderByMonth from "./pages/Sales/SalesOrderByMonth"
import PurchasingReport from "./pages/Purchasing/PurchasingReports" // Import PurchasingReport
// import VendorForm from "./pages/Purchasing/VendorForm" // Import CustomerCategoryManagement
import PurchaseOrderByCustomer from "./pages/Purchasing/PurchaseOrderByCustomer"
import PurchaseOrderByItems from "./pages/Purchasing/PurchaseOrderByItems"
import PurchaseOrderByMonth from "./pages/Purchasing/PurchaseOrderByMonth"
import ExpensEntry from "./pages/Finance/ExpenseEntry"
import JournalEntry from "./pages/Finance/JournalEntry"
import FinanceReports from "./pages/Finance/Reports"



import "./App.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        {" "}
        {/* Wrap the entire application with AuthProvider */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/opportunities" element={<Opportunities />} />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/purchasing" element={<Purchasing />} />
                    <Route path="/vendors" element={<Vendors />} />
                    <Route path="/receipts" element={<Receipts />} />
                    <Route path="/vendor-category" element={<VendorCategory />} />
                    <Route path="/hr" element={<HumanResources />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/leave" element={<LeaveManagement />} />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/expense-entry" element={<ExpensEntry />} />
                    <Route path="/journal-entry" element={<JournalEntry />} />
                    <Route path="/finance-reports" element={<FinanceReports />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/hr/attendance-reports" element={<AttendanceReports />} />{" "}
                    {/* New route for attendance reports */}
                    <Route path="/hr/payroll-calculation" element={<PayrollCalculation />} />
                    <Route path="/BrandManagement" element={<BrandManagement />} />
                    <Route path="/CategoryManagement" element={<CategoryManagement />} />
                    <Route path="/ColorManagement" element={<ColorManagement />} />
                    <Route path="/TaxCodeManagement" element={<TaxCodeManagement />} />
                    <Route path="/UnitTypeManagement" element={<UnitTypeManagement />} />
                    <Route path="/CustomerCategoryManagement" element={<CustomerCategoryManagement />} />
                    <Route path="/SalesReports" element={<SalesReport />} />
                    <Route path="/sales-order-by-customer" element={<SalesOrderByCustomer />} />
                    <Route path="/sales-order-by-items" element={<SalesOrderByItems />} />
                    <Route path="/sales-order-by-month" element={<SalesOrderByMonth />} />
                    <Route path="/purchasing-reports" element={<PurchasingReport />} />
                    <Route path="/purchase-order-by-customer" element={<PurchaseOrderByCustomer />} />
                    <Route path="/purchase-order-by-items" element={<PurchaseOrderByItems />} />
                    <Route path="/purchase-order-by-month" element={<PurchaseOrderByMonth />} />

                    {/* Add other routes as needed */}
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
