import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../Service/productService';
import ProductForm from './ProductForm';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await getProducts(0); // Assuming you have pagination, pass appropriate page number
            setProducts(response.data.content);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (product_id) => {
        try {
            await deleteProduct(product_id);
            loadProducts();
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        loadProducts();
    };

    return (
        <div className="product-container">
            <h1>Product Management</h1>
            <button className="product-button-add" onClick={handleAddProduct}>Add Product</button>
            {showForm && (
                <ProductForm product={editingProduct} onSave={handleFormClose} />
            )}
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Author Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.product_name}</td>
                            <td>{product.author.author_name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.categories.category_name}</td>
                            <td><img src={product.image_url} alt={product.product_name} className="product-image" /></td>
                            <td>
                                <button className="product-button-edit" onClick={() => handleEdit(product)}>Edit</button>
                                <button className="product-button-delete" onClick={() => handleDelete(product.product_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
