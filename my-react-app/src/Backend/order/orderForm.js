import React, { useState, useEffect } from 'react';
import { createOrder, updateOrder } from '../Service/orderService';
import './orderForm.css';

const OrderForm = ({ order, onSave }) => {
  const [formData, setFormData] = useState({
    user: {
      user_id: '',
    },
    total_amount: '',
    status: 'PENDING',
    paymentMethods: {
      payment_method_id: ''
    }
  });

  useEffect(() => {
    if (order) {
      setFormData({
        user: {
          user_id: order.user.user_id,
        },
        total_amount: order.total_amount,
        status: order.status,
        paymentMethods: {
          payment_method_id: order.paymentMethods.payment_method_id,
        }
      });
    } else {
      setFormData({
        user: {
          user_id: '',
        },
        total_amount: '',
        status: 'PENDING',
        paymentMethods: {
          payment_method_id: ''
        }
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('user.')) {
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [name.split('.')[1]]: value
        }
      });
    } else if (name.startsWith('paymentMethods.')) {
      setFormData({
        ...formData,
        paymentMethods: {
          ...formData.paymentMethods,
          [name.split('.')[1]]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (order) {
        await updateOrder(order.order_id, formData);
      } else {
        await createOrder(formData);
      }
      setFormData({
        user: {
          user_id: '',
        },
        total_amount: '',
        status: 'PENDING',
        paymentMethods: {
          payment_method_id: ''
        }
      });
      onSave(); // Notify parent component of successful save
    } catch (error) {
      console.error('Failed to save order', error);
      // Implement error handling here, e.g., set error state
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div>
        <label>User ID</label>
        <input
          type="number"
          name="user.user_id"
          value={formData.user.user_id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Total Amount</label>
        <input
          type="number"
          name="total_amount"
          value={formData.total_amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Payment Method ID</label>
        <input
          type="number"
          name="paymentMethods.payment_method_id"
          value={formData.paymentMethods.payment_method_id}
          onChange={handleChange}
        />
      </div>
      <button className="order-form-button-save" type="submit">Save</button>
    </form>
  );
};

export default OrderForm;
