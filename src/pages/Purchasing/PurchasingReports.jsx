import React from 'react';
import { Link } from 'react-router-dom';
import './PurchasingReport.css'; // Separate CSS file for purchasing report styling

const PurchasingReport = () => {
  return (
    <div className="purchasing-report-page">
      <div className="card-container">
        <div className="card">
          <h3><Link to="/purchase-order-by-customer">Purchase Order by Vendor</Link></h3>
        </div>

        <div className="card">
          <h3><Link to="/purchase-order-by-items">Purchase Order by Items</Link></h3>
        </div>

        <div className="card">
          <h3><Link to="/purchase-order-by-month">Purchase Order by Month</Link></h3>
        </div>
      </div>
    </div>
  );
};

export default PurchasingReport;
