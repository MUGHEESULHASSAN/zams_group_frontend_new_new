import React from 'react';
import { Link } from 'react-router-dom';
import './SalesReport.css'; // Assuming you have a CSS file for styling

const SalesReport = () => {
  return (
    <div className="sales-report-page">
      <div className="card-container">
        <div className="card">
          <h3><Link to="/sales-order-by-customer">Sales Order by Customer</Link></h3>
        </div>

        <div className="card">
          <h3><Link to="/sales-order-by-items">Sales Order by Items</Link></h3>
        </div>

        <div className="card">
          <h3><Link to="/sales-order-by-month">Sales Order by Month</Link></h3>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
