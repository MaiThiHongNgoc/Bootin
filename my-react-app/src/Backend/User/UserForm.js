import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../Service/userService';
import './UserForm.css';

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: '',  // Do not pre-fill the password
        role: user.role,
      });
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'customer',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUser({ ...user, ...formData });
      } else {
        await createUser(formData);
      }
      setFormData({ username: '', email: '', password: '', role: 'customer' });
      onSave();
    } catch (error) {
      console.error('Failed to save user', error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button className="user-form-button-save" type="submit">Save</button>
    </form>
  );
};

export default UserForm;
