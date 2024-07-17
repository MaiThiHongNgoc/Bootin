import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cartItems.find(item => item.product_id === product.product_id);

    if (existingItem) {
      // Nếu đã có trong giỏ hàng, tăng số lượng lên
      const updatedCart = cartItems.map(item =>
        item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // Nếu chưa có trong giỏ hàng, thêm mới
      const newCartItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
    }

    // Lưu giỏ hàng vào Local Storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const removeFromCart = (product) => {
    const updatedCart = cartItems.filter(item => item.product_id !== product.product_id);
    setCartItems(updatedCart);

    // Lưu giỏ hàng vào Local Storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.product_id}>
            {item.product_name} - Quantity: {item.quantity}
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addToCart({ product_id: 1, product_name: 'Example Product' })}>
        Add Example Product
      </button>
    </div>
  );
};

export default Cart;
