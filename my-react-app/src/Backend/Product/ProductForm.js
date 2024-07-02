import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../Service/productService';

const ProductForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        author: {
            author_name: ''
        },
        description: '',
        price: '',
        categories: {
            category_name: ''
        },
        image_url: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                product_name: product.product_name,
                author: {
                    author_name: product.author.author_name
                },
                description: product.description,
                price: product.price,
                categories: {
                    category_name: product.categories.category_name
                },
                image_url: product.image_url
            });
        } else {
            setFormData({
                product_name: '',
                author: {
                    author_name: ''
                },
                description: '',
                price: '',
                categories: {
                    category_name: ''
                },
                image_url: ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'author_name') {
            setFormData(prevState => ({
                ...prevState,
                author: {
                    ...prevState.author,
                    author_name: value
                }
            }));
        } else if (name === 'category_name') {
            setFormData(prevState => ({
                ...prevState,
                categories: {
                    ...prevState.categories,
                    category_name: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('FormData:', formData);
        try {
            if (product) {
                await updateProduct(product.product_id, formData);
            } else {
                await createProduct(formData);
            }
            setFormData({
                product_name: '',
                author: {
                    author_name: ''
                },
                description: '',
                price: '',
                categories: {
                    category_name: ''
                },
                image_url: ''
            });
            onSave();
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert('Error: ' + error.response.data.message);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('Error: No response from server.');
            } else {
                console.error('Error message:', error.message);
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div>
                <label>Product Name</label>
                <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Author Name</label>
                <input
                    type="text"
                    name="author_name"
                    value={formData.author.author_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Category Name</label>
                <input
                    type="text"
                    name="category_name"
                    value={formData.categories.category_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Image URL</label>
                <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                />
            </div>
            <button className="product-form-button-save" type="submit">Save</button>
        </form>
    );
};

export default ProductForm;
