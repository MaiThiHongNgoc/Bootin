import React, { useState, useEffect } from 'react';
import { getProducts } from '../../Backend/Service/productService';
import { getCategories } from '../../Backend/Service/categoryService';
import { getAuthors } from '../../Backend/Service/authorService';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import './Shop.css';
import { RxSlash } from "react-icons/rx";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts(currentPage, selectedCategory, selectedPriceRange, selectedAuthor, searchQuery);
    loadCategories();
    loadAuthors();
  }, [currentPage, selectedCategory, selectedPriceRange, selectedAuthor, searchQuery]);

  const loadProducts = async (page, category, priceRange, author, search) => {
    setLoading(true);
    setError('');
    try {
      const response = await getProducts(page - 1); // Adjust page number for pagination
      const { content, totalPages } = response.data;
      setProducts(Array.isArray(content) ? content : []);
      setTotalPages(totalPages || 0);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setError('Failed to load products. Please try again later.');
      setProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const loadAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Failed to fetch authors', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <div className='shop-title'>
        <h1 className='shop-product'>Products</h1>
        <div className='shop-bread'>
          <div className='shop-crumb'>
            <a href='#' className='shop-a'>Home</a>
            <span className='shop-delimiter'>
              <i className='shop-i'><RxSlash /></i>
            </span>
            <span className='shop-current'>Products</span>
          </div>
        </div>
      </div>

      <div className="customer-shop-container">
        <div className="customer-shop-sidebar">
          <div className="shop-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="shop-search-input"
            />
          </div>
          <div className="shop-filter">
            <h3>Categories</h3>
            <ul>
              <li>
                <button onClick={() => handleCategoryChange({ target: { value: '' } })} className="shop-filter-button">
                  All Categories
                </button>
              </li>
              {categories.map(category => (
                <li key={category.category_id}>
                  <button onClick={() => handleCategoryChange({ target: { value: category.category_name } })} className="shop-filter-button">
                    {category.category_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="shop-filter">
            <h3>Price</h3>
            <select onChange={handlePriceChange} className="shop-filter-select">
              <option value="">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201-500">$201 - $500</option>
              <option value="501-1000">$501 - $1000</option>
            </select>
          </div>
          <div className="shop-filter">
            <h3>Authors</h3>
            <ul>
              <li>
                <button onClick={() => handleAuthorChange({ target: { value: '' } })} className="shop-filter-button">
                  All Authors
                </button>
              </li>
              {authors.map(author => (
                <li key={author.author_id}>
                  <button onClick={() => handleAuthorChange({ target: { value: author.author_name } })} className="shop-filter-button">
                    {author.author_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="customer-shop-content">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div>
              <div className="customer-shop-grid">
                {products.map((product) => (
                  <div key={product.product_id} className="customer-shop-card">
                    <div className="customer-shop-image-container">
                      <img src={product.img_product.img_url} alt={product.product_name} className="customer-shop-image" />
                    </div>
                    <h2>{product.product_name}</h2>
                    <p>Price: ${product.price}</p>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <ul className="customer-pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`customer-page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(index + 1)} className="customer-page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
