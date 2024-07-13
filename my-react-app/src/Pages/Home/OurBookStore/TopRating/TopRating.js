import React, { useState, useEffect } from 'react';
import { getProducts } from '../../../../Backend/Service/productService';
import './TopRating.css';

const TopRating = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRandomProducts();
  }, []);

  const loadRandomProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getProducts();
      const allProducts = response.data.content;
      const randomProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 10);
      setProducts(randomProducts);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='random-products-title'>
        <h1 className='random-products-header'>Random Products</h1>
      </div>
      <div className="random-products-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="random-products-grid">
          {products.map((product) => (
            <div key={product.product_id} className="random-products-card">
              <div className="random-products-image-container">
                <img src={product.img_product.img_url} alt={product.product_name} className="random-products-image" />
              </div>
              <h2>{product.product_name}</h2>
              <p>{product.author.author_name}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRating;
