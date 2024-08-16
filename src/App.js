// src/App.js
import React , { useContext,useEffect }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import WaiterPage from './pages/WaiterPage';
import ChefPage from './pages/ChefPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderContext from './context/OrderContext';


function App() {
  const { notification, clearNotification } = useContext(OrderContext);
  useEffect(() => {
    if (notification) {
      // Show the notification
      alert(notification); // Using `alert` for simplicity
      clearNotification(); // Clear after showing
    }
  }, [notification, clearNotification]);
  return (
      <Router>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/waiter" element={<WaiterPage />} />
          <Route path="/chef" element={<ChefPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
        </Routes>
      </Router>
  );
}

export default App;
