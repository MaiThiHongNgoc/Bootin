import React, { useState, useEffect } from 'react';
import { getProducts } from '../../Backend/Service/productService';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import './Shop.css';
import { RxSlash } from "react-icons/rx";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  const loadProducts = async (page) => {
    try {
      const response = await getProducts(page);
      // console.log('Fetched Products:', response.data); // Log the fetched response

      // Extract products array from the response data
      setProducts(response.data.content);

    } catch (error) {
      console.error('Failed to fetch products', error);
      setProducts([]); // Reset to an empty array in case of error
    }
  };

  // Logic for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <div className='product-title'>
        <h1 className='product-product'> Product List </h1>
        <div className='product-bread'>
          <div className='product-crumb'>
            <a href='#' className='product-a'>Home</a>
            <span className='product-delimiter'>
              <i className='product-i'><RxSlash /></i>
            </span>
            <span className='product-current'>Product List</span>
          </div>
        </div>
      </div>
      
      <div className="customer-product-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Author</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_name}</td>
                <td>{product.author?.author_name || 'N/A'}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.categories?.category_name || 'N/A'}</td>
                <td>
                  <img src={product.image_url} alt={product.product_name} className="product-image" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <ul className="customer-pagination">
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
            <li key={index} className={`customer-page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="customer-page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
