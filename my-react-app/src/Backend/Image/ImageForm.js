import React, { useState, useEffect } from 'react';
import { getProducts } from '../Service/productService';
import imgService from '../Service/imgService';

const ImageForm = ({ img_product, onSave }) => {
  const [formData, setFormData] = useState({
      img_name: '',
      img_url: '',
      product: { product_id: '' },
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
      loadProducts();
  }, []);

  useEffect(() => {
      if (img_product) {
          setFormData({
              img_name: img_product.img_name,
              img_url: img_product.img_url,
              product: { product_id: img_product.product.product_id }
          });
      } else {
          setFormData({
              img_name: '',
              img_url: '',
              product: { product_id: '' }
          });
      }
  }, [img_product]);

  const loadProducts = async () => {
      setLoading(true);
      setError('');
      try {
          const response = await getProducts();
          if (Array.isArray(response.data.content)) {
              setProducts(response.data.content);
          } else {
              setProducts([]);
          }
      } catch (error) {
          console.error('Failed to fetch products', error);
          setError('Failed to load products. Please try again later.');
      } finally {
          setLoading(false);
      }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'product') {
          setFormData({ ...formData, product: { product_id: value } });
      } else {
          setFormData({ ...formData, [name]: value });
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (img_product) {
              await imgService.updateImage(img_product.img_id, formData);
          } else {
              await imgService.createImage(formData);
          }
          onSave();
      } catch (error) {
          console.error('Failed to save image', error);
      }
  };

  return (
      <form onSubmit={handleSubmit}>
          <div>
              <label>Image Name</label>
              <input
                  type="text"
                  name="img_name"
                  value={formData.img_name}
                  onChange={handleChange}
              />
          </div>
          <div>
              <label>Image URL</label>
              <input
                  type="text"
                  name="img_url"
                  value={formData.img_url}
                  onChange={handleChange}
              />
          </div>
          <div>
              <label>Product</label>
              {loading ? (
                  <p>Loading products...</p>
              ) : error ? (
                  <p className="error-message">{error}</p>
              ) : (
                  <select
                      name="product"
                      value={formData.product.product_id}
                      onChange={handleChange}
                  >
                      <option value="">Select product...</option>
                      {products.map((product) => (
                          <option key={product.product_id} value={product.product_id}>
                              {product.product_name}
                          </option>
                      ))}
                  </select>
              )}
          </div>
          <button type="submit">Save</button>
      </form>
  );
};

export default ImageForm;