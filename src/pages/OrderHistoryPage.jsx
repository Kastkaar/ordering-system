// src/pages/OrderHistoryPage.js
import React, { useContext, useState } from 'react';
import OrderContext from '../context/OrderContext';
import menuItems from '../data/menuItems.json';
import BackButton from '../components/BackButton';

const OrderHistoryPage = () => {
  const { orders, updateOrderDetails } = useContext(OrderContext);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);

  const handleEditClick = (order) => {
    setEditingOrderId(order.orderId);
    setEditedOrder({ ...order });
  };

  const handleSaveClick = () => {
    const totalPriceBeforeDiscount = calculateTotalPriceBeforeDiscount(editedOrder.items);
    const totalPriceAfterDiscount = calculateTotalPriceAfterDiscount(totalPriceBeforeDiscount, editedOrder.discountPercentage);

    const updatedOrder = {
      ...editedOrder,
      totalPrice: totalPriceAfterDiscount,
    };

    updateOrderDetails(editingOrderId, updatedOrder);
    setEditingOrderId(null);
    setEditedOrder(null);
  };

  const handleCancelClick = () => {
    setEditingOrderId(null);
    setEditedOrder(null);
  };

  const handleInputChange = (field, value) => {
    setEditedOrder({ ...editedOrder, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...editedOrder.items];
    const item = menuItems.find((menuItem) => menuItem.id === parseInt(value));

    if (field === 'itemId') {
      newItems[index] = {
        ...newItems[index],
        itemId: item.id,
        item_name: item.item_name,
        price: item.price,
      };
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }

    setEditedOrder({ ...editedOrder, items: newItems });
  };

  const handleRemoveItem = (index) => {
    const newItems = [...editedOrder.items];
    newItems.splice(index, 1);
    setEditedOrder({ ...editedOrder, items: newItems });
  };

  const handleAddItem = () => {
    const newItems = [
      ...editedOrder.items,
      { itemId: '', item_name: '', price: 0, quantity: 1 },
    ];
    setEditedOrder({ ...editedOrder, items: newItems });
  };

  const calculateTotalPriceBeforeDiscount = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalPriceAfterDiscount = (totalPriceBeforeDiscount, discountPercentage) => {
    const discountAmount = (totalPriceBeforeDiscount * discountPercentage) / 100;
    return totalPriceBeforeDiscount - discountAmount;
  };

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            {editingOrderId === order.orderId ? (
              <div>
                <h2>Order ID: {order.orderId}</h2>
                <label>
                  Customer Name:
                  <input
                    type="text"
                    value={editedOrder.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                  />
                </label>
                <ul>
                  {editedOrder.items.map((item, index) => (
                    <li key={index}>
                      <select
                        value={item.itemId}
                        onChange={(e) =>
                          handleItemChange(index, 'itemId', e.target.value)
                        }
                      >
                        <option value="">--Select an Item--</option>
                        {menuItems.map((menuItem) => (
                          <option key={menuItem.id} value={menuItem.id}>
                            {menuItem.item_name} - ₹{menuItem.price}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, 'quantity', e.target.value)
                        }
                        min="1"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={handleAddItem}>Add Item</button>
                <label>
                  Note:
                  <input
                    type="text"
                    value={editedOrder.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                  />
                </label>
                <label>
                  Status:
                  <select
                    value={editedOrder.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Ready to Serve">Ready to Serve</option>
                  </select>
                </label>
                <label>
                  Discount Percentage:
                  <input
                    type="number"
                    value={editedOrder.discountPercentage}
                    onChange={(e) => handleInputChange('discountPercentage', e.target.value)}
                    min="0"
                    max="100"
                  />
                </label>
                <p>
                  Price Before Discount: ₹
                  {calculateTotalPriceBeforeDiscount(editedOrder.items).toFixed(2)}
                </p>
                <p>
                  Price After Discount: ₹
                  {calculateTotalPriceAfterDiscount(
                    calculateTotalPriceBeforeDiscount(editedOrder.items),
                    editedOrder.discountPercentage
                  ).toFixed(2)}
                </p>
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>Order ID: {order.orderId}</h2>
                <p>Customer Name: {order.customerName}</p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.item_name} - ₹{item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <p>Note: {order.note}</p>
                <p>Status: {order.status}</p>
                <p>Discount Percentage: {order.discountPercentage}%</p>
                <p>
                  Price Before Discount: ₹
                  {calculateTotalPriceBeforeDiscount(order.items).toFixed(2)}
                </p>
                <p>
                  Price After Discount: ₹
                  {calculateTotalPriceAfterDiscount(
                    calculateTotalPriceBeforeDiscount(order.items),
                    order.discountPercentage
                  ).toFixed(2)}
                </p>
                <button onClick={() => handleEditClick(order)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <BackButton />
    </div>
  );
};

export default OrderHistoryPage;
