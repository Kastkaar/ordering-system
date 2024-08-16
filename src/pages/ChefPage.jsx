// src/pages/ChefPage.js
import React, { useContext } from 'react';
import OrderContext from '../context/OrderContext';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';


const ChefPage = () => {
  const { orders, updateOrderStatus } = useContext(OrderContext);

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
  };

  const handleNoteChange = (orderId, note) => {
    updateOrderStatus(orderId, null, note); // Update only the note
  };

  return (
    <div>
      <h1>Chef Page</h1>
      <Link to="/order-history">View Order History</Link>
      <p>All Orders:</p>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            <h2>Order ID: {order.orderId}</h2>
            <p>Customer Name: {order.customerName}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.item_name} - ₹{item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p>Total Price: ₹{order.totalPrice}</p>
            <p>Status: {order.status || 'Pending'}</p>
            <select
              value={order.status || 'Pending'}
              onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Cooking">Cooking</option>
              <option value="Ready to Serve">Ready to Serve</option>
            </select>
            <div>
              <label htmlFor={`note-${order.orderId}`}>Note:</label>
              <input
                type="text"
                id={`note-${order.orderId}`}
                value={order.note || ''}
                onChange={(e) => handleNoteChange(order.orderId, e.target.value)}
              />
            </div>
          </li>
        ))}
      </ul>
      <BackButton />
    </div>
  );
};

export default ChefPage;
