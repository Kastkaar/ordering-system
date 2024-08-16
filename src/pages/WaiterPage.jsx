// src/pages/WaiterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import WaiterOrderForm from '../components/WaiterOrderForm';
import BackButton from '../components/BackButton';
import menuItems from '../data/menuItems.json'; // Import the JSON file

const WaiterPage = () => {
  return (
    <div>
      <h1>Waiter Page</h1>
      <p>Welcome, Waiter! You can manage orders here.</p>
      <WaiterOrderForm items={menuItems} />
      <BackButton />
      <Link to="/order-history">View Order History</Link>
    </div>
  );
};

export default WaiterPage;
