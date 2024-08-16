import React, { useState, useEffect, useContext } from 'react';
import OrderContext from '../context/OrderContext';

const WaiterOrderForm = ({ items }) => {
  const { addOrder } = useContext(OrderContext);
  const [customerName, setCustomerName] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      orderItems.forEach(({ itemId, quantity }) => {
        const item = items.find((item) => item.id === parseInt(itemId));
        const validQuantity = quantity ? parseInt(quantity) : 1; // Default quantity to 1 if blank
        if (item) {
          total += item.price * validQuantity;
        }
      });

      // Apply discount
      const discountAmount = (total * discountPercentage) / 100;
      const finalPrice = total - discountAmount;

      setTotalPrice(finalPrice);
    };

    calculateTotalPrice();
  }, [orderItems, items, discountPercentage]);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { itemId: '', quantity: 1 }]); // Default quantity to 1
  };

  const handleRemoveItem = (index) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index, 1);
    setOrderItems(newOrderItems);
  };

  const handleItemChange = (index, field, value) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index][field] = value;
    setOrderItems(newOrderItems);
  };

  const generateRandomOrderId = () => {
    // Combine Date.now() and Math.random() for a unique order ID
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      orderId: generateRandomOrderId(),
      customerName,
      items: orderItems.map(({ itemId, quantity }) => {
        const item = items.find((item) => item.id === parseInt(itemId));
        const validQuantity = quantity ? parseInt(quantity) : 1;
        return { ...item, quantity: validQuantity };
      }),
      totalPrice,
      discountPercentage,
    };
    console.log('Order Submitted:', order);
    addOrder(order);

    // Clear form for new order
    setCustomerName('');
    setOrderItems([]);
    setDiscountPercentage(0); // Reset discount
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <h3>Order Items</h3>
        {orderItems.map((orderItem, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <select
              value={orderItem.itemId}
              onChange={(e) =>
                handleItemChange(index, 'itemId', e.target.value)
              }
              required
            >
              <option value="">--Select an Item--</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.item_name} - ₹{item.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={orderItem.quantity}
              min="1"
              onChange={(e) =>
                handleItemChange(index, 'quantity', e.target.value)
              }
              required
              style={{ marginLeft: '10px', width: '50px' }}
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              style={{ marginLeft: '10px' }}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
      </div>
      <div>
        <label htmlFor="discountPercentage">Discount (%):</label>
        <input
          type="number"
          id="discountPercentage"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
          min="0"
          max="100"
          style={{ marginLeft: '10px', width: '60px' }}
        />
      </div>
      <h3>Total Price after Discount: ₹{totalPrice.toFixed(2)}</h3>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default WaiterOrderForm;
