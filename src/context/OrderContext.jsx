// src/context/OrderContext.js
import React, { createContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);

  const addOrder = (order) => {
    setOrders([...orders, { ...order, status: 'Pending', note: '' }]);
    setNotification('New order has been placed!');

  };

  const updateOrderStatus = (orderId, status = null, note = null) => {
    setOrders(orders.map(order => 
      order.orderId === orderId
        ? { ...order, status: status || order.status, note: note || order.note }
        : order
    ));
    setNotification('Order status has been updated!');

  };

  const updateOrderDetails = (orderId, updatedDetails) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? { ...order, ...updatedDetails }
          : order
      )
    );
    setNotification('Order details have been updated!');

  };
  
  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        updateOrderDetails, 
        notification,
        clearNotification,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
