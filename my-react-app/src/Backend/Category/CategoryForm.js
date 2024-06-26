import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../Service/categoryService';
import './CategoryForm.css'

const CategoryForm = ({ category, onSave }) => {
    const [formData, setFormData] = useState({
      category_name: '',
      description: '',
    });
  
    useEffect(() => {
      if (category) {
        setFormData({
          category_name: category.category_name,
          description: category.description,
        });
      } else {
        setFormData({
          category_name: '',
          description: '',
        });
      }
    }, [category]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (category) {
          await updateCategory(category.category_id, formData);
        } else {
          await createCategory(formData);
        }
        setFormData({ category_name: '', description: '' });
        onSave();
      } catch (error) {
        console.error('Failed to save category', error);
      }
    };
  
    return (
      <form className="category-form" onSubmit={handleSubmit}>
        <div>
          <label>Category Name</label>
          <input
            type="text"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button className="category-form-button-save" type="submit">
          Save
        </button>
      </form>
    );
  };
  
  export default CategoryForm;